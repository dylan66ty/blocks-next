<script lang="ts" setup>
import { ref } from 'vue'
const visible = ref(false)

const handler = () => {
  visible.value = true
}



</script>

<template>
  <bn-button @click="handler" size="small"  >Open Drawer</bn-button>

  <bn-drawer 
     v-model="visible" 
     title="批量导入"
     width="700px"
     cancelText="关闭"
     okText="导入"
     popupClass="test"
     >
     <template #body>
      你可以使用body插槽来插入你想要的内容
     </template>
     </bn-drawer>
</template>

<style lang="scss"></style>