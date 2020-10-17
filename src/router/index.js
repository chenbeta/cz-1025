/*
 * @Description  : 路由加载
 * @Author       : chenLiang
 * @Date         : 2020-09-16 16:07:00
 * @LastEditors: chen<chenliang@itcast.cn>
 * @LastEditTime: 2020-10-17 10:03:02
 */
import Vue from 'vue';
import VueRouter from 'vue-router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "Home" */ '../views/Home.vue')
  },
  {
    path: '/diningRoom',
    name: 'diningRoom',
    component: () => import(/* webpackChunkName: "diningRoom" */ '../views/diningRoom.vue')
  }
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
