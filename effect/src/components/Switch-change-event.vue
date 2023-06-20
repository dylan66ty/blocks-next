<script lang="ts" setup>
  import { ref } from 'vue'
  const onChange = () => {
    console.log('change')
  }

  const checked = ref(false)
  const show = ref(true)

  setTimeout(() => {
    show.value = false
  }, 1000)
</script>

<template>
  <div v-if="show">
    <bn-switch v-model="checked" @change="onChange"></bn-switch>
  </div>
</template>

<style lang="scss"></style>
