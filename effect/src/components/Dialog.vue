<script lang="ts" setup>
import { ref } from 'vue';
const visible = ref(false)

const onClosed = () => {
  console.log('closed');
}

const open = () => {
  visible.value = true
}



const onBeforeCancel = () => {
  console.log('onBeforeCancel');
  return true
}

</script>

<template>
  <div>
    <bn-dialog 
       v-model="visible"
       @closed="onClosed" 
       width="400px"
       height="256px"
       :unmountOnClose="false"
       center
       :onBeforeCancel="onBeforeCancel"
     >
      <template #title>
        <div>版本更新</div>
        <div>日期：2022-02-15</div>
      </template>
      <div>1、API增加话单状态推送接口</div>
      <div>2、API增加话单状态推送接口</div>
      <div>3、API增加话单状态推送接口</div>
      <template #footer>
        <bn-space>
          <bn-button fill-mode="outline" @click="visible = false">取消</bn-button>
          <bn-button type="primary">确认</bn-button>
        </bn-space>
      </template>
    </bn-dialog>
    
    <bn-button type="primary" @click="open">open Dialog</bn-button>


    
  </div>
</template>

