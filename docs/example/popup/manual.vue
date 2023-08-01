<script lang="ts" setup>
  import { ref } from 'vue'
  import type { PopupInstance } from 'blocks-next'
  const popupRef = ref<PopupInstance>()
  const handleOpen = () => {
    popupRef.value.changePopupVisible(true)
  }
</script>

<template>
  <bn-space>
    <bn-popup ref="popupRef" placement="bottom" show-arrow>
      <template #trigger>
        <bn-button> Here </bn-button>
      </template>
      <template #content>
        <h4>Title</h4>
        <div style="margin-top: 10px">this is content, this is content, this is content</div>
      </template>
    </bn-popup>
    <bn-button @click="handleOpen"> 点击这里打开 popup</bn-button>
  </bn-space>
</template>

<style lang="scss"></style>
