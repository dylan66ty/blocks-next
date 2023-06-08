<script lang="ts" setup>
import { ref } from 'vue'
const tab = ref('1')





</script>

<template>
  <bn-tabs v-model:activeKey="tab" :hidePanes="false">
    <bn-tab-pane key="1" title="全部订单">
      <h1>全部订单</h1>
    </bn-tab-pane>
    <bn-tab-pane key="2" title="待付款">
      <h1>待付款</h1>
    </bn-tab-pane>  
    <bn-tab-pane key="3" title="已付款">
      <h1>已付款</h1>
    </bn-tab-pane>  
  </bn-tabs>
</template>

<style lang="scss"></style>