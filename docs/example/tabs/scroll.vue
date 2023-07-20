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
  <bn-tabs v-model:activeKey="tab" :hidePanes="false">
    <bn-tab-pane :key="item.key" :title="item.title" v-for="item in tabs" />
  </bn-tabs>
</template>

<style lang="scss"></style>
