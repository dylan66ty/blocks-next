<script lang="ts" setup>
  import { ref } from 'vue'

  const align = ref('center')
</script>

<template>
  <div>
    <bn-radio-group v-model="align" style="margin-bottom: 15px">
      <bn-radio label="center"></bn-radio>
      <bn-radio label="start"></bn-radio>
      <bn-radio label="end"></bn-radio>
      <bn-radio label="baseline"></bn-radio>
    </bn-radio-group>
  </div>

  <bn-space size="small" :align="align">
    <span>space:</span>
    <bn-button type="primary" size="min">Primary</bn-button>
    <bn-button type="success" size="small">Success</bn-button>
    <bn-button type="warning" size="large">Warning</bn-button>
  </bn-space>
</template>

<style lang="scss"></style>
