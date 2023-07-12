<script lang="ts" setup>
  import { ref } from 'vue'

  const visible = ref(false)
  const open = () => {
    visible.value = true
  }
</script>

<template>
  <div style="height: 300vh; padding-top: 100vh">
    <bn-button @click="open">open</bn-button>

    <bn-drawer v-model="visible" placement="right"></bn-drawer>
  </div>
</template>

<style lang="scss"></style>
