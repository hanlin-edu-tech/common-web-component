<template lang="pug">
  #download-list.file-download
    table.simple(v-for="year in years" :key="year")
      thead
        tr
          th {{ year }} 年
          th 歷屆題本
          th 精彩解析
      tbody
        // 99 100 基測相關下載檔案為 zip 檔
        template(v-if="(year === 99 || year === 100)")
          tr(v-for="sortCodeSubject in sortCodeSubjects" :key="sortCodeSubject")
            td {{ splitSubject(sortCodeSubject) }}
            td
              a(:href="`${gsatFilesGCSDownload}/會考解析/${year}/題本/${year}${sortCodeSubject.split('-')[1]}題本.zip`"
                target="_blank")
                img(:src="require(`@/static/img/cap/download.png`)" width="172")
            td
              a(:href="`${gsatFilesGCSDownload}/會考解析/${year}/解析/${year}${sortCodeSubject.split('-')[1]}解析.zip`"
                target="_blank")
                img(:src="require(`@/static/img/cap/download.png`)" width="172")

        template(v-else)
          tr(v-for="sortCodeSubject in sortCodeSubjects" :key="sortCodeSubject")
            td {{ splitSubject(sortCodeSubject) }}
            td
              a(:href="`${gsatFilesGCSDownload}/會考解析/${year}/題本/${year}${sortCodeSubject.split('-')[1]}題本.pdf`"
                target="_blank")
                img(:src="require(`@/static/img/cap/download.png`)" width="172")
            td
              a(:href="`${gsatFilesGCSDownload}/會考解析/${year}/解析/${year}${sortCodeSubject.split('-')[1]}解析.pdf`"
                target="_blank")
                img(:src="require(`@/static/img/cap/download.png`)" width="172")

    a(:href="`https://www.ehanlin.com.tw/type/TRIAL/category/%E3%80%90e%E5%90%8D%E5%B8%AB%E3%80%91%E9%AB%98%E4%B8%AD%E5%85%88%E4%BF%AE/SalesPlans.html`")
      img.banner(:src="require(`@/static/img/cap/download-sub-banner.png`)")
</template>

<script>
  import { db } from '@/modules/firebase-config'
  import LayoutBanner from '@/components/layout/LayoutBanner'

  export default {
    name: 'CAPDownloadList',
    components: {
      LayoutBanner
    },

    data () {
      return {
        years: [108, 107, 106, 105, 104, 103, 102, 101, 100, 99],
        preExamCategory: 'cap',
        sortCodeSubjects: Array,
        sortCodes: Array,
        gsatFilesGCSDownload: 'https://storage.googleapis.com/ehanlin-web-resource/tutor-platform/infos/cap/file'
      }
    },

    async mounted () {
      const vueModel = this
      const codeDocSnapshot = await db.collection('Subject').doc('code').get()
      const codeSubjectMapping = codeDocSnapshot.data().mapping
      const codeSubjects = []
      for (let code in codeSubjectMapping) {
        const subject = codeSubjectMapping[code]
        codeSubjects.push(`${code}-${subject}`)
      }

      vueModel.sortCodeSubjects = codeSubjects
        .sort(
          (sortCodeSubject1, sortCodeSubject2) => {
            const order1 = sortCodeSubject1.split('-')[2]
            const order2 = sortCodeSubject2.split('-')[2]
            return order1 - order2
          }
        )
    },

    methods: {
      /* 返回科目名稱 */
      splitSubject (subjectOrder) {
        return subjectOrder.split('-')[1]
      }
    }
  }
</script>

<style lang="less" scoped>
  @import '../../static/less/util.less';
  @import '../../static/less/table.less';

  #download-list.file-download {
    margin: 15px;

    & > table {
      width: 100%;
      margin: 15px 0;

      thead th, tbody td {
        font-size: 13px;
      }
    }
  }
</style>