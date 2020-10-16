/*
 * @Description  : 公共模块store
 * @Author       : chenLiang
 * @Date         : 2020-09-16 16:14:46
 * @LastEditors  : chenLiang
 * @LastEditTime : 2020-09-16 16:15:07
 */
const state = {
  loading: false
};

const mutations = {
  loading_set(state, data) {
    state.loading = data;
  }

};

const getters = {
  loading: state => state.loading
};

export default {
  namespaced: true,
  state,
  mutations,
  getters
};
