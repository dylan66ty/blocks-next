<script lang="ts" setup>

const ok = () => {
  console.log('ok');
}
const cancel = () => {
  console.log('cancel');
}

const onBeforeCancel = () => {
  return false
}

const onBeforeOk = async () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(true)
    }, 1000);
  })
}



</script>

<template>
  <bn-popconfirm content="是否确认删除消息？" 
     @ok="ok" 
     @cancel="cancel"
     :onBeforeOk="onBeforeOk"
     :onBeforeCancel="onBeforeCancel"
     >
    <span style="font-size:14px;color:#646B7A">删除内容</span>
  </bn-popconfirm>
</template>

<style lang="scss"></style>