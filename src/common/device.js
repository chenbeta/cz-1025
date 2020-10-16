
import Cookies from 'js-cookie';

const device = {};
let ua = navigator.userAgent;

let android = ua.match(/(Android)?[\s/]+([\d.]+)?/);
let ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
let ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/);
let iphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/);

device.ios = false;
device.android = false;
device.iphone = false;
device.ipad = false;
device.androidChrome = false;

// Android
if (android) {
  device.os = 'android';
  device.osVersion = android[2];
  device.android = true;
  device.androidChrome = ua.toLowerCase().indexOf('chrome') >= 0;
}
if (ipad || iphone || ipod) {
  device.os = 'ios';
  device.ios = true;
}
// iOS
if (iphone && !ipod) {
  device.osVersion = iphone[2].replace(/_/g, '.');
  device.iphone = true;
}
if (ipad) {
  device.osVersion = ipad[2].replace(/_/g, '.');
  device.ipad = true;
}
if (ipod) {
  device.osVersion = ipod[3] ? ipod[3].replace(/_/g, '.') : null;
  device.iphone = true;
}
// iOS 8+ changed UA
if (device.ios && device.osVersion && ua.indexOf('Version/') >= 0) {
  if (device.osVersion.split('.')[0] === '10') {
    device.osVersion = ua.toLowerCase().split('version/')[1].split(' ')[0];
  }
}

// Webview
//device.webView = (iphone || ipad || ipod) && ua.match(/.*AppleWebKit(?!.*Safari)/i)
if (ua.indexOf('safety') != -1) {
  localStorage.setItem('from', '2');//交通安全云课堂
  device.webView = true;
} else if (ua.indexOf('continus') != -1) {
  localStorage.setItem('from', '1'); //继续教育
  device.webView = true;
} else {
  localStorage.setItem('from', '3');//交通安全云课堂公众号
  device.webView = false;
}

// keng..
device.isWeixin = /MicroMessenger/i.test(ua);

device.isApp = Cookies.get('from') == 'app' || (ua.indexOf('safety') != -1);

device.token = Cookies.get('token');

export default device;
