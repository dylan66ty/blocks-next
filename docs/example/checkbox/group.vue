<script lang="ts" setup>
  import { ref } from 'vue'
  const selection = ref(['Vue'])
</script>

<template>
  <div style="margin-bottom: 10px">v-model: {{ selection }}</div>
  <bn-checkbox-group v-model="selection">
    <bn-checkbox label="Vue"></bn-checkbox>
    <bn-checkbox label="React"></bn-checkbox>
    <bn-checkbox label="Angular"></bn-checkbox>
    <bn-checkbox label="JQuery" disabled></bn-checkbox>
  </bn-checkbox-group>
</template>

<style lang="scss"></style>
