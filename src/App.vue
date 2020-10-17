<template>
  <div id="app">
    <transition>
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
  }
};
</script>

<style lang="stylus"></style>
