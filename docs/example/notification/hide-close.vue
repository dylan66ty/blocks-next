<script lang="ts" setup>
import { Notification } from 'blocks-next'

const handler = () => {
  Notification({
      title: 'Notification',
      message: '这是一条没有关闭按钮的消息',
      type: 'info',
      duration: 1000,
      showClose:false
  })
}


</script>

<template>
    <bn-space>
      <bn-button fillMode="outline" size="small" @click="handler">隐藏关闭按钮</bn-button>
    </bn-space>
</template>

<style lang="scss"></style>