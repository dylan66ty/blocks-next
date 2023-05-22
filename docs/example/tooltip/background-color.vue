<script lang="ts" setup>

</script>

<template>
  <bn-space :size="15">
    <bn-tooltip content="This is tooltip content" background-color="skyblue" position="top">
      <bn-button size="small">背景颜色(skyblue)</bn-button>
    </bn-tooltip>

    <bn-tooltip content="This is tooltip content" background-color="#722ED1" position="top">
      <bn-button size="small">背景颜色(#722ED1)</bn-button>
    </bn-tooltip>

    <bn-tooltip content="This is tooltip content" background-color="rgba(20,201,201,1)" position="top">
      <bn-button size="small">背景颜色(rgba(20,201,201,1))</bn-button>
    </bn-tooltip>
  
  </bn-space>
</template>

<style lang="scss"></style>