<template lang="pug">
  #subject-list
    ul
      li(v-for="(subject, index) in subjects" :key="subject" @click="emitRetrieveResolvedVideos(subject, index)")
        div(:id="`cap-subject${index}`") {{ subject }}
</template>

<script>
  import { db } from '@/modules/firebase-config'

  export default {
    name: 'CapSubjectList',
    data () {
      return {
        subjects: []
      }
    },

    props: {
      yearExam: String
    },

    watch: {
      async yearExam (value) {
        const vueModel = this
        $('#subject-list > ul > li > div').removeClass('selected')
        $('#cap-subject0').addClass('selected')

        const subjectRef = db.collection('Subject')
        let subjectDocSnapshot
        if (value.includes('基測')) {
          subjectDocSnapshot = await subjectRef.doc('bct').get()
        } else {
          subjectDocSnapshot = await subjectRef.doc('cap').get()
        }

        vueModel.subjects = subjectDocSnapshot.data().subjects
        vueModel.$nextTick(() => {
          $('#subject-list > ul > li > div').removeClass('selected')
          $('#cap-subject0').addClass('selected')
        })

      }
    },

    methods: {
      emitRetrieveResolvedVideos (subject, index) {
        const vueModel = this
        vueModel.$emit('retrieve-resolved-videos', subject)
        $('#subject-list > ul > li > div').removeClass('selected')
        $(`#cap-subject${index}`).addClass('selected')
      }
    }
  }
</script>

<style lang="less" scoped>
  #subject-list {
    margin-bottom: 13px;

    & > ul {
      text-shadow: none;
      list-style-type: none;
      padding: 0;
      text-align: center;
      transition: all 0.3s ease;

      & > li {
        display: inline-block;
        margin: 10px;
        transition: all 0.3s ease;

        & > div {
          cursor: pointer;
          display: inline-block;
          color: #bdbdbd;
          background-color: #fafafa;
          transition: all 0.3s ease;
          box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.3);
          padding: 20px;
          width: 80px;
          text-align: center;
          font-size: 20px;

          &:hover {
            color: #424242;
            box-shadow: 0 3px 5px 0 rgba(0, 0, 0, 0.3);
          }

          &.selected {
            color: #e3e3e3;
            background-color: #424242;
          }
        }
      }
    }
  }
</style>