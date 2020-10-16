export default {
  path: '/tpl',
  name: 'tpl',
  meta: {
    title: ''
  },
  component: () => import(/* webpackChunkName: "tpl" */ 'views/tpl/index.vue')
};