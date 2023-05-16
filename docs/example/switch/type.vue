<script lang="ts" setup>
  import { ref } from 'vue';

  const model1 = ref(false);
  const model2 = ref(false);
</script>

<template>
  <div>
    <bn-space>
      <bn-switch v-model="model1" type="line" />
      <bn-switch v-model="model2" />
    </bn-space>
  </div>
</template>

<style lang="scss"></style>
