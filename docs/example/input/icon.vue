<script lang="ts" setup>
  import { ref } from 'vue'
  const inpVal = ref('')
</script>

<template>
  <bn-space size="large">
    <div style="width: 200px">
      <bn-input v-model="inpVal" placeholder="请输入" prefix-icon="bn-icon-plus"> </bn-input>
    </div>
    <div style="width: 200px">
      <bn-input v-model="inpVal" placeholder="请输入" suffix-icon="bn-icon-search"> </bn-input>
    </div>
  </bn-space>
</template>
