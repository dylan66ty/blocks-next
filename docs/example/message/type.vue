<script lang="ts" setup>
import { Message } from 'blocks-next'

const handler = (type) => {
  Message[type]('今晚吃烤串')
}

</script>

<template>
    <bn-space>
      <bn-button size="small"  type="success" @click="handler('success')">成功(success)</bn-button>
      <bn-button size="small"  type="warning" @click="handler('warning')">警告(waring)</bn-button>
      <bn-button size="small"  type="strong" @click="handler('strong')">强烈警告(strong)</bn-button>
      <bn-button size="small"  type="danger" @click="handler('error')">错误(error)</bn-button>
      <bn-button size="small"  type="default" @click="handler('info')">消息(info)</bn-button>
    </bn-space>
</template>

<style lang="scss"></style>