<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">
        Home
      </router-link>
      |
      <router-link to="/about">
        About
      </router-link>
    </div>
    <transition :name="transitionName">
      <router-view />
    </transition>
    <st-loading v-if="loading" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      transitionName: ''
    };
  },
  computed: {
    loading() {
      return this.$store.getters['common/loading'];
    }
  },
  watch: {
    $route(to, from) {
      const toDepth = to.path.split('/').length;
      const fromDepth = from.path.split('/').length;
      this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left';
    }
  }
};
</script>

<style lang="stylus"></style>
