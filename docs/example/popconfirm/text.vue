<script lang="ts" setup>
  const ok = () => {
    console.log('ok')
  }
  const cancel = () => {
    console.log('cancel')
  }
</script>

<template>
  <bn-popconfirm
    content="是否确认删除消息？"
    ok-text="Discard"
    cancel-text="No"
    @ok="ok"
    @cancel="cancel"
  >
    <span style="font-size: 14px; color: #646b7a">删除内容</span>
  </bn-popconfirm>
</template>

<style lang="scss"></style>
