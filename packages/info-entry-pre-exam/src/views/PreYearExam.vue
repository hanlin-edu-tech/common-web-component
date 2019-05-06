<template lang="pug">
  section
    LayoutLeftSubjectMenu(:preExamCategory="preExamCategory"
      :preExamCategoryDesc="preExamCategoryDesc" :subject="subject" :key="subject")

    AdvertisementUp(:preExamCategory="preExamCategory" :key="preExamCategory")

    #years-tab
      ul.tabs-nav
        li.tab-default(:id="yearExam" v-for="yearExam in yearExams" :key="yearExam"
          :ref="retrieveYear (yearExam)" @click="renderYearExam ($event, yearExam)")
          div
            h2 {{ retrieveYear (yearExam) }}

      .box.right.con
        LayoutTagTitle {{ `${preExamCategoryDesc}： ${currentYear} 學年${subject}` }}
        YearExam(ref="preExamYearInfoRef" :preExamYearInfo="preExamYearInfo" :key="preExamYearInfoKey")
        Teacher(v-if="preExamCategory !== 'ast'"
          :preExamCategory="preExamCategory" :subject="subject" :key="`${preExamCategory}${subject}`")
</template>

<script>
  import { db } from '@/modules/firebase-config'
  import LayoutLeftSubjectMenu from '@/components/layout/LayoutLeftSubjectMenu'
  import LayoutTagTitle from '@/components/layout/LayoutTagTitle'
  import YearExam from '@/components/YearExam'
  import Teacher from '@/components/Teacher'
  import AdvertisementUp from '../components/AdvertisementUp'

  export default {
    name: 'PreYearExam',
    components: {
      LayoutLeftSubjectMenu,
      LayoutTagTitle,
      YearExam,
      Teacher,
      AdvertisementUp
    },

    data: () => {
      return {
        subject: '',
        yearExams: [],
        currentYear: '',
        preExamYearInfo: null,
        preExamYearInfoKey: '',
        adType: ''
      }
    },

    props: {
      preExamCategory: String,
      preExamCategoryDesc: String
    },

    async beforeRouteUpdate (to, from, next) {
      const vueModel = this
      vueModel.initial(vueModel.yearExam)
      next()
    },

    async mounted () {
      const vueModel = this
      vueModel.initial()
    },

    methods: {
      async retrievePreExamDocIds () {
        try {
          const vueModel = this
          const preExamQuerySnapshot = await db.collection(vueModel.preExamCategoryDesc)
            .orderBy('year', 'desc')
            .get()

          vueModel.yearExams = preExamQuerySnapshot
            .docChanges()
            .filter(preExamDocChange => {
              return (preExamDocChange.doc && preExamDocChange.doc.id.length >= 3)
            })
            .map(
              preExamDocChange => {
                return preExamDocChange.doc.id
              }
            )
        } catch (error) {
          console.error(error)
        }
      },

      async summarySubject () {
        const vueModel = this
        if (vueModel.$route.query) {
          let subject
          if (vueModel.$route.query.sj) {
            const querySubjectCode = vueModel.$route.query.sj
            const codeDocSnapshot = await db.collection('Subject').doc('code').get()
            const mapping = codeDocSnapshot.data().mapping
            const subjectOrder = mapping[querySubjectCode]
            subject = subjectOrder.split('-')[0]
          } else if (vueModel.$route.query.subject) {
            subject = vueModel.$route.query.subject
          }

          if (vueModel.preExamCategory === 'ast') {
            if (subject === '數學') {
              return '數學乙'
            } else if (subject === '自然') {
              return '物理'
            } else if (subject === '社會') {
              return '歷史'
            }
          }
          return subject
        } else {
          return '國文'
        }
      },

      initialCurrentYear (yearExam) {
        const vueModel = this
        if (yearExam)
          return parseInt(yearExam.substring(0, 3))
        else if (vueModel.$route.query && vueModel.$route.query.year) {
          return vueModel.$route.query.year
        } else {
          return parseInt(vueModel.yearExams[0].substring(0, 3))
        }
      },

      async initial (yearExam) {
        const vueModel = this
        await vueModel.retrievePreExamDocIds()
        vueModel.currentYear = vueModel.initialCurrentYear(yearExam)
        vueModel.subject = await vueModel.summarySubject()

        $('#years-tab .tab-active').removeClass('tab-active')
        $(`#${vueModel.yearExams[0]}`).addClass('tab-active')

        vueModel.$refs[vueModel.currentYear][0].click()
      },

      retrieveYear (yearExam) {
        return yearExam.substring(0, 3)
      },

      renderYearExam (event, yearExam) {
        const vueModel = this
        const currentAnchorTarget = $(event.currentTarget)
        vueModel.yearExam = yearExam
        $('#years-tab .tab-active').removeClass('tab-active')
        currentAnchorTarget.addClass('tab-active')

        vueModel.preExamYearInfo = {
          preExamCategoryDesc: vueModel.preExamCategoryDesc,
          yearExam: yearExam,
          subject: vueModel.subject
        }
        vueModel.preExamYearInfoKey = `${vueModel.preExamCategoryDesc}${yearExam}${vueModel.subject}`
        vueModel.currentYear = vueModel.retrieveYear(yearExam)
      }
    }
  }
</script>

<style lang="less">
  @import '../static/less/year-tab.less';

  #years-tab {
    .con {
      padding: 10px 1%;
    }
  }
</style>
