<script lang="ts" setup>
  import { MessageBox } from 'blocks-next'
  const open = () => {
    MessageBox({
      title: 'This is the message ',
      type:'warning',
      width: 'auto'
    })
  }
</script>

<template>
 <bn-space>
  <bn-button  size="small" @click="open">打开弹框</bn-button>
 </bn-space>

</template>

<style lang="scss"></style>