<script lang="ts" setup>

const ok = () => {
  console.log('ok');
}
const cancel = () => {
  console.log('cancel');
}




</script>

<template>
  <bn-popconfirm content="是否确认删除消息？" @ok="ok" @cancel="cancel">
    <span style="font-size:14px;color:#646B7A">删除内容</span>
    <template #content>
      这是通过插槽渲染的
    </template>
  </bn-popconfirm>
</template>

<style lang="scss"></style>