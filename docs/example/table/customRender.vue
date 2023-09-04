<script lang="ts" setup>
  import { ref } from 'vue'

  const columns = ref([
    {
      prop: 'time',
      title: '时间',
      renderCell({ row, column }) {
        return row[column.prop]
      },
      renderHeader() {
        return 'Time'
      },
      width: 120
    },
    {
      prop: 'department',
      title: '部门',
      width: 120
    },
    {
      prop: 'callCounter',
      title: '外呼次数',
      width: 120
    },
    {
      prop: 'callOn',
      title: '外呼接通次数',
      width: 120
    },
    {
      prop: 'callOn',
      title: '外呼接通率',
      width: 180,
      slotName: 'callOn'
    },
    {
      title: '操作',
      slotName: 'ops',
      headerSlotName: 'opsHeader',
      width: 100
    }
  ])

  const data = ref([
    {
      time: '2023-05-25',
      department: 'department1',
      callCounter: 10000,
      callOn: 5000,
      checked: false
    },
    {
      time: '2023-05-26',
      department: 'department1',
      callCounter: 10000,
      callOn: 6000,
      checked: false
    },
    {
      time: '2023-05-27',
      department: 'department1',
      callCounter: 10000,
      callOn: 7000,
      checked: false
    },
    {
      time: '2023-05-28',
      department: 'department1',
      callCounter: 10000,
      callOn: 8000,
      checked: false
    },
    {
      time: '2023-05-29',
      department: 'department1',
      callCounter: 10000,
      callOn: 9000,
      checked: false
    }
  ])

  const handleChange = () => {
    console.log('11')
  }
</script>

<template>
  <bn-table :columns="columns" :data="data">
    <template #callOn="{ row }">
      <bn-progress width="80" :percent="row.callOn / row.callCounter"></bn-progress>
    </template>

    <template #ops="{ row }">
      <bn-switch v-model="row.checked" @change="handleChange"></bn-switch>
    </template>

    <template #opsHeader>
      <bn-icon-setting :size="18" />
      <span>操作</span>
    </template>
  </bn-table>
</template>

<style lang="scss"></style>
