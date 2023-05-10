<script lang="ts" setup>
import { ref } from 'vue'
const selection = ref(['options1'])

</script>

<template>
  <bn-checkbox-group v-model="selection">
    <bn-checkbox label="options1"></bn-checkbox>
    <bn-checkbox label="options2"></bn-checkbox>
    <bn-checkbox label="options3"></bn-checkbox>
  </bn-checkbox-group>

</template>

<style lang="scss"></style>