/*
 * @Description  : 路由加载
 * @Author       : chenLiang
 * @Date         : 2020-09-16 16:07:00
 * @LastEditors  : chenLiang
 * @LastEditTime : 2020-09-16 16:07:08
 */
import Vue from 'vue';
import VueRouter from 'vue-router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};

//views 的公共路由
const routerArr = [];

const routerArrContext = require.context('../views', true, /module\.router\.js$/);

routerArrContext.keys().forEach(key => {
  routerArr.push(routerArrContext(key).default);
});

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "Home" */ '../views/Home.vue')
  },
  ...routerArr
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  NProgress.start();
  next();
});

router.afterEach((to, from) => {
  NProgress.done();
});

export default router;
