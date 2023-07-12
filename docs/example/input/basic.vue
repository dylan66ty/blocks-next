<script lang="ts" setup>
  import { ref } from 'vue'
  const inpVal = ref('')
</script>

<template>
  <bn-space :size="20">
    <div style="width: 200px">
      <bn-input v-model="inpVal" placeholder="请输入"></bn-input>
    </div>
  </bn-space>
</template>
