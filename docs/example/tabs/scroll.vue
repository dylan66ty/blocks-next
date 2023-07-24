<script lang="ts" setup>
  import { ref } from 'vue'
  const tab = ref(12)
  const tabs = ref(
    Array.from({ length: 20 }, (_, index) => {
      return {
        title: `Tab${index + 1}`,
        key: index + 1
      }
    })
  )
</script>

<template>
  <bn-tabs v-model:activeKey="tab" :hide-panes="false">
    <bn-tab-pane v-for="item in tabs" :key="item.key" :title="item.title" />
  </bn-tabs>
</template>

<style lang="scss"></style>
