<script lang="ts" setup>
  import { ref } from 'vue'
  const tab = ref('1')

  const type = ref('line')
</script>

<template>
  <bn-radio-group v-model="type" style="margin-bottom: 20px">
    <bn-radio label="line">line</bn-radio>
    <bn-radio label="button">button</bn-radio>
    <bn-radio label="button-group">button-group</bn-radio>
  </bn-radio-group>

  <bn-tabs v-model:activeKey="tab" :type="type">
    <bn-tab-pane key="1" title="全部订单" />
    <bn-tab-pane key="2" title="待付款" />
    <bn-tab-pane key="3" title="已付款" />
    <bn-tab-pane key="4" title="未付款" />
  </bn-tabs>
</template>

<style lang="scss"></style>
