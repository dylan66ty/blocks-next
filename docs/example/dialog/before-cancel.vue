<script lang="ts" setup>
import { ref } from 'vue'
const visible = ref(false)

const openDialog = () => {
  visible.value = true
}

const onBeforeCancel = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true)
    }, 1000);
  })
}


</script>

<template>
  <div>
    <bn-button fill-mode="outline" @click="openDialog">before cancel (1s后关闭) </bn-button>
    <bn-dialog v-model="visible" title="before cancel (1s后关闭)" :onBeforeCancel="onBeforeCancel">
      <div>人生有很多的转折，每一个时段有每一个时段的颜色。</div>
    </bn-dialog>
  </div>
</template>

<style lang="scss"></style>