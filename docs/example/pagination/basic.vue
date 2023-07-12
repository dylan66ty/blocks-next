<script lang="ts" setup>
  import { ref } from 'vue'

  const pageConfig = ref({
    page: 1,
    pageSize: 10,
    total: 50
  })
</script>

<template>
  <bn-pagination :page-config="pageConfig" layout="prev, pager, next"></bn-pagination>
</template>

<style lang="scss"></style>
