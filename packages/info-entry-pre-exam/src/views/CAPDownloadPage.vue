<template lang="pug">
  section
    LayoutBanner(:preExamCategory="preExamCategory" :key="preExamCategory")
    .box.right.con
      LayoutTagTitle 歷屆考題下載
      CAPDownloadList
</template>

<script>
  import LayoutBanner from '@/components/layout/LayoutBanner'
  import LayoutTagTitle from '@/components/layout/LayoutTagTitle'
  import CAPDownloadList from '@/components/cap/CapDownloadList'

  export default {
    name: 'CAPDownloadPage',
    components: {
      LayoutBanner,
      LayoutTagTitle,
      CAPDownloadList
    },

    data: () => {
      return {
        preExamCategory: 'cap',
      }
    },

    created () {
      const vueModel = this
      vueModel.$ehanlinComponentLoader()
    },

    mounted () {
      document.getElementById('info-left-side').style.display = ''
    },

    beforeDestroy () {
      document.getElementById('info-left-side').style.display = 'none'
    },
  }
</script>