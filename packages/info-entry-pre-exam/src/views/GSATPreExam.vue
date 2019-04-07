<template lang="pug">
  section
    LayoutBanner

    .box.right(id='GSAT-pre-exam')
      LayoutTagTitle 歷屆學測解題
      ul.subject-btn
        li(v-for="(subject, index) in subjects" :key="index")
          a(:href="subject.entry")
            img(:class="subject.class ? subject.class : ''"

              :src="require(`@/static/img/${subject.img}`)")

</template>

<script>
  import LayoutBanner from '@/components/layout/LayoutBanner'
  import LayoutTagTitle from '@/components/layout/LayoutTagTitle'

  export default {
    name: 'GSAT.vue',
    data () {
      return {
        subjects: [
          {
            entry: '/gsat/歷屆學測解題/國文',
            img: 'pc.png'
          },
          {
            entry: '/gsat/歷屆學測解題/英文',
            img: 'en.png'
          },
          {
            entry: '/gsat/歷屆學測解題/數學',
            img: 'ma.png'
          },
          {
            class: 'big',
            entry: '/gsat/歷屆學測解題/自然',
            img: 'na.png'
          },
          {
            class: 'big',
            entry: '/gsat/歷屆學測解題/社會',
            img: 'so.png'
          },
        ]
      }
    },
    components: {
      LayoutBanner,
      LayoutTagTitle
    }
  }
</script>

<style lang="less" scoped>
  #GSAT-pre-exam ul.subject-btn {
    & > li {
      display: inline-block;
      margin: 10px;
      transition: all 0.3s ease;
    }

    img {
      width: 220px;
    }

    img.big {
      width: 100%;
    }
  }
</style>