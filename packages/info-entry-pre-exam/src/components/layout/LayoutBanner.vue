<template lang="pug">
  .box.right
    .banner-top
      img.banner(src='../../static/img/banner.png')
</template>

<script>
  export default {
    name: 'LayoutBanner',
    props: {
      msg: String
    }
  }
</script>

<style lang="less" scoped>
  @import '../../static/less/util.less';

  .banner-top {
    position: relative;
  }
</style>
