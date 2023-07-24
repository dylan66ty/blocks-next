<script lang="ts" setup>
  const ok = () => {
    console.log('ok')
  }
  const cancel = () => {
    console.log('cancel')
  }

  const onBeforeCancel = () => {
    return false
  }

  const onBeforeOk = async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true)
      }, 1000)
    })
  }
</script>

<template>
  <bn-popconfirm
    content="是否确认删除消息？"
    :on-before-ok="onBeforeOk"
    :on-before-cancel="onBeforeCancel"
    @ok="ok"
    @cancel="cancel"
  >
    <span style="font-size: 14px; color: #646b7a">删除内容</span>
  </bn-popconfirm>
</template>

<style lang="scss"></style>
