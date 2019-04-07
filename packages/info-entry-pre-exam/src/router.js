import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/gsat/歷屆學測解題/:subject',
      name: 'GSATPreYearExam',
      component: () => import('@/views/GSATPreYearExam.vue'),
      props: route => ({ ...route.params })
    },
    {
      path: '/gsat/歷屆學測解題',
      name: 'GSATPreExam',
      component: () => import('@/views/GSATPreExam.vue'),
    }
  ]
})
