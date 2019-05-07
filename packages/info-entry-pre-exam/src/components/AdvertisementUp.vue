<template lang="pug">
  .box.right
    article
      a(:href="adLink")
        img.banner(:src="require(`@/static/img/ad/${adImg}`)")
</template>

<script>
  export default {
    name: 'AdvertisementUp',
    data () {
      return {
        adLink: '',
        adImg: 'ad-gsat.gif'
      }
    },

    props: {
      preExamCategory: String
    },

    async mounted () {
      const vueModel = this
      vueModel.determineAd()
    },

    methods: {
      determineAd () {
        const vueModel = this
        switch (vueModel.preExamCategory) {
          case 'gsat' : {
            vueModel.adLink =
              'https://www.ehanlin.com.tw/type/ONLINE/category/%E9%AB%98%E4%B8%AD%E5%AD%B8%E6%B8%AC%E7%B8%BD%E8%A4%87%E7%BF%92e%E5%90%8D%E5%B8%AB/SalesPlans.html'
            vueModel.adImg = 'ad-gsat.gif'
            break
          }

          case 'ast' : {
            vueModel.adLink =
              'https://www.ehanlin.com.tw/type/ONLINE/category/%E3%80%90e%E5%90%8D%E5%B8%AB%E3%80%91%E9%AB%98%E4%B8%AD%E6%8C%87%E8%80%83%E7%B8%BD%E8%A4%87%E7%BF%92/SalesPlans.html'
            vueModel.adImg = 'ad-ast.gif'
            break
          }
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  @import '../static/less/util.less';
</style>