<script lang="ts" setup>
import { ref } from 'vue'
const textarea = ref('')

</script>

<template>
   <div style="width:200px">
    <bn-input type="textarea" v-model="textarea" placeholder="请输入内容" :autosize="{minRows:8,maxRows:10}"></bn-input>
  </div>
</template>

<style lang="scss"></style>