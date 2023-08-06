<script lang="ts" setup>
  import { ref } from 'vue'

  const textarea = ref('')
</script>

<template>
  <bn-input v-model="textarea" type="textarea" placeholder="请输入内容" resize></bn-input>

  <bn-input
    v-model="textarea"
    disabled
    class="mt-4"
    type="textarea"
    placeholder="请输入内容"
  ></bn-input>
</template>

<style lang="scss"></style>
