<script lang="ts" setup>
  import { ref } from 'vue';

  const model1 = ref(false);
  const model2 = ref(true);
  const model3 = ref(true);
</script>

<template>
  <div>
    <bn-space>
      <bn-switch v-model="model1" disabled />
      <bn-switch v-model="model2" disabled />
      <bn-switch v-model="model3" />
    </bn-space>
  </div>
</template>

<style lang="scss"></style>
