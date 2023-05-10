<script lang="ts" setup>
import { ref } from 'vue';
 const radio = ref(1)
</script>

<template>
  <div>
    <div style="margin-bottom:10px">v-model : {{ radio }}</div>
    <bn-radio-group v-model="radio">
      <bn-radio :label="1"></bn-radio>
      <bn-radio :label="2"></bn-radio>
      <bn-radio :label="3"></bn-radio>
    </bn-radio-group>
  </div>
</template>

<style lang="scss"></style>