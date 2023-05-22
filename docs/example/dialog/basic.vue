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

    <bn-dialog v-model="visible" title="title">
      <div>最美的相遇，不言过往；最好的离别，不问归期。</div>
      <template #footer>
        <bn-space>
          <bn-button fill-mode="outline" @click="visible = false">取消</bn-button>
          <bn-button type="primary" @click="visible = false">确认</bn-button>
        </bn-space>
      </template>
    </bn-dialog>
  </div>
</template>

<style lang="scss"></style>