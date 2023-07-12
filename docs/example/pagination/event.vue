<script lang="ts" setup>
  import { ref } from 'vue'

  const pageConfig = ref({
    page: 1,
    pageSize: 10,
    total: 50
  })

  const sizes = [10, 20, 30, 40, 50]

  const onPageChange = (page) => {
    console.log('page', page)
  }

  const onPageSizeChange = (pageSize) => {
    console.log('pageSize', pageSize)
  }
</script>

<template>
  <bn-pagination
    :page-config="pageConfig"
    :page-sizes="sizes"
    layout="prev, pager, next,sizes,jumper"
    @page-change="onPageChange"
    @page-size-change="onPageSizeChange"
  ></bn-pagination>
</template>

<style lang="scss"></style>
