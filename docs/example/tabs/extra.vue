<script lang="ts" setup>
  import { ref, watch } from 'vue'
  const tab = ref('1')
  const onChange = (val) => {
    console.log('tab key', val);
  }
</script>

<template>
  <bn-tabs v-model:activeKey="tab" @change="onChange">
    <bn-tab-pane key="1" title="全部订单" />
    <bn-tab-pane key="2" title="待付款" />
    <bn-tab-pane key="3" title="已付款" />
    <template #extra>
      <bn-button type="primary">Action</bn-button>
    </template>
  </bn-tabs>
</template>

<style lang="scss"></style>