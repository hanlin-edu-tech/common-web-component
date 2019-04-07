<template lang="pug">
  iframe#youtube-player(title="Exam answer youtube player"
    frameborder="0" allowfullscreen="allowfullscreen" width="640",
    :src="embeddedYoutubeLink" :class="embeddedYoutubeLink ? 'open' : ''"
  )
</template>

<script>
  export default {
    name: 'Youtube',
    props: {
      embeddedYoutubeLink: String
    },

    mounted () {
      const vueModel = this
      if (vueModel.embeddedYoutubeLink) {
        const youtubeFrameTarget = $('#youtube-player')
        $('html, body').animate({
          scrollTop: youtubeFrameTarget.offset().top
        }, 'slow')
      }

    }
  }
</script>

<style lang="less" scoped>
  #youtube-player {
    width: 680px;
    height: 0;
    display: block;
    margin: auto;
    transition: all 0.3s ease;

    &.open {
      height: 422px;
    }
  }
</style>