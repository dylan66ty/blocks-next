<script lang="ts" setup>
  import { Notification } from 'blocks-next'

  const open = (type) => {
    Notification({
      title: '温馨提示',
      message: '由于您长时间未登录，为保证系统安全，请您重新登录！',
      type
    })
  }
</script>

<template>
  <bn-space>
    <bn-button size="small" type="primary" @click="open('info')">info</bn-button>
    <bn-button size="small" type="success" @click="open('success')">success</bn-button>
    <bn-button size="small" type="warning" @click="open('warning')">warning</bn-button>
    <bn-button size="small" type="strong" @click="open('strong')">strong</bn-button>
    <bn-button size="small" type="danger" @click="open('error')">error</bn-button>
    <bn-button size="small" @click="open('none')">none</bn-button>
  </bn-space>
</template>

<style lang="scss"></style>
