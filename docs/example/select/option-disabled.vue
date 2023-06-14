<script lang="ts" setup>
import { ref } from 'vue';
const model = ref('');
</script>

<template>
  <bn-select v-model="model" placeholder="请选择">
    <bn-option label="Vue" value="vue"></bn-option>
    <bn-option label="React" value="react" disabled></bn-option>
    <bn-option label="Angular" value="angular"></bn-option>
  </bn-select>
</template>

<style lang="scss"></style>
