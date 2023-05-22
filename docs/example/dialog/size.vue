<script lang="ts" setup>
import { ref } from 'vue'
const visible = ref(false)

const openDialog = () => {
  visible.value = true
}


</script>

<template>
  <div>
    <bn-button fill-mode="outline" size="small" @click="openDialog">click open the dialog</bn-button>

    <bn-dialog 
       v-model="visible"
       minWidth="400px"
       minHeight="256px"
     >
     <template #title>
        <div>版本更新</div>
        <div>日期：2023-05-18</div>
      </template>
      <div>1、Dialog组件</div>
      <div>2、Dialog组件文档</div>
      <template #footer>
        <bn-space>
          <bn-button fill-mode="outline" @click="visible = false">取消</bn-button>
          <bn-button type="primary" @click="visible = false">确认</bn-button>
        </bn-space>
      </template>
    </bn-dialog>
  </div>
</template>

<style lang="scss"></style>