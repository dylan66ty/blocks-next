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
  <div
    class="loading-area"
    v-bn-loading="loading"
    bn-loading-background="rgba(0,0,0,0.3)"
    bn-loading-iconSize="40"
    bn-loading-text="自定义加载文字"
    bn-loading-color="rgba(241, 37, 37, 1)"
  >
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
