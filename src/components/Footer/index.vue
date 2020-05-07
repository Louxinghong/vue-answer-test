<template>
  <div class="footer">
    <van-tabbar
      v-model="isActive"
      active-color="#1989fa"
      inactive-color="#999999"
    >
      <van-tabbar-item @click="goHome">
        <span>首页</span>
        <template #icon="props">
          <svg-icon
            :class="{ isActive: props.active }"
            icon-class="home"
          ></svg-icon>
        </template>
      </van-tabbar-item>
      <van-tabbar-item @click="goCollection">
        <span>收藏</span>
        <template #icon="props">
          <svg-icon
            :class="{ isActive: props.active }"
            icon-class="collection"
          ></svg-icon> </template
      ></van-tabbar-item>
      <van-tabbar-item @click="goMine">
        <span>我的</span>
        <template #icon="props">
          <svg-icon
            :class="{ isActive: props.active }"
            icon-class="mine"
          ></svg-icon> </template
      ></van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'FooterBar',
  global: true,
  props: {
    active: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      isActive: 0,
      icon: {
        active: 'https://img.yzcdn.cn/vant/user-active.png',
        inactive: 'https://img.yzcdn.cn/vant/user-inactive.png'
      }
    }
  },
  mounted() {
    this.isActive = this.active
  },
  methods: {
    goHome() {
      this.$router.push({ name: 'Home' })
    },
    goCollection() {
      this.$router.push({ name: 'Collection' })
    },
    goMine() {
      this.$router.push({ name: 'Mine' })
    }
  }
}
</script>

<style lang="less" scoped>
.svg-icon {
  width: 0.5rem;
  height: 0.5rem;
}
</style>
