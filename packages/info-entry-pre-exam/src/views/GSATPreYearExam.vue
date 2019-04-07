<template lang="pug">
  #years-tab
    ul.tabs-nav
      li.tab-default(v-for="yearExam in yearExams" :key="yearExam"
        :ref="retrieveYear (yearExam)" @click="renderYearExam ($event, yearExam)")
        a(href="#")
          h2 {{ retrieveYear (yearExam) }}

    .box.right.con
      LayoutTagTitle {{ `${preExamCategory}： ${currentYear} 學年${subject}`}}
      YearExam(ref="preExamYearInfoRef" :preExamYearInfo="preExamYearInfo" :key="currentYear")
      Teacher(:subject="subject")
</template>

<script>
  import { db } from '../modules/firebase-config'
  import LayoutTagTitle from '@/components/layout/LayoutTagTitle'
  import YearExam from '@/components/YearExam'
  import Teacher from '@/components/Teacher'

  export default {
    name: 'GSATPreYearExam',
    components: {
      LayoutTagTitle,
      YearExam,
      Teacher
    },

    props: {
      subject: String
    },

    data: () => {
      return {
        yearExams: [],
        currentYear: '',
        preExamCategory: '歷屆學測解題',
        preExamCategorySubtitle: '',
        preExamYearInfo: null
      }
    },

    async mounted () {
      const vueModel = this
      let currentYear
      await vueModel.retrieveGSATDocIds()
      currentYear = vueModel.yearExams[0].substring(0, 3)

      vueModel.preExamCategorySubtitle = `${vueModel.preExamCategory}: ${currentYear} 學年${vueModel.subject}`
      $('#years-tab .tab-active').removeClass('tab-active')
      $(`#y${currentYear}`).addClass('tab-active')
      vueModel.$refs[currentYear][0].click()
    },

    methods: {
      async retrieveGSATDocIds () {
        try {
          const vueModel = this
          const gsatQuerySnapshot = await db.collection(vueModel.preExamCategory)
            .orderBy('year', 'desc')
            .get()

          vueModel.yearExams = gsatQuerySnapshot
            .docChanges()
            .filter(gsatDocChange => gsatDocChange.doc && gsatDocChange.doc.id.length > 3)
            .map(gsatDocChange => {
              return gsatDocChange.doc.id
            })
        } catch (error) {
          console.error(error)
        }
      },

      retrieveYear (yearExam) {
        return yearExam.substring(0, 3)
      },

      retrieveSubtitle (yearExam) {
        const vueModel = this
        console.log(yearExam)
        return `${vueModel.preExamCategory} ${vueModel.retrieveYear(yearExam)} 學年${vueModel.subject}`
      },

      renderYearExam (event, yearExam) {
        const vueModel = this
        const currentAnchorTarget = $(event.currentTarget)

        $('#years-tab .tab-active').removeClass('tab-active')
        currentAnchorTarget.addClass('tab-active')

        vueModel.preExamYearInfo = {
          preExamCategory: vueModel.preExamCategory,
          yearExam: yearExam,
          subject: vueModel.subject
        }
        vueModel.currentYear = vueModel.retrieveYear(yearExam)
      }
    }
  }
</script>

<style lang="less">
  @import '../static/less/ui-tab.less';

  #years-tab {
    ul.tabs-nav {
      li {
        white-space: nowrap;
        display: inline-block;
      }

      h2 {
        font-size: 1.1em;
        padding: 5px 20px;
      }
    }

    .tab-default {
      border: 1px solid #d5d5d5;
      font-weight: normal;
      background: linear-gradient(to bottom, rgba(244, 244, 244, 1) 0%, rgba(225, 225, 225, 1) 100%);

      a {
        color: #aaa;
      }
    }

    .tab-active {
      border: 1px solid #d5d5d5;
      font-weight: normal;
      background: linear-gradient(to bottom, rgba(234, 234, 234, 1) 1%, rgba(255, 255, 255, 1) 100%);

      a {
        color: #000;
        font-weight: bold;
      }
    }

    .con {
      padding: 10px 1%;
    }
  }
</style>
