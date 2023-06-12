<script lang="ts" setup>
import { Notification } from 'blocks-next'
import { h , ref} from 'vue'
const handler = () => {
  Notification({
      title: 'Notification',
      message: h('div',null, '这是一条使用renderFunction渲染的消息'),
      type: 'info',
      duration: 3000,
      onClose: () => {
        console.log('close');
      }
  })
}


</script>

<template>
    <bn-space>
      <bn-button  size="small" @click="handler">使用renderFunction</bn-button>
    </bn-space>
</template>

<style lang="scss"></style>