<template>
  <div class="home">
    <van-search v-model="searchValue" placeholder="请输入搜索关键词" />
    <van-swipe class="home-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="(item, index) in swipeList" :key="index"
        ><img :src="item.img" alt=""
      /></van-swipe-item>
    </van-swipe>

    <div class="books">
      <ul>
        <li v-for="(item, index) in booksList" :key="index">
          <img :src="item.img" alt="" />
          <p class="name">{{ item.name }}</p>
          <van-tag plain type="primary">{{ item.tag }}</van-tag>
        </li>
      </ul>
    </div>

    <div class="question-tags">
      <van-button
        plain
        type="primary"
        v-for="(item, index) in questionTagList"
        :key="index"
        @click="goQuestion(item.id)"
        :disabled="loading"
      >
        {{ item.title }}
      </van-button>
    </div>
    <footer-bar :active="0" />
  </div>
</template>

<script>
import {
  getHomeSwipeList,
  getHomeBooksList,
  getQuestionTagList
} from '@/api/home'

export default {
  name: 'Home',
  data() {
    return {
      loading: false,
      searchValue: '',
      swipeList: [],
      booksList: [],
      questionTagList: []
    }
  },
  async created() {
    this.swipeList = (await getHomeSwipeList()).data.data
    this.booksList = (await getHomeBooksList()).data.data
    this.questionTagList = (await getQuestionTagList()).data.data
  },
  methods: {
    goQuestion(id) {
      this.$router.push({
        path: '/question',
        query: {
          id: id
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.home {
  min-height: calc(100% - 1rem);
  margin-bottom: 1rem;
  width: 100%;
  background-color: #f5f5f5;

  .home-swipe .van-swipe-item {
    width: 100%;
    height: 4rem;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .books {
    ul {
      margin: 0;
      padding: 0;
      height: 3.8rem;
      width: 100%;
      padding: 0.25rem 0;
      overflow-x: scroll;
      white-space: nowrap;

      li {
        height: 3.2rem;
        width: 30%;
        display: inline-block;
        margin-right: 2.5%;

        img {
          height: 67%;
          width: 100%;
          border-radius: 6px;
        }

        .name {
          margin: 5px 0;
          height: 10%;
          font-size: 0.2rem;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          display: -ms-flexbox;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          word-break: break-all;
        }

        &:nth-child(1) {
          margin-left: 2.5%;
        }
      }
    }
  }

  .question-tags {
    width: 100%;
    display: flex;
    justify-content: space-around;
  }
}
</style>
