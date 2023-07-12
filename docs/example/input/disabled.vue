<script lang="ts" setup>
  import { ref } from 'vue'
  const inpVal = ref('')
</script>

<template>
  <div style="width: 200px">
    <bn-input v-model="inpVal" placeholder="请输入" disabled></bn-input>
  </div>
</template>
