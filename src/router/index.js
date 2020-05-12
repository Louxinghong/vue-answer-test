import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () =>
      import(/* webpackChunkName: 'group-home' */ '@/views/home/index.vue')
  },
  {
    path: '/collection',
    name: 'Collection',
    component: () =>
      import(
        /* webpackChunkName: 'group-collection' */ '@/views/collection/index.vue'
      )
  },
  {
    path: '/mine',
    name: 'Mine',
    component: () =>
      import(/* webpackChunkName: 'group-mine' */ '@/views/mine/index.vue')
  },
  {
    path: '/question',
    name: 'Question',
    component: () =>
      import(
        /* webpackChunkName: 'group-question' */ '@/views/question/index.vue'
      )
  }
]

const router = new VueRouter({
  routes
})

export default router
