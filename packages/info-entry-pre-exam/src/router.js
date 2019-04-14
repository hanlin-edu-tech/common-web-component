import Vue from 'vue'
import Router from 'vue-router'
import PreYearExam from '@/views/PreYearExam'

Vue.use(Router)

export default new Router({
  base: './',
  routes: [
    {
      path: '/:preExamCategory/:preExamCategoryDesc/:subject',
      name: 'PreYearExam',
      component: PreYearExam,
      //component: () => import('@/views/PreYearExam.vue'),
      props: route => ({ ...route.params })
    },
    {
      path: '/gsat/歷屆學測解題',
      name: 'GSATPreExam',
      component: () => import('@/views/GSATPreExam.vue'),
    }
  ]
})
