<script lang="ts" setup>
  import { ref } from 'vue'
  const date = ref('')
</script>

<template>
  <div class="flex gap-x-5">
    <bn-date-picker v-model="date" placeholder="请选择日期" clearable></bn-date-picker>
    <bn-date-picker v-model="date" placeholder="请选择日期" clearable disabled></bn-date-picker>
  </div>
</template>

<style lang="scss"></style>
