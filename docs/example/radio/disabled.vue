<script lang="ts" setup>
  import { ref } from 'vue';
  const radio = ref(1);
</script>

<template>
  <bn-space :size="20">
    <bn-radio v-model="radio" :label="1" disabled>Vue</bn-radio>
    <bn-radio v-model="radio" :label="2" disabled>React</bn-radio>
  </bn-space>
</template>

<style lang="scss"></style>
