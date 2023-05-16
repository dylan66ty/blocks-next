<script lang="ts" setup>
  import { ref } from 'vue';

  const inp = ref(1);
</script>

<template>
  <div>
    <bn-input v-model="inp"></bn-input>
  </div>
</template>

<style lang="scss"></style>
