<script lang="ts" setup>
  import { ref } from 'vue'
  const date = ref([])
</script>

<template>
  <bn-date-picker v-model="date" type="monthrange"></bn-date-picker>
</template>

<style lang="scss"></style>
