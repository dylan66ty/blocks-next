<script lang="ts" setup>
  import { Notification } from '@blocks-next/index'
  const handler = () => {
    Notification({
      title: '温馨提示',
      message: '由于您长时间未登录，为保证系统安全，请您重新登录！',
      type: 'success',
      duration: 1000,
      position: 'top-left'
    })
  }

</script>

<template>
  <div>
    <bn-button @click="handler">open</bn-button>
  </div>
</template>

<style lang="scss"></style>