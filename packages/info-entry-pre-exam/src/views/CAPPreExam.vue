<template lang="pug">
  section
    #years-tab
      LayoutBanner(:preExamCategory="preExamCategory" :key="preExamCategory")
      ul.tabs-nav
        li.tab-default(:id="yearExam" v-for="yearExam in yearExams" :key="yearExam"
          :ref="yearExam" @click="switchComponent ($event, yearExam)")
          div
            h2 {{ yearExam }}

      .box.right.con
        LayoutTagTitle {{ preExamCategorySubtitle }}
        CAPSubjectList(:yearExam="yearExam" :subject="subject" @retrieve-resolved-videos="retrieveResolvedVideos")
        Component(:is="componentName" :preExamYearInfo="preExamYearInfo" :key="preExamCategorySubtitle")
        Teacher(:preExamCategory="preExamCategory" :subject="subject" :key="`${preExamCategory}${subject}`")
</template>

<script>
  import { db } from '@/modules/firebase-config'
  import LayoutTagTitle from '@/components/layout/LayoutTagTitle'
  import LayoutBanner from '@/components/layout/LayoutBanner'
  import CAPSubjectList from '@/components/cap/CapSubjectList'
  import YearExamContent from '@/components/YearExamContent'
  import BCTConcept from '@/components/cap/BctConcept'
  import Teacher from '@/components/Teacher'

  export default {
    name: 'CAPPreExam',
    components: {
      LayoutTagTitle,
      LayoutBanner,
      CAPSubjectList,
      YearExamContent,
      BCTConcept,
      Teacher
    },

    data: () => {
      return {
        yearExams: [],
        yearExam: '',
        currentYear: '',
        preExamCategory: 'cap',
        subject: '國文',
        preExamCategorySubtitle: '',
        componentName: '',
        preExamYearInfo: {}
      }
    },

    created () {
      const vueModel = this
      vueModel.$ehanlinComponentLoader()
    },

    async mounted () {
      const vueModel = this
      document.getElementById('info-left-side').style.display = ''
      vueModel.initial()
    },

    beforeDestroy () {
      document.getElementById('info-left-side').style.display = 'none'
    },

    methods: {
      async initial () {
        const vueModel = this
        await vueModel.retrievePreExamDocIds()
        vueModel.currentYear = parseInt(vueModel.yearExams[0].substring(0, 3))

        $('#years-tab .tab-active').removeClass('tab-active')
        $(`#${vueModel.yearExams[0]}`).addClass('tab-active')

        vueModel.$refs[vueModel.yearExams[0]][0].click()
      },

      async retrievePreExamDocIds () {
        try {
          const vueModel = this
          const capExamQuerySnapshot = await db.collection('歷屆會考解題')
            .orderBy('year', 'desc')
            .get()

          const bctExamQuerySnapshot = await db.collection('精選基測解題')
            .orderBy('year', 'desc')
            .get()

          vueModel.yearExams = vueModel.yearExams.concat(
            capExamQuerySnapshot
              .docChanges()
              .map(
                preExamDocChange => {
                  return preExamDocChange.doc.id
                }
              ),

            bctExamQuerySnapshot
              .docChanges()
              .map(
                preExamDocChange => {
                  return preExamDocChange.doc.id
                }
              )
              .sort(
                (id1, id2) => {
                  let year1 = /([\d]+).*/g.exec(id1)[1];
                  let year2 = /([\d]+).*/g.exec(id2)[1];
                  return parseInt(year2) - parseInt(year1)
                }
              )
          )
        } catch (error) {
          console.error(error.message)
        }
      },

      retrieveYear (yearExam) {
        return yearExam.substring(0, 3)
      },

      switchComponent (event, yearExam) {
        const vueModel = this
        const currentAnchorTarget = $(event.currentTarget)
        let subject = yearExam.includes('基測') ? '數學': vueModel.subject
        vueModel.yearExam = yearExam

        $('#years-tab .tab-active').removeClass('tab-active')
        currentAnchorTarget.addClass('tab-active')
        vueModel.retrieveResolvedVideos(subject)
      },

      retrieveResolvedVideos (subject) {
        const vueModel = this
        let preExamCategorySubtitle, componentName, preExamYearInfo
        vueModel.subject = subject
        vueModel.currentYear = vueModel.retrieveYear(vueModel.yearExam)

        if (vueModel.yearExam.includes('基測')) {
          preExamCategorySubtitle = `精選解題: ${vueModel.yearExam}${vueModel.subject}`
          componentName = 'BCTConcept'
          preExamYearInfo = {
            yearExam: vueModel.yearExam,
            subject: vueModel.subject
          }
        } else {
          preExamCategorySubtitle = `精選解題: ${vueModel.yearExam}${vueModel.subject}`
          componentName = 'YearExamContent'
          preExamYearInfo = {
            preExamCategoryDesc: '歷屆會考解題',
            yearExam: vueModel.yearExam,
            subject: vueModel.subject
          }
        }
        vueModel.determineResolvedVideos(preExamCategorySubtitle, componentName, preExamYearInfo)
      },

      determineResolvedVideos (preExamCategorySubtitle, componentName, preExamYearInfo) {
        const vueModel = this
        vueModel.preExamCategorySubtitle = preExamCategorySubtitle
        vueModel.componentName = componentName
        vueModel.preExamYearInfo = preExamYearInfo
      }
    }
  }
</script>

<style lang="less">
  @import '../static/less/year-tab.less';
</style>
