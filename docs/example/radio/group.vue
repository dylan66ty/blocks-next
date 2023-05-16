<script lang="ts" setup>
  import { ref } from 'vue';
  const radio = ref('vue');
</script>

<template>
  <div>
    <div style="margin-bottom: 10px">激活 : {{ radio }}</div>
    <bn-radio-group v-model="radio">
      <bn-radio label="vue">Vue</bn-radio>
      <bn-radio label="react">React</bn-radio>
      <bn-radio label="angular">Angular</bn-radio>
    </bn-radio-group>
  </div>
</template>

<style lang="scss"></style>
