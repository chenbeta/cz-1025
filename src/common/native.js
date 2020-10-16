import { msg } from './common';
import device from './device';
import Router from '../router';

export default class Native {

  // APP端登录
  static getuser() {

    if (!device.isApp) {
      msg('请前往app打开操作');
      return;
    }

    window.refreshUserToken = function (token) {
      console.log('登录回调', token);
      localStorage.token = token;
    };
    this.jsCallNative('getuser', {}, window.refreshUserToken);
  }

  // 返回上个控制器
  static goBack() {
    this.jsCallNative('goback');
  }

  // 打开新的webView
  static OpenNewWeb(url = '') {
    let hrefUrl = window.location.href;
    const hrefStr = hrefUrl.split('#')[0];
    let hashUrl = `${hrefStr}#`;
    if (device.isApp) {
      if (url.startsWith('http')) {
        hashUrl = '';
      }
      this.jsCallNative('openUrlWithWebVc', { url: hashUrl + url });
    } else {
      Router.push({ path: url });
    }
  }

  // 开始录音
  static startLocalRecord(cbFunc) {
    window.localRecordStart = function () {
      cbFunc();
    };
    this.jsCallNative('startLocalRecord', {}, window.localRecordStart);
  }

  // 结束录音
  static endLocalRecord(cbFunc) {
    window.localRecordSuccess = function (fla) {
      cbFunc(fla);
    };
    this.jsCallNative('endLocalRecord', {}, window.localRecordSuccess);
  }

  // 开启分享
  static shareInfo(params) {
    this.jsCallNative('shareInfoToApp', params);
  }

  //h5和原生交互
  static jsCallNative(name, params = {}, blockFunc = null) {
    if (device.isApp) {
      try {
        if (device.ios) {
          let handle = window.webkit.messageHandlers[name];
          console.log(window.webkit);
          handle.postMessage(params);
        } else if (device.android) {
          window.vm.$jsBridge.callHandler(
            name,
            params,
            blockFunc
          );
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
}

