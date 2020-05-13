<template>
  <div class="question">
    <div v-if="questionList.list">
      <p class="big-title">{{ questionList.title }}</p>
      <p class="small-title">
        {{ questionList.list[currentQuestion].title }}？
      </p>
      <ul>
        <li
          :class="{
            showRight:
              questionList.list[currentQuestion].isChoose &&
              index + 1 === questionList.list[currentQuestion].answer,
            showError:
              index + 1 === questionList.list[currentQuestion].userChoose &&
              index + 1 !== questionList.list[currentQuestion].answer
          }"
          v-for="(item, index) in questionList.list[currentQuestion].options"
          :key="index"
          @click="onChooseAnswer(index)"
        >
          <span>{{ changeToLetter(index) }}</span>
          <span>{{ item }}</span>
        </li>
      </ul>
      <div class="tag-list" @click="onShowTagList">
        <svg-icon icon-class="task"></svg-icon>
      </div>
      <div class="pre-next" v-if="questionList.list[currentQuestion].isChoose">
        <van-button :disabled="!(currentQuestion !== 0)" @click="goPreQuestion"
          >上一题</van-button
        >
        <van-button
          :disabled="!(currentQuestion !== questionList.list.length - 1)"
          @click="goNextQuestion"
          >下一题</van-button
        >
        <van-button v-show="isAllSelected" @click="onSubmit">提交</van-button>
      </div>

      <van-overlay :show="showTagList" @click="showTagList = false">
        <div class="tag-content">
          <van-button
            v-for="(item, index) in questionList.list"
            :key="index"
            :class="{
              tag: true,
              right:
                questionList.list[index].isChoose &&
                questionList.list[index].userChoose ===
                  questionList.list[index].answer,
              error:
                questionList.list[index].isChoose &&
                questionList.list[index].userChoose !==
                  questionList.list[index].answer
            }"
            @click.stop="onGoTagQuestion(index)"
          >
            {{ index + 1 }}
          </van-button>
        </div>
      </van-overlay>

      <ResultDialog
        :show="showResultDialog"
        :right-number="rightNumber"
        :all-number="questionList.list.length"
      />
    </div>
  </div>
</template>

<script>
import { getQuestionListById } from '@/api/home'
import ResultDialog from './ResultDialog/index'

export default {
  name: 'Question',
  components: {
    ResultDialog
  },
  data() {
    return {
      loading: false,
      questionList: [],
      currentQuestion: 0,
      showTagList: false,
      isAllSelected: false,
      rightNumber: 0,
      showResultDialog: false,
      second: 3,
      timer: null
    }
  },
  async created() {
    try {
      this.loading = true
      let res = await getQuestionListById(this.$route.query.id)
      this.questionList = res.data.data
    } finally {
      this.loading = false
    }
  },
  methods: {
    // 数字转字母
    changeToLetter(index) {
      return String.fromCharCode(index + 65)
    },
    onChooseAnswer(index) {
      if (!this.questionList.list[this.currentQuestion].isChoose) {
        this.$set(
          this.questionList.list[this.currentQuestion],
          'userChoose',
          index + 1
        )
        this.$set(
          this.questionList.list[this.currentQuestion],
          'isChoose',
          true
        )
      }

      this.questionList.list.every(item => {
        return item.isChoose
      })
        ? (this.isAllSelected = true)
        : (this.isAllSelected = false)
    },
    goPreQuestion() {
      this.currentQuestion--
    },
    goNextQuestion() {
      this.currentQuestion++
    },
    onShowTagList() {
      this.showTagList = true
    },
    onGoTagQuestion(index) {
      if (this.questionList.list[index].isChoose || index === 0) {
        this.currentQuestion = index
        this.showTagList = false
      } else {
        this.$toast.fail('该题还未作答，不能查看哦')
      }
    },
    onSubmit() {
      this.questionList.list.forEach(item => {
        if (item.userChoose === item.answer) {
          this.rightNumber++
        }
      })
      const toast = this.$toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true,
        message: '加载中...'
      })
      setInterval(() => {
        this.second--
        if (this.second > 0) {
          toast.message = '加载中...'
        } else {
          clearInterval(this.timer)
          // 手动清除 Toast
          this.$toast.clear()
          this.showResultDialog = true
        }
      }, 1000)
    }
  }
}
</script>

<style lang="less" scoped>
.question {
  min-height: 100%;
  background-color: rgb(250, 250, 151);
  padding: 1rem 0;
  .big-title {
    height: 1rem;
    margin: 0 0 1rem;
    font-size: 1rem;
    font-weight: bolder;
    text-align: center;
  }
  .small-title {
    width: 90%;
    margin: 0 auto;
    font-size: 0.35rem;
    line-height: 1.8;
    text-align: center;
  }
  ul {
    width: 100%;
    margin: 0;
    padding: 0;

    li {
      display: flex;
      justify-content: space-around;
      width: 70%;
      margin: 0.5rem auto 0;
      padding: 0.3rem;
      font-size: 0.4rem;
      background-color: rgb(241, 241, 241);
      color: #333333;
      text-align: center;
      border-radius: 50px;
      box-shadow: 0px 5px 20px 2px #999999;

      &.showRight {
        background-color: rgb(10, 190, 10);
        color: #fff;
      }
      &.showError {
        background-color: rgb(248, 0, 50);
        color: #fff;
      }
    }
  }
  .tag-list {
    position: fixed;
    top: 0.5rem;
    right: 0;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background-color: rgb(211, 211, 211);
    display: flex;
    justify-content: center;
    align-items: center;

    .svg-icon {
      width: 0.7rem;
      height: 0.7rem;
      color: #fff;
    }
  }
  .tag-content {
    position: absolute;
    height: 2rem;
    width: 80%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 20px;
    background-color: #fff;
    display: flex;
    justify-content: space-around;
    align-items: center;

    .tag {
      display: inline-block;
      width: 1rem;
      height: 1rem;
      border: 1px solid #999999;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;

      &.right {
        background-color: rgb(10, 190, 10);
      }
      &.error {
        background-color: rgb(248, 0, 50);
      }
    }
  }
  .pre-next {
    position: fixed;
    width: 80%;
    bottom: 0.8rem;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    justify-content: space-around;
  }
}
</style>
