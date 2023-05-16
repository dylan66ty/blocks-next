<script lang="ts" setup>
  import { ref } from 'vue';
  const inpVal = ref('');
  const warning = ref('warning');
</script>

<template>
  <bn-space :size="20">
    <div style="width: 200px">
      <bn-input v-model="inpVal" placeholder="请输入"></bn-input>
    </div>
    <div style="width: 200px">
      <bn-input v-model="warning" placeholder="请输入" error></bn-input>
    </div>
  </bn-space>
</template>
