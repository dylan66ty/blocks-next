<script lang="ts" setup>
  import { ref } from 'vue'

  const weeks = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']

  const week = ref(0)

  const date = ref('')
</script>

<template>
  <bn-radio-group v-model="week">
    <bn-radio v-for="(item, index) in weeks" :key="index" :label="index">{{ item }}</bn-radio>
  </bn-radio-group>
  <div class="mt-4">
    <bn-date-picker
      v-model="date"
      placeholder="请选择日期"
      clearable
      :day-start-of-week="week"
    ></bn-date-picker>
  </div>
</template>

<style lang="scss"></style>
