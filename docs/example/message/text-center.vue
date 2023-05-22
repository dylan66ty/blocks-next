<script lang="ts" setup>
import { Message } from 'blocks-next'

const handler = () => {
  Message.info({
    center: true,
    message: '文字居中'
  })
}

</script>

<template>
    <bn-space>
      <bn-button fillMode="outline" size="small" @click="handler">文字居中</bn-button>
    </bn-space>
</template>

<style lang="scss"></style>