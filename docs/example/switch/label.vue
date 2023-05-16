<script lang="ts" setup>
  import { ref } from 'vue';

  const model = ref(false);
</script>

<template>
  <bn-space :size="50">
    <bn-switch v-model="model" active-text="on" inactive-text="off" />
    <bn-switch
      v-model="model"
      active-text="Y"
      inactive-text="N"
      inline-prompt
      inactive-color="#ff4949"
      active-color="#13ce66"
    />
  </bn-space>
</template>

<style lang="scss"></style>
