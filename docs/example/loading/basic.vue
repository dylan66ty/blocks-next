<script lang="ts" setup>
  import { ref } from 'vue'
  const loading = ref(false)

  const handler = () => {
    loading.value = true
    setTimeout(() => {
      loading.value = false
    }, 1000)
  }
</script>

<template>
  <div v-bn-loading="loading" class="loading-area">
    <bn-button @click="handler">open loading</bn-button>
  </div>
</template>

<style lang="scss">
  .loading-area {
    height: 300px;
    border: 1px solid #eee;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
