<template>
  <div class="question">
    {{ questionList.title }}
    {{ questionList.list[currentQuestion].title }}
    <ul>
      <li
        v-for="(item, index) in questionList.list[currentQuestion].options"
        :key="index"
      >
        {{ item }}
      </li>
    </ul>
  </div>
</template>

<script>
import { getQuestionListById } from '@/api/home'

export default {
  name: 'Question',
  data() {
    return {
      loading: false,
      questionList: [],
      currentQuestion: 0
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
  }
}
</script>
