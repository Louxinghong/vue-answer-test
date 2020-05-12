import axios from 'axios'

/**
 * 首页轮播图请求
 */
export const getHomeSwipeList = () => axios.get('/homeSwipeList')

/**
 * 首页书本列表请求
 */
export const getHomeBooksList = () => axios.get('/homeBooksList')

/**
 * 答题测试
 */
export const getQuestionTagList = () => axios.get('/questionTagList')

/**
 * 根据Id获取对应题目
 */
export const getQuestionListById = id =>
  axios.get('/questionListById', { params: { id: id } })
