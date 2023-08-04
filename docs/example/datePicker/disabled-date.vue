<script lang="ts" setup>
  import { ref } from 'vue'

  const date = ref('')
  const disabledDate = (date: Date) => {
    return date > new Date()
  }

  const month = ref('')
  const disabledMonth = (date: Date) => {
    return date > new Date()
  }

  const week = ref('')
  const disabledWeek = (date: Date) => {
    return date > new Date()
  }
</script>

<template>
  <div class="flex gap-x-5">
    <bn-date-picker
      v-model="date"
      placeholder="请选择日期"
      :disabled-date="disabledDate"
    ></bn-date-picker>
    <bn-date-picker
      v-model="month"
      type="month"
      placeholder="请选择月"
      :disabled-date="disabledMonth"
    ></bn-date-picker>
    <bn-date-picker
      v-model="week"
      type="week"
      placeholder="请选择周"
      :disabled-date="disabledWeek"
    ></bn-date-picker>
  </div>
</template>

<style lang="scss"></style>
