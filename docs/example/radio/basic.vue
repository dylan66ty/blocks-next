<script lang="ts" setup>
  import { ref } from 'vue';
  const radio = ref('Vue');
</script>

<template>
  <bn-space :size="20">
    <bn-radio v-model="radio" label="Vue"></bn-radio>
    <bn-radio v-model="radio" label="React"></bn-radio>
  </bn-space>
</template>

<style lang="scss"></style>
