<script lang="ts" setup>
  import { ref } from 'vue'
  const size = ref('normal')
</script>

<template>
  <bn-radio-group v-model="size">
    <bn-radio label="small">small</bn-radio>
    <bn-radio label="normal">normal</bn-radio>
    <bn-radio label="large">large</bn-radio>
  </bn-radio-group>
  <div style="margin-top: 20px">
    <bn-progress style="width: 60%" :percent="0.7" :size="size" color="#50b142"></bn-progress>
    <br />
    <bn-progress
      style="width: 60%"
      :percent="0.7"
      :size="size"
      color="#50b142"
      type="circle"
    ></bn-progress>
  </div>
</template>

<style lang="scss"></style>
