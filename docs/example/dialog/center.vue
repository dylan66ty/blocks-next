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

    <bn-dialog v-model="visible" minWidth="400px" minHeight="256px" center>
      <template #title>
        <div class="title">版本更新</div>
        <div class="time">日期：2023-05-18</div>
      </template>
      <div class="content">
        <div>1、Dialog组件</div>
        <div>2、Dialog组件文档</div>
      </div>

      <template #footer>
        <bn-space>
          <bn-button fill-mode="outline" @click="visible = false">取消</bn-button>
          <bn-button type="primary" @click="visible = false">确认</bn-button>
        </bn-space>
      </template>
    </bn-dialog>
  </div>
</template>

<style lang="scss">
.title {
  font-size: 18px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #242934;
  line-height: 18px;
}

.time {
  font-size: 14px;
  font-weight: 400;
  color: #9CA6B9;
  line-height: 14px;
  margin-top: 8px;
}

.content {
  font-size: 14px;
  font-weight: 400;
  color: #242934;
  line-height: 24px;
}
</style>