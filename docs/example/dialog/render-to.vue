<script lang="ts" setup>
  import { ref } from 'vue'
  const visible = ref(true)

  const handler = (val) => {
    visible.value = val
  }

  const containerRef = ref(null)
</script>

<template>
  <div>
    <div ref="containerRef" class="custom-container"> custom container </div>

    <bn-space>
      <bn-button style="margin-top: 10px" size="small" type="danger" @click="handler(false)"
        >close</bn-button
      >
      <bn-button style="margin-top: 10px" size="small" @click="handler(true)">open</bn-button>
    </bn-space>

    <bn-dialog v-model="visible" title="This is the title" :render-to="containerRef" width="400">
      <div>This is the dialog content</div>
      <template #footer>
        <bn-space>
          <bn-button @click="visible = false">取消</bn-button>
          <bn-button type="primary" @click="visible = false">确认</bn-button>
        </bn-space>
      </template>
    </bn-dialog>
  </div>
</template>

<style lang="scss">
  .custom-container {
    width: 100%;
    height: 500px;
    border: 1px solid #ddd;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
