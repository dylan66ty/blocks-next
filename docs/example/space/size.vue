<script lang="ts" setup>
  import { ref } from 'vue'

  const size = ref('mini')
</script>

<template>
  <bn-radio-group v-model="size" style="margin-bottom: 15px">
    <bn-radio label="mini"></bn-radio>
    <bn-radio label="small"></bn-radio>
    <bn-radio label="medium"></bn-radio>
    <bn-radio label="large"></bn-radio>
    <bn-radio :label="40">自定义40间距</bn-radio>
  </bn-radio-group>

  <bn-space :size="size">
    <bn-button type="primary">Primary</bn-button>
    <bn-button type="success">Success</bn-button>
    <bn-button type="warning">Warning</bn-button>
  </bn-space>
</template>

<style lang="scss"></style>
