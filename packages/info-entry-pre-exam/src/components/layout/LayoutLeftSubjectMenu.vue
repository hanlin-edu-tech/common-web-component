<template lang="pug">
  #pre-exam-subject-left-side
    ul.menu
      li.left-side-header {{ preExamCategoryDesc }}
      li(v-for="subject in subjects" :key="subject")
        a(href="#", @click="routeSubjectLink($event, subject)") {{ subject }}
</template>

<script>
  import { db } from '@/modules/firebase-config'

  export default {
    name: 'LayoutLeftSubjectMenu',
    data () {
      return {
        subjects: []
      }
    },

    props: {
      preExamCategory: String,
      preExamCategoryDesc: String
    },

    async mounted () {
      const vueModel = this
      const subjectDocSnapshot = await db.collection('Subject')
        .doc(vueModel.preExamCategory)
        .get()

      vueModel.subjects = subjectDocSnapshot.data().subjects
    },

    methods: {
      composePreExamContentLink (subject) {
        const vueModel = this
        return `/${vueModel.preExamCategory}/${vueModel.preExamCategoryDesc}/${subject}`
      },

      routeSubjectLink (event, subject) {
        const vueModel = this
        event.preventDefault()
        vueModel.$delay(500)
        console.log(subject)
        vueModel.$router.replace({
          name: 'PreYearExam',
          params: {
            preExamCategory: vueModel.preExamCategory,
            preExamCategoryDesc: vueModel.preExamCategoryDesc,
            subject: subject
          }
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  #pre-exam-subject-left-side {
    float: left;
    width: 215px;

    li.left-side-header {
      font-size: 16px;
      font-weight : 800;
      color: white;
      margin-bottom: 10px;
    }
  }
</style>