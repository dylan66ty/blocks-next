<script lang="ts" setup>
  import { Message } from 'blocks-next'

  const handler = () => {
    Message.info({
      message: '手动关闭',
      duration: 0,
      showClose: true
    })
  }
</script>

<template>
  <bn-space>
    <bn-button size="small" @click="handler">open message</bn-button>
  </bn-space>
</template>

<style lang="scss"></style>
