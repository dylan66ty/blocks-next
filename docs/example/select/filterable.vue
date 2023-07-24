<script lang="ts" setup>
  import { ref } from 'vue'
  const single = ref('')
  const multiple = ref([])
</script>

<template>
  <div class="flex gap-x-5">
    <div class="flex flex-col">
      <span class="mb-2">Filterable[Single selection]</span>
      <bn-select v-model="single" placeholder="请搜索" filterable clearable>
        <bn-option label="Vue" value="vue"></bn-option>
        <bn-option label="React" value="react"></bn-option>
        <bn-option label="Angular" value="angular"></bn-option>
      </bn-select>
    </div>
    <div class="flex flex-col">
      <span class="mb-2">Filterable[Multiple selection]</span>
      <bn-select v-model="multiple" placeholder="请搜索" multiple filterable clearable>
        <bn-option
          v-for="item in 10"
          :key="`value${item}`"
          :label="`Option${item}`"
          :value="`value${item}`"
        ></bn-option>
      </bn-select>
    </div>
  </div>
</template>

<style lang="scss"></style>
