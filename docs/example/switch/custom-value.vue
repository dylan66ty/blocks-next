<script lang="ts" setup>
  import { ref } from 'vue';

  const model = ref('on');
</script>

<template>
  <div> <bn-switch v-model="model" true-value="on" false-value="off" /> {{ model }} </div>
</template>

<style lang="scss"></style>
