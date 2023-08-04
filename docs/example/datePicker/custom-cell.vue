<script lang="ts" setup>
  import { ref } from 'vue'
  const date = ref('')
</script>

<template>
  <div class="mt-4">
    <bn-date-picker v-model="date" placeholder="请选择日期" clearable>
      <template #cell="{ cell }">
        <div class="relative">
          <span>{{ cell.label }}</span>
          <span
            v-if="cell.isNow"
            class="text-red-500 font-bold absolute -bottom-3 left-1/2 -translate-x-1/2"
            >today</span
          >
          <span
            v-if="cell.isSelect"
            class="text-blue-500 font-bold absolute -bottom-3 left-1/2 -translate-x-1/2"
            >select</span
          >
        </div>
      </template>
    </bn-date-picker>
  </div>
</template>

<style lang="scss"></style>
