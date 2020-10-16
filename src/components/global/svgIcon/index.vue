<!--
 * @Description  : ionfont svg图标
 * @Author       : chenLiang
 * @Date         : 2020-09-16 16:09:06
 * @LastEditors  : chenLiang
 * @LastEditTime : 2020-09-16 16:10:35
-->
<template>
  <svg
    class="svg-icon"
    :style="ClassStyle"
    aria-hidden="true"
  >
    <use :xlink:href="iconName">
      <slot></slot>
    </use>
  </svg>
</template>

<script>
export default {
  name: 'st-svg-icon',
  props: {
    size: {
      type: [Number, String],
      default: 20
    },
    name: {
      type: String,
      default: ''
    }
  },
  computed: {
    iconNam() {
      return `#${this.name}`;
    },
    ClassStyle() {
      return `width:${parseInt(this.size)}px;height:${parseInt(this.size)}px;`;
    }
  }
};
</script>

<style lang="stylus" scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
