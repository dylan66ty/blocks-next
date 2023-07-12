<script lang="ts" setup>
  import { ref } from 'vue'
  const visible = ref(false)

  const openDialog = () => {
    visible.value = true
  }
</script>

<template>
  <div>
    <bn-button size="small" @click="openDialog">click open the dialog</bn-button>

    <bn-dialog v-model="visible" title="This is the title" fullscreen>
      <div>This is the dialog content</div>
      <template #footer>
        <bn-space size="small">
          <bn-button @click="visible = false">取消</bn-button>
          <bn-button type="primary" @click="visible = false">确认</bn-button>
        </bn-space>
      </template>
    </bn-dialog>
  </div>
</template>

<style lang="scss"></style>
