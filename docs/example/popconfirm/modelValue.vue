<script lang="ts" setup>
  import { ref } from 'vue'

  const visible = ref(true)
</script>

<template>
  <bn-popconfirm v-model="visible" content="是否确认删除消息？">
    <span style="font-size: 14px; color: #646b7a">删除内容</span>
  </bn-popconfirm>

  <div style="margin-top: 20px">
    <bn-button type="primary" size="small" @click="visible = true">点击这打开确认框</bn-button>
  </div>
</template>

<style lang="scss"></style>
