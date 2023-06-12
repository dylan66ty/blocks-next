<script lang="ts" setup>
  import { ref } from 'vue';
  const textarea = ref('');
</script>

<template>
    <bn-input
      v-model="textarea"
      type="textarea"
      placeholder="请输入内容"
      :autosize="{ minRows: 8, maxRows: 10 }"
    ></bn-input>
</template>

<style lang="scss"></style>
