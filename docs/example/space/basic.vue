<script lang="ts" setup>
import { ref } from 'vue';

const smodel = ref(true)
const inp = ref('')

</script>

<template>
  <bn-space>
    <span>Space:</span>
    <bn-button type="primary">Primary</bn-button>
    <bn-button type="success">Success</bn-button>
    <bn-input v-model="inp"></bn-input>
    <bn-switch v-model="smodel"></bn-switch>
  </bn-space>
</template>

<style lang="scss"></style>