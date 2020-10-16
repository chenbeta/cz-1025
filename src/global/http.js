/*
 * @Description  : http请求封装
 * @Author       : chenLiang
 * @Date         : 2020-09-16 16:07:34
 * @LastEditors  : chenLiang
 * @LastEditTime : 2020-09-16 16:07:45
 */
import axios from 'axios';
// import Qs from 'qs';
import router from '@/router';
import { msg } from '@/common/common';
import Native from '@/common/native';
import store from '@/store';

let requestUrl = '/api_test/';

if (process.env.VUE_APP_ENV != 'dev') {
  requestUrl = '/';
}

window.HTTP_URL = requestUrl; //全局请求
window._axiosLoading = 0;

axios.defaults.timeout = 10000;

const service = axios.create();

service.interceptors.request.use(
  config => {
    let token = localStorage.token || '39bf6ff6-cbca-4c3f-a4d4-f78804a1ef22';
    if (token != null) { // token不为null，传token给后台
      config.headers.token = token;
    }
    return config;

  }, error => Promise.reject(error)
);

service.interceptors.response.use( //特殊处理
  response => {
    if (response.data && response.data.code === -1) {
      router.push('/login');
    }
    return response;
  },
  error => {
    const msg = error.message;
    let code = error.response?.status || '';

    console.log(code);

    if (!error.response) {
      return Promise.reject({
        success: false,
        msg: '网络好像有点问题，请检查后重试～'
      });
    }

    let str = '网络好像有点问题，请检查后重试～';

    if (msg.indexOf('Network Error') != -1) {
      str = '网络好像有点问题，请检查后重试～';
      code = 404;
    } else if (msg.indexOf('timeout') != -1) {
      str = '网络请求超时';
      code = 404;
    }

    return Promise.reject({
      success: false,
      msg: str,
      code
    });
  }
);

const request = options => {
  let {
    url, //请求路径
    method = 'GET', //请求方式
    data, //请求参数
    showErr = true, //是否显示错误信息
    loading = true, //需要loading
    headers, //自定义header
    progress //上传中，回调函数（获取上传进度）
    // noQs = false //不需要序列化数据
  } = options;

  const methodType = method.toLowerCase();
  const axData = {
    url: requestUrl + url
  };

  //自定义loading
  if (headers) {
    axData.headers = headers;
  } else {
    axData.headers = {
      'Content-Type': 'application/json;charset=UTF-8'
    };
  }

  //需要loading时，_axiosLoading++
  if (loading) {
    store.commit('common/loading_set', true);
    window._axiosLoading++;
  }

  axData.method = methodType;
  axData.data = data;

  switch (methodType) {
    case 'get'://get请求
      data.t = new Date().getTime(); //请求随机数，防止ie缓存
      axData.params = data;
      break;
    case 'post': //post请求
      break;
    case 'delete': //delete请求
      break;
    case 'put': //put请求
      break;
    case 'upload': //上传请求
      axData.data = data;
      if (!headers) {
        axData.headers = {
          'Content-Type': 'multipart/form-data'
        };
      }
      axData.method = 'post';
      if (typeof progress === 'function') {
        axData.onUploadProgress = progressEvent => {
          if (progressEvent.lengthComputable) {
            //属性lengthComputable主要表明总共需要完成的工作量和已经完成的工作是否可以被测量
            //如果lengthComputable为false，就获取不到progressEvent.total和progressEvent.loaded
            progress(progressEvent);
          }
        };
      }
      break;
    default:
      break;
  }

  return service(axData).then(res => {
    const serveData = res.data;

    //显示错误信息，排除需要登录情况
    if (showErr && !serveData.success && serveData.code != '9998') {
      msg.error(serveData.msg);
    }

    //去登陆
    if (!serveData.success && serveData.code === '9998') {
      localStorage.token = ''; // token过期，移除token
      // 进行重新登录操作
      Native.getuser();
    }

    //需要loading时，_axiosLoading--
    if (loading) {
      window._axiosLoading--;
    }

    //等于0时清除loading
    if (window._axiosLoading === 0) {
      store.commit('common/loading_set', false);
    }

    return serveData;
  }).catch(err => {

    //显示错误信息
    if (showErr) {
      msg.error(err.msg);
    }

    //需要loading时，_axiosLoading--
    if (loading) {
      window._axiosLoading--;
    }

    //等于0时清除loading
    if (window._axiosLoading === 0) {
      store.commit('common/loading_set', false);
    }

    return err;
  });
};

export const $http = {
  get: (url, data = {}, option) => request({ //get请求
    method: 'get', url, data, ...option
  }),
  post: (url, data = {}, option) => request({ //post请求
    method: 'post', url, data, ...option
  }),
  delete: (url, data = {}, option) => request({ //post请求
    method: 'delete', url, data, ...option
  }),
  put: (url, data = {}, option) => request({ //post请求
    method: 'put', url, data, ...option
  }),
  upload: (url, data = {}, option) => request({ //普通上传
    method: 'upload', url, data, ...option
  })
};

export default axios;
