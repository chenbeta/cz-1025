/*
 * @Description  : 加载主文件
 * @Author       : chenLiang
 * @Date         : 2020-09-16 16:07:15
 * @LastEditors: chen<chenliang@itcast.cn>
 * @LastEditTime: 2020-10-17 09:56:19
 */
import Vue from 'vue';
import axios, { $http } from '@/global/http';
import * as common from '@/common/common';
import lodash from '@/global/lodash';
import App from './App.vue';
import router from './router';
import store from './store';
import '@/common/config';
import './global/vueGlobal';

import 'normalize.css';
import 'styl/index.styl';

Vue.config.productionTip = false;

Vue.prototype.$http = $http;
Vue.prototype.axios = axios;

const resizeEvent = () => {
  let cale = window.screen.availWidth / 750;
  if (cale > 1) {
    cale = 1;
  }
  window.document.documentElement.style.fontSize = `${100 * cale}px`;
  console.log('根字体:', window.document.documentElement.style.fontSize);
};

resizeEvent();

window.addEventListener('resize', resizeEvent);
window._ = lodash;
window.common = common;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
