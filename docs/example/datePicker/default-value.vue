<script lang="ts" setup>
  import { ref } from 'vue'

  const date = ref('2023-08-01') // new Date('2023-08-01')
  const month = ref('2022-01') // new Date('2022-01')
  const week = ref('2023-30周') // ['2023-07-23', '2023-07-29'] 或 [new Date('2023-07-23'), new Date('2023-07-29')]
  const daterange = ref(['2023-08-01', '2023-08-10']) // [new Date('2023-08-01'), new Date('2023-08-10')]
  const monthrange = ref(['2023-01', '2023-08']) // [new Date('2023-01'),new Date('2023-08')]
</script>

<template>
  <div class="text-sm mb-2">日期</div>
  <bn-date-picker v-model="date"></bn-date-picker>
  <div class="text-sm mb-2 mt-4">月份</div>
  <bn-date-picker v-model="month" type="month"></bn-date-picker>
  <div class="text-sm mb-2 mt-4">周</div>
  <bn-date-picker v-model="week" type="week"></bn-date-picker>
  <div class="text-sm mb-2 mt-4">日期范围</div>
  <bn-date-picker v-model="daterange" type="daterange"></bn-date-picker>
  <div class="text-sm mb-2 mt-4">月份范围</div>
  <bn-date-picker v-model="monthrange" type="monthrange"></bn-date-picker>
</template>

<style lang="scss"></style>
