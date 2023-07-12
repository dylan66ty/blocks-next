<script lang="ts" setup>
  import { ref } from 'vue'
  import { Message } from 'blocks-next'
  const visible = ref(false)

  const openDialog = () => {
    visible.value = true
  }

  const onBeforeCancel = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const result = Math.random() > 0.5 ? true : false
        resolve(result)
        !result && Message.error('已拦截')
        result && Message.success('关闭成功')
      }, 300)
    })
  }
</script>

<template>
  <div>
    <bn-button size="small" @click="openDialog">click open then dialog</bn-button>
    <bn-dialog v-model="visible" title="关闭前拦截" :onBeforeCancel="onBeforeCancel">
      <div>This is the dialog content。</div>
    </bn-dialog>
  </div>
</template>

<style lang="scss"></style>
