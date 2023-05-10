<script lang="ts" setup>
import { ref } from 'vue'
const selection = ref(['options1','options5'])

</script>

<template>
  <div style="margin-bottom:10px;">v-model: {{ selection }}</div>
  <bn-checkbox-group v-model="selection">
    <bn-checkbox label="options1"></bn-checkbox>
    <bn-checkbox label="options2"></bn-checkbox>
    <bn-checkbox label="options3"></bn-checkbox>
    <bn-checkbox label="options4" disabled></bn-checkbox>
    <bn-checkbox label="options5" disabled></bn-checkbox>
  </bn-checkbox-group>

</template>

<style lang="scss"></style>