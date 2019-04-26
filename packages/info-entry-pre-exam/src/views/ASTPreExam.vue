<template lang="pug">
  section
    LayoutBanner(:preExamCategory="preExamCategory" :key="preExamCategory")
    .box.right(id='AST-pre-exam')
      LayoutTagTitle 歷屆指考解題
      .background
        img.how-to(:src="require(`@/static/img/ast/how-to.png`)")
        article(v-for="(subjectInfo, index) in subjects" :key="index")
          div.subject(:class="subjectInfo.class" @click="routeToResolvedVideos(subjectInfo.subject)")
            span.name {{ subjectInfo.subject }}
            div(v-html="subjectInfo.teacherTeams")
</template>

<script>
  import LayoutBanner from '@/components/layout/LayoutBanner'
  import LayoutTagTitle from '@/components/layout/LayoutTagTitle'

  export default {
    name: 'ASTPreExam',
    components: {
      LayoutBanner,
      LayoutTagTitle
    },

    data () {
      return {
        preExamCategory: 'ast',
        preExamUrl: '',
        subjects: [
          {
            subject: '國文',
            class: 'pc',
            teacherTeams: '<span>江超平老師</span>'
          },
          {
            subject: '英文',
            class: 'en',
            teacherTeams: '<span>百大升學中心</span>'
          },
          {
            subject: '數學',
            class: 'ma',
            teacherTeams: '<span>傅壹團隊</span>'
          },
          {
            subject: '自然',
            class: 'na',
            teacherTeams: `
              <ul>
                <li>物理-張鎮麟團隊、黃耀和老師</li>
                <li>化學-蘇建明老師、董樂老師</li>
                <li>生物-姜孟希殷琴團隊</li>
              </ul>
            `
          },
          {
            subject: '社會',
            class: 'so',
            teacherTeams: '<span>地理、歷史、公民-弘理團隊</span>'
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
        vueModel.$router.replace(`/resolvedVideos/ast/歷屆指考解題?subject=${subject}`)
      }
    }
  }
</script>

<style lang="less" scoped>
  #AST-pre-exam {
    .background {
      position: relative;
      height: 520px;

      .how-to {
        width: 30%;
        top: 190px;
        left: 225px;
        position: absolute;
      }

      .subject {
        padding: 10px;
        position: absolute;
        display: flex;
        align-items: center;
        align-content: center;
        justify-content: center;
        flex-wrap: wrap;
        z-index: 1;

        &:after {
          top: 5px;
          left: 5px;
          content: " ";
          width: inherit;
          height: inherit;
          padding: 10px;
          position: absolute;
          border: 2px solid;
          display: block;
          color: black;
          z-index: 0;
        }

        &:hover {
          cursor: pointer;
          box-shadow: 5px 5px 20px gray;
        }

        .name {
          font-weight: bold;
          font-size: 40px;
          margin: 10px;
        }

        &.pc {
          top: 165px;
          left: 25px;
          width: 150px;
          height: 175px;
          background: rgb(220, 42, 27);
          color: rgb(246, 180, 212);
        }

        &.en {
          top: 215px;
          left: 470px;
          width: 215px;
          height: 130px;
          background: rgb(250, 224, 20);
          color: rgb(227, 18, 69);

          .name {
            width: 100%;
            text-align: center;
          }
        }

        &.ma {
          top: 15px;
          left: 455px;
          width: 150px;
          height: 160px;
          background: rgb(249, 133, 60);
          color: rgb(254, 237, 138);
        }

        &.na {
          top: 20px;
          left: 50px;
          width: 360px;
          height: 100px;
          background: rgb(187, 215, 0);
          color: rgb(0, 166, 89);
        }

        &.so {
          top: 385px;
          left: 120px;
          width: 450px;
          height: 90px;
          background: rgb(58, 41, 150);
          color: rgb(174, 219, 240);
        }
      }
    }
  }
</style>