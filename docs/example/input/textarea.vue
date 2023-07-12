<script lang="ts" setup>
  import { ref } from 'vue'

  const textarea = ref('')
</script>

<template>
  <bn-space :size="15">
    <div style="width: 200px">
      <bn-input v-model="textarea" type="textarea" placeholder="请输入内容"></bn-input>
    </div>

    <div style="width: 200px">
      <bn-input v-model="textarea" disabled type="textarea" placeholder="请输入内容"></bn-input>
    </div>
  </bn-space>
</template>

<style lang="scss"></style>
