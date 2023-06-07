<script lang="ts" setup>
import { Message } from 'blocks-next'
import { h } from 'vue'

const handleInfo = () => {
  Message('今晚加个班')
}

const handleVNode= () => {
  Message.info({
    message: h('p', null, [
            h('span', null, '我是'),
            h('i', { style: 'color: teal' }, 'VNode')
          ])
  })
}

const handleVNodeFu = () => {
  Message({
    message: () => h('div',{ style: {color: 'red'} }, '我是VNode function'),
    type: 'strong'
  })
}

</script>

<template>
    <bn-space>
      <bn-button  size="small" @click="handleInfo">打开消息提示</bn-button>
      <bn-button  size="small" @click="handleVNode">VNode</bn-button>
      <bn-button  size="small" @click="handleVNodeFu">VNode函数形式</bn-button>
    </bn-space>
</template>

<style lang="scss"></style>