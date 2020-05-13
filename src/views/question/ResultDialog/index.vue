<template>
  <div class="result-dialog">
    <van-overlay :show="show">
      <div class="content">
        <p v-if="rightNumber === 0">
          一题没对，捞的嘛不谈
        </p>
        <p
          v-else-if="
            0 < (rightNumber / allNumber).toFixed(4) * 100 &&
              (rightNumber / allNumber).toFixed(4) * 100 < 60
          "
        >
          未及格
        </p>
        <p v-else>
          及格啦，厉害了我的儿
        </p>
        <p>正确率{{ (rightNumber / allNumber).toFixed(4) * 100 }}%</p>

        <van-button @click="onEnd">结束答题</van-button>
      </div>
    </van-overlay>
  </div>
</template>

<script>
export default {
  name: 'ResultDialog',
  props: {
    show: {
      type: Boolean,
      default: false
    },
    rightNumber: {
      type: Number,
      default: 0
    },
    allNumber: {
      type: Number,
      default: 0
    }
  },
  methods: {
    onEnd() {
      this.$router.replace({
        name: 'Home'
      })
    }
  }
}
</script>

<style lang="less" scoped>
.content {
  position: absolute;
  width: 90%;
  height: 70%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  border-radius: 20px;
}
</style>
