<script lang="ts" setup>
  import { MessageBox } from 'blocks-next'
  const open = (type) => {
    MessageBox({
      content: '优于别人，并不高贵，真正的高贵应该是优于过去的自己。',
      type
    })
  }
</script>

<template>
 <bn-space>
  <bn-button fill-mode="outline" size="small" @click="open('info')">info</bn-button>
  <bn-button fill-mode="outline" size="small" type="success" @click="open('success')" >success</bn-button>
  <bn-button fill-mode="outline" size="small" type="warning" @click="open('warning')">warning</bn-button>
  <bn-button fill-mode="outline" size="small" type="strong" @click="open('strong')">strong</bn-button>
  <bn-button fill-mode="outline" size="small" type="danger" @click="open('error')">error</bn-button>
 </bn-space>

</template>

<style lang="scss"></style>