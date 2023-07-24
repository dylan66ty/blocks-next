<script lang="ts" setup>
  import { ref } from 'vue'
  import { Loading } from 'blocks-next'

  const loading = ref(false)

  const handler = () => {
    loading.value = true
    setTimeout(() => {
      loading.value = false
    }, 1000)
  }

  const openLoading = () => {
    const instance = Loading.open({
      text: '请稍后'
    })

    setTimeout(() => {
      instance.updateText('正在努力加载资源')
    }, 1000)

    setTimeout(() => {
      instance.close()
    }, 2000)
  }
</script>

<template>
  <bn-space>
    <bn-button v-bn-loading.fullScreen="loading" @click="handler"
      >open loading by directive</bn-button
    >
    <bn-button @click="openLoading">open full loading by open</bn-button>
  </bn-space>
</template>

<style lang="scss"></style>
