<script lang="ts" setup>
  import { ref } from 'vue'
  const checked = ref(false)
</script>

<template>
  <bn-checkbox v-model="checked">Vue</bn-checkbox>
</template>

<style lang="scss"></style>
