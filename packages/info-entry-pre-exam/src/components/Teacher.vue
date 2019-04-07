<template lang="pug">
  #teacher
    article(v-for='teacher in teachers', :key="teacher.subject")
      img.banner(:src="require(`@/static/img/${teacher.img}.png`)")
      a.btn.teacher-more(:href="teacher.link") 更多介紹
</template>

<script>
  import { db } from '../modules/firebase-config'

  export default {
    name: 'Teacher',
    data () {
      return {
        teachers: []
      }
    },

    props: {
      subject: String
    },

    mounted () {
      const vueModel = this
      if (vueModel.subject) {
        vueModel.retrieveTeachers()
      }

    },

    methods: {
      async retrieveTeachers () {
        const vueModel = this
        const teacherQuerySnapshot = await db.collection('Teacher')
          .where('subject', '==', vueModel.subject)
          .get()

        let teachers = []
        teacherQuerySnapshot.forEach(teacherDoc => {
          teachers.push(teacherDoc.data())
        })
        vueModel.teachers = teachers
      }
    }
  }
</script>

<style lang="less" scoped>
  #teacher {
    margin: 15px;
    border-bottom: 15px solid #3498db;
    position: relative;

    img.banner {
      display: block;
      margin: auto;
      width: 98%;
    }

    a.teacher-more {
      background-color: #E435CB;
      position: absolute;
      right: 0;
      bottom: 0;
      padding: 10px;

      &:hover {
        background-color: #AD0B96;
      }
    }
  }
</style>