<template lang="pug">
  .box.right
    article(v-if="ad && ad.link")
      a(:href="ad.link")
        img.banner(:src="`${adAwsS3Path}${ad.image}`")
    article(v-else-if="ad && !ad.link")
      img.banner(:src="`${adAwsS3Path}${ad.image}`")
</template>

<script>
  export default {
    name: 'AdvertisementUp',
    data () {
      return {
        ad: Object,
        adAwsS3Path:
          'https://s3-ap-northeast-1.amazonaws.com/ehanlin-web-resource/platform/1.0.0/resource/imgs/advertise/'
      }
    },

    props: {
      type: String
    },

    async mounted () {
      const vueModel = this
      let response = await vueModel.$axios(
        {
          method: 'get',
          url: `https://www.tbbt.com.tw/Advertise?type=${vueModel.type}`,
        }
      )
      let advertisements = response.data
      advertisements = advertisements.filter(advertisement => advertisement.position === 'up')
      if (advertisements && advertisements.length > 0) {
        vueModel.ad = advertisements.first()
      }
    }
  }
</script>

<style lang="less" scoped>
  @import '../static/less/util.less';
</style>