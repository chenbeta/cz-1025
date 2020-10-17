/*
 * @Description  : vue全局组件、控件加载
 * @Author       : chenLiang
 * @Date         : 2020-09-16 16:08:20
 * @LastEditors: chen<chenliang@itcast.cn>
 * @LastEditTime: 2020-10-17 10:03:12
 */
import Vue from 'vue';
// import VConsole from 'vconsole';
import Vant from 'vant';
import 'vant/lib/index.css';

// if (process.env.VUE_APP_ENV !== 'prod') {
//   VConsole();
// }

let domainUrl = `http://${window.location.host}/api_test`;

if (process.env.VUE_APP_ENV != 'dev') {
  domainUrl = `http://${window.location.host}`;
}

Vue.prototype.$domain = domainUrl;

//自定义全局组件
const components = {};
const componentsContext = require.context('../components/global', true, /index\.vue$/);

componentsContext.keys().forEach(key => {
  components[key.replace(/.vue/, '').split('/')[1]] = componentsContext(key).default;
  return componentsContext(key).default;
});

Object.keys(components).forEach(key => {
  Vue.component(components[key].name, components[key]);
});

Vue.use(Vant);
