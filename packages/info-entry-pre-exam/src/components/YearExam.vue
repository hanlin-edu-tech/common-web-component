<template lang="pug">
  .con
    #video-panel.con.video-area
      article(v-for="(youtubeVideosByUnit, unit, index) in youtubeVideosGroupByUnit" :key="index")
        p.unit {{ retrieveUnitDesc (youtubeVideosByUnit, unit) }}
        ol.video-list
          li(v-for="youtubeVideos in youtubeVideosByUnit" :key="youtubeVideos.youtubeId")
            a.active(
              :data-youtube-id="youtubeVideos.youtubeId" @click="playYoutubeVideo($event)") {{ youtubeVideos.number }}

    Youtube(:embeddedYoutubeLink="embeddedYoutubeLink" :key="embeddedYoutubeLink")
</template>

<script>
  import { db } from '../modules/firebase-config'
  import Youtube from '@/components/Youtube'

  export default {
    name: 'YearExam',
    data () {
      return {
        youtubeVideosGroupByUnit: {},
        embeddedYoutubeLink: ''
      }
    },

    props: {
      preExamYearInfo: {
        preExamCategory: String,
        yearExam: String,
        subject: String
      }
    },

    async mounted () {
      const vueModel = this
      try {
        if (vueModel.preExamYearInfo) {
          await vueModel.retrieveYoutubeVideos()
        }
      } catch (error) {
        console.error(error)
      }
    },
    // watch:{
    //   preYearExamInfo(currentObject, oldObject){
    //     if(curVal){
    //       this.uploadImg=curVal;
    //     }
    //   },
    // }

    components: {
      Youtube
    },

    methods: {
      retrieveUnitDesc (youtubeVideosByUnit, unit) {
        return `${unit} (${youtubeVideosByUnit[0].number} ~ ${youtubeVideosByUnit.last().number})`
      },

      async retrieveYoutubeVideos () {
        const vueModel = this
        const preExamYearInfo = vueModel.preExamYearInfo
        const collectionName = `${preExamYearInfo.preExamCategory}/${preExamYearInfo.yearExam}/YoutubeVideo`
        const youtubeVideoQuerySnapshot = await db.collection(collectionName)
          .where('subject', '==', preExamYearInfo.subject)
          .get()

        const youtubeVideos = []
        let youtubeVideosGroupByUnit = {}

        youtubeVideoQuerySnapshot.forEach(youtubeVideoDoc => {
          youtubeVideos.push(youtubeVideoDoc.data())
        })

        youtubeVideosGroupByUnit = youtubeVideos.objGroupBy('unit')
        Object.keys(youtubeVideosGroupByUnit)
          .forEach(
            unit => {
              const youtubeVideosByUnit = youtubeVideosGroupByUnit[unit]
              youtubeVideosGroupByUnit[unit] = youtubeVideosByUnit.sort(
                (youtubeVideos1, youtubeVideos2) => {
                  return youtubeVideos1.order - youtubeVideos2.order
                }
              )
            }
          )

        vueModel.youtubeVideosGroupByUnit = youtubeVideosGroupByUnit
      },

      playYoutubeVideo (event) {
        const vueModel = this
        const currentAnchorTarget = $(event.currentTarget)
        const videoSelected = $('.video-list a.selected')
        let youtubeId

        videoSelected.removeClass('selected')
        currentAnchorTarget.addClass('selected')

        youtubeId = currentAnchorTarget.data('youtube-id')
        vueModel.embeddedYoutubeLink =
          `https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0&hd=1&showinfo=0&enablejsapi=1`

      }
    }
  }
</script>

<style lang="less" scoped>
  @import '../static/less/ui-tab.less';

  p.unit {
    font-size: 2.2em;
    text-indent: 0;
  }

  /*.con > ul {*/
  /*  text-shadow: none;*/
  /*  list-style-type: none;*/
  /*  padding: 0;*/
  /*  text-align: center;*/
  /*  transition: all 0.3s ease;*/
  /*}*/

  /*.con > ul > li {*/
  /*  display: inline-block;*/
  /*  margin: 10px;*/
  /*  transition: all 0.3s ease;*/
  /*}*/

  /*.con > ul > li > a {*/
  /*  cursor: pointer;*/
  /*  display: inline-block;*/
  /*  color: #bdbdbd;*/
  /*  background-color: #fafafa;*/
  /*  transition: all 0.3s ease;*/
  /*  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.3);*/
  /*  padding: 20px 20px 20px 20px;*/
  /*  width: 80px;*/
  /*  text-align: center;*/
  /*  font-size: 20px;*/
  /*}*/

  /*.con > ul > li > a:hover {*/
  /*  color: #424242;*/
  /*  box-shadow: 0px 3px 5px 0px rgba(0, 0, 0, 0.3);*/
  /*}*/

  /*.con > ul > li > a.selected {*/
  /*  color: #bdbdbd;*/
  /*  background-color: #424242;*/
  /*}*/

  .con > article {
    & > ol {
      text-shadow: none;
      list-style-type: none;
      padding: 0;
      margin: 20px 0;
      transition: all 0.3s ease;

      & > li {
        display: inline-block;
        margin: 10px;
        transition: all 0.3s ease;
        width: 50px;
        text-align: center;

        & > a {
          cursor: pointer;
          display: inline-block;
          color: #a7a7a7;
          background-color: gray;
          transition: all 0.3s ease;
          box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.3);
          line-height: 40px;
          border-radius: 20px;
          width: 40px;
          height: 40px;
          text-align: center;
        }

        & > a.active {
          background-color: #fafafa;
          font-size: 14px;
          font-weight: 600;

          &:hover {
            color: #3a3a3a;
            box-shadow: 0 3px 5px 0 rgba(0, 0, 0, 0.3);
          }

          &.selected {
            color: #bdbdbd;
            background-color: #424242;
          }
        }
      }
    }
  }
</style>