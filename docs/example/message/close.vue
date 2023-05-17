<script lang="ts" setup>
import { Message } from 'blocks-next'

let msgIns = null
const handler = () => {
 msgIns = Message.info({
    message: '手动关闭',
    duration: 0,
    showClose:true
  })
}
const close = () => {
  msgIns?.close()
}

</script>

<template>
    <bn-space>
      <bn-button fillMode="outline" @click="handler">open message</bn-button>
      <bn-button fillMode="outline" type="danger" @click="close">close message</bn-button>
    </bn-space>

    
</template>

<style lang="scss"></style>