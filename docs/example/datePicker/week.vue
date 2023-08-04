<script lang="ts" setup>
  import { ref } from 'vue'

  const date = ref([])
</script>

<template>
  <bn-date-picker v-model="date" type="week" placeholder="请选择周"></bn-date-picker>
</template>

<style lang="scss"></style>
