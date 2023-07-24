<script lang="ts" setup>
  import { ref } from 'vue'
  const content = ref(
    `
  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ex assumenda dolorum unde obcaecati ut, aspernatur, iusto excepturi quos labore illo voluptas nesciunt provident placeat illum neque doloremque repudiandae id vitae.
  `.repeat(3)
  )
</script>

<template>
  <bn-space>
    <bn-tooltip content="This is tooltip content">
      <bn-button size="small">鼠标移入显示</bn-button>
    </bn-tooltip>

    <bn-tooltip :content="content">
      <bn-button size="small">鼠标移入显示(dark)</bn-button>
    </bn-tooltip>

    <bn-tooltip :content="content" effect="light">
      <bn-button size="small">鼠标移入显示(light)</bn-button>
    </bn-tooltip>
  </bn-space>
</template>

<style lang="scss"></style>
