<script lang="ts" setup>
import { ref } from 'vue'
const visible = ref(false)

const handler = () => {
  visible.value = true
}


</script>

<template>
 <div class="custom-container">custom-container</div>


  <bn-space>
    <bn-button @click="handler" size="small" >Open drawer</bn-button>
  </bn-space>


  <bn-drawer v-model="visible" title="title" renderTo=".custom-container">
    <template #body>
      自定义挂载容器
    </template>
  </bn-drawer>
</template>

<style lang="scss">
.custom-container {
  width: 100%;
  height: 400px;
  border: 1px solid #ddd;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
}
</style>