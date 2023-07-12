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
  const data = ref([
    {
      time: `2023-05-1`,
      department: 'department',
      callCounter: 10000,
      callOn: 10000,
      callRate: '100%'
    }
  ])

  const addItem = () => {
    data.value.push({
      time: `2023-05-${data.value.length + 1}`,
      department: 'department',
      callCounter: 10000,
      callOn: 10000,
      callRate: '100%'
    })
  }
</script>

<template>
  <bn-table :columns="columns" :data="data" maxHeight="200"> </bn-table>

  <bn-button block style="margin-top: 20px" @click="addItem">add Item</bn-button>
</template>

<style lang="scss"></style>
