<script lang="ts" setup>
import { ref } from 'vue'
const checked1 = ref(false)
const checked2 = ref(true)

</script>

<template>
  <bn-space :size="20">
       <bn-checkbox v-model="checked1" disabled>Option 1</bn-checkbox>  
      <bn-checkbox v-model="checked2" disabled>Option 2</bn-checkbox>    
  </bn-space>
</template>

<style lang="scss"></style>