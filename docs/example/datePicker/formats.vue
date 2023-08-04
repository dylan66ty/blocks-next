<script lang="ts" setup>
  import { ref } from 'vue'

  const date = ref('')
  const modelValueFormat = ref('')
  const timestamp = ref('')
</script>

<template>
  <div class="flex items-center">
    <div class="flex flex-1 flex-col items-center">
      <div class="text-sm mb-2 text-gray-400">Date</div>
      <div class="text-sm mb-2 text-gray-400">value:{{ date }}</div>
      <bn-date-picker v-model="date"></bn-date-picker>
    </div>
    <div class="flex flex-1 flex-col items-center">
      <div class="text-sm mb-2 text-gray-400">yyyy-MM-dd</div>
      <div class="text-sm mb-2 text-gray-400">value:{{ modelValueFormat }}</div>
      <bn-date-picker
        v-model="modelValueFormat"
        type="date"
        model-value-format="yyyy-MM-dd"
      ></bn-date-picker>
    </div>
    <div class="flex flex-1 flex-col items-center">
      <div class="text-sm mb-2 text-gray-400">timestamp</div>
      <div class="text-sm mb-2 text-gray-400">value:{{ timestamp }}</div>
      <bn-date-picker
        v-model="timestamp"
        type="date"
        model-value-format="timestamp"
      ></bn-date-picker>
    </div>
  </div>
</template>

<style lang="scss"></style>
