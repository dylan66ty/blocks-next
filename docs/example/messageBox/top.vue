<script lang="ts" setup>
  import { MessageBox } from 'blocks-next'
  const open = () => {
    MessageBox({
      title: '优于别人，并不高贵，真正的高贵应该是优于过去的自己。',
      type:'success',
      top:20,
    })
  }
</script>

<template>
 <bn-space>
  <bn-button fill-mode="outline" size="small" @click="open">打开弹框</bn-button>
 </bn-space>

</template>

<style lang="scss"></style>