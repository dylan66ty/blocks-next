<script lang="ts" setup>
import { ref } from 'vue'
const checked = ref(false)
</script>

<template>
  <div>
      <bn-checkbox v-model="checked">Option 1</bn-checkbox>      
  </div>
</template>

<style lang="scss"></style>