<template>
  <!-- <div v-if="isExternal" class="svg-external-icon svg-icon" :style="externalIconStyle"></div> -->
  <svg :class="svgClass" aria-hidden="true">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script>
// import { isExternal } from '@/utils'
export default {
  name: 'SvgIcon',
  global: true,
  props: {
    iconClass: {
      type: String,
      required: true,
      default: ''
    },
    className: {
      type: String,
      default: ''
    }
  },
  computed: {
    iconName() {
      return `#icon-${this.iconClass}`
    },
    svgClass() {
      if (this.className) {
        return 'svg-icon' + this.className
      } else {
        return 'svg-icon'
      }
    }
  }
}
</script>

<style lang="less" scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
