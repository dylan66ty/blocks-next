<script lang="ts" setup>
  import { ref } from 'vue'
  import { Loading } from '@blocks-next/index'

  const loading = ref(false)
  const loadingText = ref('loadingText')

  const handler = () => {
    loading.value = true

    setTimeout(() => {
      loading.value = false

      loadingText.value = 'pppppp'
    }, 1000)
  }

  const handlerFull = () => {
    const instance = Loading.open({
      text: 'loading'
    })
    console.log(instance)
    setTimeout(() => {
      instance?.updateText('loading 2222')
    }, 300)

    setTimeout(() => {
      instance.close()
    }, 1000)
  }
</script>

<template>
  <div
    style="width: 100px; height: 100px; border: 1px solid #ddd"
    v-bn-loading="loading"
    bn-loading-background="skyblue"
    bn-loading-customClass="test"
    bn-loading-iconSize="20"
    bn-loading-color="red"
  >
    <div class="aaaaaa"></div>
  </div>

  <bn-button @click="handler"> loading </bn-button>

  <bn-button @click="handlerFull"> loading full </bn-button>
</template>

<style lang="scss">
  .box {
    width: 100%;
    height: 100vh;
    display: flex;

    justify-content: space-between;
  }
</style>
