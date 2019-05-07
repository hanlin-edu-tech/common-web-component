<template lang="pug">
  #download-list.file-download
    table.simple(v-for="year in years" :key="year")
      thead
        tr
          th {{ year }} 年
          th 歷屆題本
          th 精彩解析
      tbody
        tr(v-for="sortCodeSubject in sortCodeSubjects" :key="sortCodeSubject")
          td {{ splitSubject(sortCodeSubject) }}
          td
            a(:href="`${gsatFilesGCSDownload}/題本與解析/${year}_${sortCodeSubject.split('-')[0]}_q.zip`"
              target="_blank")
              img(:src="require(`@/static/img/cap/download.png`)" width="172")
          td
            a(:href="`${gsatFilesGCSDownload}/題本與解析/${year}_${sortCodeSubject.split('-')[0]}_a.zip`"
              target="_blank")
              img(:src="require(`@/static/img/cap/download.png`)" width="172")

    img.banner(:src="require(`@/static/img/cap/download-sub-banner.png`)")
</template>

<script>
  import { db } from '@/modules/firebase-config'
  import LayoutBanner from '@/components/layout/LayoutBanner'

  export default {
    name: 'CapDownloadList',
    components: {
      LayoutBanner
    },

    data () {
      return {
        years: ['107', '106', '105', '104', '103', '102', '101', '100', '99'],
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