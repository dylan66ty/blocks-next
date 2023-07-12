<script lang="ts" setup>
  import { ref } from 'vue'
  const visible = ref(false)

  const onClosed = () => {
    console.log('closed')
  }

  const open = () => {
    visible.value = true
  }

  const onBeforeCancel = () => {
    console.log('onBeforeCancel')
    return true
  }
</script>

<template>
  <div>
    <bn-dialog
      v-model="visible"
      @closed="onClosed"
      :unmountOnClose="false"
      center
      :onBeforeCancel="onBeforeCancel"
      :showClose="false"
      :mask="false"
    >
      <div>11211211212</div>
    </bn-dialog>

    <bn-button type="primary" @click="open">11</bn-button>
  </div>
</template>
