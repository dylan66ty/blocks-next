<script lang="ts" setup>
  import { Notification } from 'blocks-next'

  const handler = (position) => {
    Notification({
      title: 'Notification',
      message: '这是一条不会自动关闭的消息',
      type: 'info',
      duration: 1000,
      position
    })
  }
</script>

<template>
  <bn-space>
    <bn-button size="small" @click="handler('top-right')">Top Right</bn-button>
    <bn-button size="small" @click="handler('top-left')">Top Left</bn-button>
    <bn-button size="small" @click="handler('bottom-right')">Bottom Right</bn-button>
    <bn-button size="small" @click="handler('bottom-left')">Bottom Left</bn-button>
  </bn-space>
</template>

<style lang="scss"></style>
