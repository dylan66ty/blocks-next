<script lang="ts" setup>
  import { ref } from 'vue'
  const val = ref('throttle')
</script>

<template>
  <div>
    <bn-space :size="20">
      <div style="width: 200px">
        <bn-input v-model="val" :throttle="800"></bn-input>
      </div>
      <div> value: {{ val }} </div>
    </bn-space>
  </div>
</template>

<style lang="scss"></style>
