<template lang="pug">
  #download-list.file-download
    table.simple(v-for="year in years" :key="year")
      thead
        tr
          th {{ year }} 年
          th 歷屆題本
          th 精彩解析
      tbody
        tr(v-for="(subjectOrder, subjectCode) in sortSubjectMapping" :key="subjectCode")
          td {{ splitSubject(subjectOrder) }}
          td
            a(:href="`${awsS3Path}/file/info/105jrhighexam/${year}_${subjectCode}_q.zip`" target="_blank")
              img(:src="require(`@/static/img/cap/download.png`)" width="172")
          td
            a(:href="`${awsS3Path}/file/info/105jrhighexam/${year}_${subjectCode}_a.zip`" target="_blank")
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
        awsS3Path: 'https://s3-ap-northeast-1.amazonaws.com/ehanlin-web-resource/platform/1.0.0/resource',
        years: ['107', '106', '105', '104', '103', '102', '101', '100', '99'],
        preExamCategory: 'cap',
        sortSubjectMapping: Object
      }
    },

    async mounted () {
      const vueModel = this
      const codeDocSnapshot = await db.collection('Subject').doc('code').get()
      const mapping = codeDocSnapshot.data().mapping
      vueModel.sortSubjectMapping = Object.values(mapping)
        .sort(
          (subjectOrder1, subjectOrder2) => {
            const order1 = subjectOrder1.split('-')[1]
            const order2 = subjectOrder2.split('-')[1]
            return order1 - order2
          }
        )
    },

    methods: {
      splitSubject (subjectOrder) {
        return subjectOrder.split('-')[0]
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
    }
  }
</style>