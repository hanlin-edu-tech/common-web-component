<template lang="pug">
  .box-title
    .tag.blue
      p Studies
    .content
      slot
</template>

<script>
  export default {
    name: 'TagTitle'
  }
</script>