<script lang="ts" setup>
  import { ref } from 'vue'
  const selection = ref(['Vue'])
</script>

<template>
  <div class="mb-3">selection: {{ selection }}</div>

  <bn-checkbox-group v-model="selection">
    <bn-checkbox label="Vue"></bn-checkbox>
    <bn-checkbox label="React"></bn-checkbox>
    <bn-checkbox label="Angular"></bn-checkbox>
    <bn-checkbox label="JQuery" disabled></bn-checkbox>
  </bn-checkbox-group>

  <bn-checkbox-group v-model="selection" class="mt-2">
    <bn-checkbox label="Vue">
      <span class="text-gray-500">Vue</span>
    </bn-checkbox>
    <bn-checkbox label="React">
      <span class="text-gray-500">React</span>
    </bn-checkbox>
    <bn-checkbox label="Angular">
      <span class="text-gray-500">Angular</span>
    </bn-checkbox>
    <bn-checkbox label="JQuery" disabled>JQuery</bn-checkbox>
  </bn-checkbox-group>
</template>

<style lang="scss"></style>
