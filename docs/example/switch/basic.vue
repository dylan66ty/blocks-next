<script lang="ts" setup>
  import { ref } from 'vue'

  const model = ref(false)
  const model2 = ref(false)
</script>

<template>
  <div>
    <bn-space>
      <bn-switch v-model="model" />
      <bn-switch v-model="model2" active-color="#F53F3F" inactive-color="#14C9C9" />
    </bn-space>
  </div>
</template>

<style lang="scss"></style>
