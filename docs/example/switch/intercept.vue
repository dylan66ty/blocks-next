<script lang="ts" setup>
  import { getCurrentInstance, ref } from 'vue'
  import { Message } from 'blocks-next'

  const model = ref(false)
  const model2 = ref(false)

  const instance = getCurrentInstance()

  const beforeChangeSuccess = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true)
      }, 800)
    })
  }

  const beforeChangeError = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        reject(true)
        // todo something
        Message.error('校验不通过')
      }, 800)
    })
  }
</script>

<template>
  <div>
    <bn-switch v-model="model" :before-change="beforeChangeSuccess" />
    <bn-switch v-model="model2" :before-change="beforeChangeError" />
  </div>
</template>

<style lang="scss"></style>
