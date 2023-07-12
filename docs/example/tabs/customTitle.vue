<script lang="ts" setup>
  import { ref } from 'vue'
  const tab = ref('1')
</script>

<template>
  <bn-tabs v-model:activeKey="tab">
    <bn-tab-pane key="1">
      <template #title> 全部订单 <bn-icon-search /> </template>
    </bn-tab-pane>
    <bn-tab-pane key="2" title="待付款" />
    <bn-tab-pane key="3" title="已付款" />
    <bn-tab-pane key="4" title="未付款" />
  </bn-tabs>
</template>

<style lang="scss"></style>
