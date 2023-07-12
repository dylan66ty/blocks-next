<script lang="ts" setup>
  import { ref } from 'vue'

  const select = ref('')
  const inp = ref('')
</script>

<template>
  <bn-space>
    <bn-input v-model="inp" placeholder="请输入"></bn-input>
    <bn-select v-model="select">
      <bn-option label="Vue" value="Vue"></bn-option>
      <bn-option label="React" value="React"></bn-option>
      <bn-option label="Angular" value="Angular"></bn-option>
    </bn-select>
    <bn-button type="primary"
      >搜索
      <bn-icon-search></bn-icon-search>
    </bn-button>
  </bn-space>
</template>

<style lang="scss"></style>
