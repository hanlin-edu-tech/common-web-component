import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  base: './',
  routes: [
    {
      path: '/gsat/歷屆學測解題',
      name: 'GSATPreExam',
      component: () => import('@/views/GSATPreExam.vue'),
    },
    {
      path: '/ast/歷屆指考解題',
      name: 'ASTPreExam',
      component: () => import('@/views/ASTPreExam.vue'),
    },
    {
      path: '/cap/歷屆會考解題',
      name: 'CAPPreExam',
      component: () => import('@/views/CAPPreExam.vue'),
    },
    {
      path: '/cap/歷屆考題下載',
      name: 'CAPDownloadPage',
      component: () => import('@/views/CAPDownloadPage.vue'),
    },
    {
      path: '/resolvedVideos/:preExamCategory/:preExamCategoryDesc',
      name: 'PreYearExam',
      component: () => import('@/views/PreYearExam.vue'),
      props: route => ({ ...route.params })
    }
  ]
})
