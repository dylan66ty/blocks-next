<script lang="ts" setup>
  import { ref } from 'vue'

  const visible = ref(true)
  const containerRef = ref()

  setTimeout(() => {
    // visible.value = false
  }, 1000)
</script>

<template>
  <div class="custom-box" ref="containerRef"></div>

  <div style="display: flex; justify-content: center">
    <bn-tooltip background-color="rgba(0,0,0,0.8)" v-model="visible">
      <bn-icon-search></bn-icon-search>
      <template #content>
        <div>此处编辑只可修改模版基础信息，若是需要修</div>
        <div>使用或编辑进行修改，修改后会形成新的模版</div>
      </template>
    </bn-tooltip>
  </div>
</template>

<style lang="scss"></style>
