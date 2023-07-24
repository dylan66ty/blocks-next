<script lang="ts" setup>
  import { ref } from 'vue'
  const visible = ref(false)

  const handler = () => {
    visible.value = true
  }
  const onBeforeOk = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true)
      }, 1000)
    })
  }
  const onBeforeCancel = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true)
      }, 100)
    })
  }

  const close = () => {
    console.log('close')
  }

  const closed = () => {
    console.log('closed')
  }
  const open = () => {
    console.log('open')
  }

  const opened = () => {
    console.log('opend')
  }
</script>

<template>
  <bn-button size="small" @click="handler">Open Drawer</bn-button>

  <bn-drawer
    v-model="visible"
    title="批量导入"
    width="700px"
    cancel-text="关闭"
    ok-text="导入"
    :on-before-ok="onBeforeOk"
    :on-before-cancel="onBeforeCancel"
    placement="right"
    @close="close"
    @closed="closed"
    @open="open"
    @opened="opened"
  >
    <template #body> 你可以使用body插槽来插入你想要的内容 </template>
  </bn-drawer>
</template>

<style lang="scss"></style>
