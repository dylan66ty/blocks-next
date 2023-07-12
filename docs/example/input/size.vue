<script lang="ts" setup>
  import { ref } from 'vue'
  const inpVal = ref('')
</script>

<template>
  <bn-space :size="20">
    <div style="width: 200px">
      <bn-input v-model="inpVal" placeholder="small" size="small"></bn-input>
    </div>
    <div style="width: 200px">
      <bn-input v-model="inpVal" placeholder="normal" size="normal"></bn-input>
    </div>
    <div style="width: 200px">
      <bn-input v-model="inpVal" placeholder="large" size="large"></bn-input>
    </div>
  </bn-space>
</template>
