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

const handleHTML= () => {
  Message.info({
    message: '<div style="color:red;">Danger 注意XSS</div>',
    useHTML: true
  })
}



</script>

<template>
    <bn-space>
      <bn-button  size="small" @click="handleInfo">打开消息提示</bn-button>
      <bn-button  size="small" @click="handleVNode">VNode</bn-button>
      <bn-button  size="small" @click="handleHTML">use HTML</bn-button>
    </bn-space>
</template>

<style lang="scss"></style>