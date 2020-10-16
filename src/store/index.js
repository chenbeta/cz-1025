/*
 * @Description  : store模块加载，已加入namespaced，调用时需加入模块名
 * @Author       : chenLiang
 * @Date         : 2020-09-16 16:10:46
 * @LastEditors  : chenLiang
 * @LastEditTime : 2020-09-16 16:15:56
 */
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const modules = {};
const storesContext = require.context('./module', true, /\.store\.js$/);

storesContext.keys().map(key => {
  modules[key.replace(/.store.js/, '').split('/')[1]] = storesContext(key).default;
  return storesContext(key).default;
});

const store = new Vuex.Store({
  modules
});

export default store;