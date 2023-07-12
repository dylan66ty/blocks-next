<script lang="ts" setup>
  import { ref } from 'vue'

  const ok = () => {
    console.log('ok')
  }
  const cancel = () => {
    console.log('cancel')
  }

  const content = ref('是否确认删除消息？')
</script>

<template>
  <bn-popconfirm :content="content" @ok="ok" @cancel="cancel">
    <span style="font-size: 14px; color: #646b7a">删除内容</span>
  </bn-popconfirm>
</template>

<style lang="scss"></style>
