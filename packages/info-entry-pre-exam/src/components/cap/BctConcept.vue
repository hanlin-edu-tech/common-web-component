<template lang="pug">
  div
    Youtube(:embeddedYoutubeLink="embeddedYoutubeLink" :key="embeddedYoutubeLink")

    #concept
      p.bct-name
        table.simple
          thead
            tr
              th 觀念
              th 題號
          tbody
            tr(v-for="(youtubeVideosByConcept, concept, index) in youtubeVideosGroupByConcept" :key="index")
              td {{ concept }}
              td.video-content
                ol.video-list
                  li(v-for="youtubeVideos in youtubeVideosByConcept" :key="youtubeVideos.youtubeId")
                    a.active(:data-youtube-id="youtubeVideos.youtubeId"
                      @click="playYoutubeVideo($event)") {{ youtubeVideos.number }}

</template>

<script>
  import { db } from '@/modules/firebase-config'
  import Youtube from '@/components/Youtube'

  export default {
    name: 'BCTConcept',
    data () {
      return {
        youtubeVideosGroupByConcept: {},
        embeddedYoutubeLink: ''
      }
    },

    props: {
      preExamYearInfo: {
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

    components: {
      Youtube
    },

    methods: {
      async retrieveYoutubeVideos () {
        const vueModel = this
        const preSelectedExamYearInfo = vueModel.preExamYearInfo
        const collectionName = `精選基測解題/${preSelectedExamYearInfo.yearExam}/YoutubeVideo`
        const youtubeVideoQuerySnapshot = await db.collection(collectionName)
          .where('subject', '==', preSelectedExamYearInfo.subject)
          .orderBy('conceptOrder', 'asc')
          .get()

        const youtubeVideos = []
        let youtubeVideosGroupByConcept = {}

        youtubeVideoQuerySnapshot.forEach(youtubeVideoDoc => {
          youtubeVideos.push(youtubeVideoDoc.data())
        })

        youtubeVideosGroupByConcept = youtubeVideos.objGroupBy('concept')
        Object.keys(youtubeVideosGroupByConcept)
          .forEach(
            concept => {
              const youtubeVideosByConcept = youtubeVideosGroupByConcept[concept]
              youtubeVideosGroupByConcept[concept] = youtubeVideosByConcept.sort(
                (youtubeVideos1, youtubeVideos2) => {
                  return youtubeVideos1.order - youtubeVideos2.order
                }
              )
            }
          )

        vueModel.youtubeVideosGroupByConcept = youtubeVideosGroupByConcept
      },

      playYoutubeVideo (event) {
        const vueModel = this
        const currentAnchorTarget = $(event.currentTarget)
        const videoSelectedTarget = $('.video-list a.selected')
        let youtubeId

        videoSelectedTarget.removeClass('selected')
        currentAnchorTarget.addClass('selected')

        youtubeId = currentAnchorTarget.data('youtube-id')
        vueModel.embeddedYoutubeLink =
          `https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0&hd=1&showinfo=0&enablejsapi=1`

      }
    }
  }
</script>

<style lang="less" scoped>
  @import '../../static/less/table.less';

  #concept {
    margin: 20px 15px;

    p.bct-name {
      font-size: 20px;
      text-indent: 0;
      width: 96%;
      margin: 15px;
      padding: 0;
    }

    table > tbody td {
      &:first-child {
        width: 180px;
        font-size: 16px;
      }

      &.video-content {
        text-align: left;
        padding: 0;

        ol.video-list {
          text-shadow: none;
          list-style-type: none;
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
              font-size: 14px;
              color: #bdbdbd;
              background-color: gray;
              transition: all 0.3s ease;
              box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.3);
              line-height: 40px;
              border-radius: 20px;
              width: 40px;
              height: 40px;
              text-align: center;

              &.active {
                background-color: #fafafa;

                &:hover {
                  color: #424242;
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
      }
    }
  }
</style>