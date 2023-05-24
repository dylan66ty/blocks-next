<script lang="ts" setup>
import { Notification } from 'blocks-next'


const autoClose = () => {
  Notification({
      title: '温馨提示',
      message: '由于您长时间未登录，为保证系统安全，请您重新登录！',
  })
}

const show = () => {
  Notification({
      title: 'Notification',
      message: '这是一条不会自动关闭的消息',
      type: 'warning',
      duration: 0
  })
}


</script>

<template>
    <bn-space>
      <bn-button fillMode="outline" size="small" @click="autoClose">可自动关闭</bn-button>
      <bn-button fillMode="outline" size="small" @click="show">不会自动关闭</bn-button>
    </bn-space>
</template>

<style lang="scss"></style>