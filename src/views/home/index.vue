<template>
  <div class="home">
    <van-search v-model="searchValue" placeholder="请输入搜索关键词" />
    <van-swipe class="home-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item
        ><img src="@/images/home-swipe-1.png" alt=""
      /></van-swipe-item>
      <van-swipe-item
        ><img src="@/images/home-swipe-2.png" alt=""
      /></van-swipe-item>
      <van-swipe-item
        ><img src="@/images/home-swipe-3.png" alt=""
      /></van-swipe-item>
    </van-swipe>
    <footer-bar :active="0" />
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      searchValue: ''
    }
  }
}
</script>

<style lang="less" scoped>
.home {
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;

  .home-swipe .van-swipe-item {
    width: 100%;
    height: 4rem;

    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
