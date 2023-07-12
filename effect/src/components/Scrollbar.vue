<script lang="ts" setup>
  import { ref } from 'vue'

  const arr = ref([])

  setTimeout(() => {
    arr.value = 20
  }, 300)
</script>

<template>
  <div style="width: 200px">
    <bn-scrollbar style="height: 200px; overflow: auto">
      <div v-for="item in arr" style="height: 20px">{{ item }}</div>
    </bn-scrollbar>
  </div>
</template>

<style lang="scss"></style>
