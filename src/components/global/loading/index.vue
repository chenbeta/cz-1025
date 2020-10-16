<template>
  <div class="common-loading-box">
    <div class="spinner">
      <div class="rect1"></div>
      <div class="rect2"></div>
      <div class="rect3"></div>
      <div class="rect4"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'st-loading',
  data() {
    return {};
  }
};
</script>

<style lang="stylus" scoped>
@keyframes stretchdelay {
  0%, 40%, 100% {
    transform: scaleY(0.4);
    -webkit-transform: scaleY(0.4);
  }

  20% {
    transform: scaleY(1);
    -webkit-transform: scaleY(1);
  }
}

.common-loading-box {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;

  .spinner {
    margin: 1rem auto;
    width: 0.5rem;
    height: 0.6rem;
    text-align: center;
    font-size: 0.1rem;
  }

  .spinner > div {
    background-color: #9d9d9d;
    height: 100%;
    width: 0.02rem;
    display: inline-block;
    margin: 0 0.02rem;
    -webkit-animation: stretchdelay 1.2s infinite ease-in-out;
    animation: stretchdelay 1.2s infinite ease-in-out;
  }

  .spinner .rect2 {
    -webkit-animation-delay: -1.1s;
    animation-delay: -1.1s;
  }

  .spinner .rect3 {
    -webkit-animation-delay: -1s;
    animation-delay: -1s;
  }

  .spinner .rect4 {
    -webkit-animation-delay: -0.9s;
    animation-delay: -0.9s;
  }

  .spinner .rect5 {
    -webkit-animation-delay: -0.8s;
    animation-delay: -0.8s;
  }
}
</style>
