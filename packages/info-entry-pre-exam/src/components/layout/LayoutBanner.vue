<template lang="pug">
  .box.right
    .banner-top
      img.banner(:src="require(`@/static/img/${preExamCategory}/banner.png`)")
</template>

<script>
  export default {
    name: 'LayoutBanner',
    props: {
      preExamCategory: String
    }
  }
</script>

<style lang="less" scoped>
  @import '../../static/less/util.less';

  .banner-top {
    position: relative;
  }
</style>
