<script lang="ts" setup>
  import { ref } from 'vue'

  const columns = ref([
    {
      prop: 'time',
      title: '时间'
    },
    {
      prop: 'department',
      title: '部门'
    },
    {
      prop: 'callCounter',
      title: '外呼次数'
    },
    {
      prop: 'callOn',
      title: '外呼接通次数'
    }
  ])
  const data = ref(
    Array.from({ length: 30 }, (_, index) => {
      return {
        time: `2023-05-${index + 1}`,
        department: 'department',
        callCounter: 10000,
        callOn: 10000,
        callRate: '100%'
      }
    })
  )
</script>

<template>
  <bn-table :columns="columns" :data="data" height="350"> </bn-table>
</template>

<style lang="scss"></style>
