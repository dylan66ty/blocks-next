<script lang="ts" setup>
  import { MessageBox } from 'blocks-next'
  const open = () => {
    MessageBox({
      content: '自定义渲染到哪个容器里面',
      type:'info',
      renderTo: '.custom-container'
    })
  }
</script>

<template>

  <div class="custom-container">custom container</div>

   <bn-button fill-mode="outline" size="small" @click="open" style="margin-top:20px;">打开弹框</bn-button>
    
</template> 

<style lang="scss">
.custom-container {
  width: 100%;
  height: 600px;
  border: 1px solid #ddd;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>