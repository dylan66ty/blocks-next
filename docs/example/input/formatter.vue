<script lang="ts" setup>
  import { ref } from 'vue'
  const inpVal = ref('')

  const toUpperFormatter = (val: string) => {
    return val.toUpperCase()
  }
</script>

<template>
  <div style="width: 200px">
    <bn-input
      v-model="inpVal"
      placeholder="小写字母转大写"
      :formatter="toUpperFormatter"
    ></bn-input>
  </div>
</template>
