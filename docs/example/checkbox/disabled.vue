<script lang="ts" setup>
  import { ref } from 'vue'
  const checked1 = ref(false)
  const checked2 = ref(true)
  const indeterminate = ref(true)
</script>

<template>
  <bn-space :size="20">
    <bn-checkbox v-model="checked1" disabled>Vue</bn-checkbox>
    <bn-checkbox v-model="checked2" disabled>React</bn-checkbox>
    <bn-checkbox :indeterminate="indeterminate" disabled>React</bn-checkbox>
  </bn-space>
</template>

<style lang="scss"></style>
