<script lang="ts" setup>
  import { ref } from 'vue'
  const radio = ref('Vue')
</script>

<template>
  <bn-space :size="20">
    <bn-radio v-model="radio" label="Vue"></bn-radio>
    <bn-radio v-model="radio" label="React"></bn-radio>
  </bn-space>

  <div class="mt-3">
    <bn-space :size="20">
      <bn-radio v-model="radio" label="Vue">
        <span class="text-gray-500">Vue</span>
      </bn-radio>
      <bn-radio v-model="radio" label="React">
        <span class="text-gray-500">React</span>
      </bn-radio>
    </bn-space>
  </div>
</template>

<style lang="scss"></style>
