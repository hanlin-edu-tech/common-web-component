<template lang="pug">
  #pre-exam-subject-left-side
    ul.menu
      li.left-side-header {{ preExamCategoryDesc }}
      li(v-for="(subject, index) in subjects" :key="subject")
        a(:id="`ast-${subject}`" @click.prevent="routeSubjectLink($event, subject)") {{ subject }}
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
      preExamCategoryDesc: String,
      subject: String
    },

    async mounted () {
      const vueModel = this
      const subjectDocSnapshot = await db.collection('Subject')
        .doc(vueModel.preExamCategory)
        .get()

      vueModel.subjects = subjectDocSnapshot.data().subjects
      vueModel.$nextTick(() => {
        $(`#ast-${vueModel.subject}`).addClass('select')
      })
    },

    methods: {
      routeSubjectLink (event, subject) {
        const vueModel = this
        $('#pre-exam-subject-left-side ul.menu li > a').removeClass('select')
        $(event.currentTarget).addClass('select')
        vueModel.$delay(500)
        vueModel.$router.replace(`/resolvedVideos/${vueModel.preExamCategory}/${vueModel.preExamCategoryDesc}?subject=${subject}`)
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
      font-weight: 800;
      color: white;
      margin-bottom: 10px;
    }
  }
</style>