<script lang="ts" setup>
  import { Notification } from 'blocks-next'

  const handler = () => {
    Notification({
      title: '挂载位置',
      message: '自定义渲染到哪个容器里面',
      type: 'success',
      renderTo: '.custom-container'
    })
  }
</script>

<template>
  <div class="custom-container">custom container</div>

  <bn-button size="small" @click="handler" style="margin-top: 20px">Open</bn-button>
</template>

<style lang="scss">
  .custom-container {
    width: 100%;
    height: 600px;
    border: 1px solid #ddd;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
