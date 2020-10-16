
import device from './device';

const JsBridgePlugin = {};

//安卓
function androidSetWebViewJavascriptBridge(callback) {
  if (window.WebViewJavascriptBridge) {
    console.log('有WebViewJavascriptBridge对象');
    return callback(window.WebViewJavascriptBridge);
  }
  console.log('没有WebViewJavascriptBridge对象,等待WebViewJavascriptBridgeReady事件回调');
  document.addEventListener(
    'WebViewJavascriptBridgeReady'
    , () => {
      console.log('WebViewJavascriptBridgeReady事件回调了');
      callback(window.WebViewJavascriptBridge);
    },
    false
  );

}

JsBridgePlugin.install = function (Vue, option) {
  //初始化jsBridge
  Vue.prototype.$jsBridge = {
    registerHandler(name, callback) {
      console.error('没有注册成功');
      console.log(name, callback);
    },
    callHandler(name, params, callback) {
      console.log(name, params, callback);
    }
  };

  //所有原生和js通信的命令
  Vue.prototype.$jsBridgeCmd = {
    chooseImage: 'chooseImage'
  };
  //先注释掉 初始化jsBridge 需要用到时再初始化
  if (device.android) {
    androidSetWebViewJavascriptBridge(bridge => {
      bridge.init((message, responseCallback) => {
        responseCallback(message);
      });

      Vue.prototype.$jsBridge = bridge;

      bridge.registerHandler('gettoken', (data, responseCallback) => {
        console.log(data, responseCallback);
      });
      console.log(`初始化$jsBridge${typeof bridge.registerHandler == 'function'}`);
    });
  }
};

export default JsBridgePlugin;

