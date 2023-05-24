<script lang="ts" setup>
import { ref } from 'vue'
const visible = ref(false)


const placement = ref('right')
const handler = () => {
  visible.value = true
}




</script>

<template>
  <bn-radio-group v-model="placement">
    <bn-radio label="top">Top</bn-radio>
    <bn-radio label="right">Right</bn-radio>
    <bn-radio label="bottom">Bottom</bn-radio>
    <bn-radio label="left">Left</bn-radio>
  </bn-radio-group>  
  <bn-button style="margin-top:20px" @click="handler" size="small" fill-mode="outline">Open Drawer</bn-button>

  <bn-drawer 
     v-model="visible" 
     title="Title"
     :placement="placement"
     >
     <template #body>
      你可以使用body插槽来插入你想要的内容

     </template>
     </bn-drawer>
</template>
