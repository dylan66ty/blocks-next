<script lang="ts" setup>
  import { ref } from 'vue'

  const pageConfig = ref({
    page: 1,
    pageSize: 10,
    total: 100
  })

  const inp = ref('')
</script>

<template>
  <div>
    // total, prev, pager, next, sizes, jumper
    <bn-pagination
      :page-config="pageConfig"
      :page-sizes="[10]"
      layout="prev, pager, next, sizes"
    ></bn-pagination>
  </div>
</template>

<style lang="scss"></style>
