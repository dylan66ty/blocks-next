<script lang="ts" setup>
  import { Message } from 'blocks-next'
  import { h, ref } from 'vue'
  const containerRef = ref()
  const renderToBody = () => {
    Message.info('document.body')
  }

  const renderToCustom = () => {
    Message.info({
      message: () => h('div', {}, 'custom container'),
      renderTo: containerRef.value
    })
  }
</script>

<template>
  <div ref="containerRef" class="render-container"> custom render dom </div>

  <bn-space>
    <bn-button size="small" @click="renderToBody">默认（renderTo:document.body）</bn-button>
    <bn-button size="small" @click="renderToCustom">custom（renderTo:containerRef）</bn-button>
  </bn-space>
</template>

<style lang="scss">
  .render-container {
    width: 100%;
    height: 300px;
    border: 1px solid #ddd;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
