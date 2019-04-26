<template lang="pug">
  section
    LayoutBanner(:preExamCategory="preExamCategory" :key="preExamCategory")
    .box.right(id='GSAT-pre-exam')
      LayoutTagTitle 歷屆學測解題
      ul.subject-btn
        li(v-for="(subjectInfo, index) in subjects" :key="index")
          div(@click="routeToResolvedVideos(subjectInfo.subject)")
            img(:class="subjectInfo.class ? subjectInfo.class : ''"
              :src="require(`@/static/img/${preExamCategory}/${subjectInfo.img}`)")

</template>

<script>
  import LayoutBanner from '@/components/layout/LayoutBanner'
  import LayoutTagTitle from '@/components/layout/LayoutTagTitle'

  export default {
    name: 'GSATPreExam',
    components: {
      LayoutBanner,
      LayoutTagTitle
    },

    data () {
      return {
        preExamCategory: 'gsat',
        preExamUrl: '',
        subjects: [
          {
            subject: '國文',
            img: 'pc.png'
          },
          {
            subject: '英文',
            img: 'en.png'
          },
          {
            subject: '數學',
            img: 'ma.png'
          },
          {
            subject: '自然',
            class: 'big',
            img: 'na.png'
          },
          {
            subject: '社會',
            class: 'big',
            img: 'so.png'
          },
        ]
      }
    },

    mounted () {
      document.getElementById('info-left-side').style.display = ''
    },

    beforeDestroy () {
      document.getElementById('info-left-side').style.display = 'none'
    },

    methods: {
      routeToResolvedVideos (subject) {
        const vueModel = this
        vueModel.$router.replace(`/resolvedVideos/gsat/歷屆學測解題?subject=${subject}`)
      }
    }
  }
</script>

<style lang="less" scoped>
  #GSAT-pre-exam ul.subject-btn {
    & > li {
      display: inline-block;
      margin: 10px;
      transition: all 0.3s ease;

      img {
        cursor: pointer;
        width: 220px;

        &.big {
          width: 100%;
        }
      }
    }
  }
</style>