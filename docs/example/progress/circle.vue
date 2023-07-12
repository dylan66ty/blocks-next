<script lang="ts" setup>
  import { ref } from 'vue'

  const percent = ref(0.3)
  const handler = (step: number) => {
    percent.value = percent.value + step
  }
</script>

<template>
  <bn-space size="large">
    <bn-progress :percent="percent" type="circle"></bn-progress>
    <bn-progress :percent="percent" type="circle" status="success">
      <template #text="{ percent }"> 进度{{ percent }}% </template>
    </bn-progress>
    <bn-progress :percent="percent" type="circle" status="warning"></bn-progress>
    <bn-progress :percent="percent" type="circle" status="danger"></bn-progress>
  </bn-space>

  <bn-button-group>
    <bn-button type="primary" size="mini" @click="handler(-0.1)">-</bn-button>
    <bn-button type="primary" size="mini" @click="handler(0.1)">+</bn-button>
  </bn-button-group>
</template>

<style lang="scss"></style>
