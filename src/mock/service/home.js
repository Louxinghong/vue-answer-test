import Mock from 'mockjs'
import { homeSwipeList, homeBooksList, questionList } from '@/mock/data/home'

/**
 * 获取首页轮播图
 */
Mock.mock('/homeSwipeList', 'get', () => {
  return {
    data: homeSwipeList
  }
})

/**
 * 获取首页书本列表
 */
Mock.mock('/homeBooksList', 'get', () => {
  return {
    data: homeBooksList
  }
})

/**
 * 答题测试
 */
Mock.mock('/questionTagList', 'get', () => {
  return {
    data: questionList
  }
})

/**
 * 根据Id获取相关测试题
 */
Mock.mock(/\/questionListById/, 'get', data => {
  let listById = []
  let params = {}
  data.url
    .substr(data.url.indexOf('?') + 1)
    .split('&')
    .forEach(item => {
      params[item.split('=')[0]] = item.split('=')[1]
    })
  let success = questionList.some(item => {
    if (item.id === Number(params.id)) {
      listById = item
      return true
    } else {
      return false
    }
  })
  if (success) {
    return {
      data: listById
    }
  } else {
    return {
      data: []
    }
  }
})
