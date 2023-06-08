<script lang="ts" setup>
import { ref } from 'vue';
import {MessageBox} from 'blocks-next'

const columns = ref([
  {
    prop: 'time',
    title: '时间',
    renderCell({row, column}) {
      return row[column.prop]
    },
    renderHeader(){
      return 'Time'
    },
    width: 120,
  },
  {
    prop: 'department',
    title: '部门',
    width: 120,

  },
  {
    prop: 'callCounter',
    title: '外呼次数',
    width: 120,

  },
  {
    prop: 'callOn',
    title: '外呼接通次数',
    width: 120,

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
    headerSlotName:'opsHeader',
    width: 100,

  }
])
const data = ref([
  {
    time: '2023-05-25',
    department: 'department1',
    callCounter: 10000,
    callOn: 5000,
  },
  {
    time: '2023-05-26',
    department: 'department1',
    callCounter: 10000,
    callOn: 6000,
  },
  {
    time: '2023-05-27',
    department: 'department1',
    callCounter: 10000,
    callOn: 7000,
  },
  {
    time: '2023-05-28',
    department: 'department1',
    callCounter: 10000,
    callOn: 8000,
  },
  {
    time: '2023-05-29',
    department: 'department1',
    callCounter: 10000,
    callOn: 9000,
  }
])

const handler = (row) => {
  console.log(row);
  MessageBox.success(row.time,row.department)
}


</script>

<template>
    <bn-table :columns="columns" :data="data">
      <template #callOn="{row}">
        <bn-progress width="80" :percent="row.callOn / row.callCounter"></bn-progress>
      </template>

      <template #ops="{row}">
         <bn-tooltip>
          <bn-button type="primary" size="small" @click="handler(row)">详情</bn-button>
          <template #content>
            {{ row.time }} - {{ row.department }}
          </template>
        </bn-tooltip>
      </template>


      <template #opsHeader>
        <bn-icon-setting :size="18"/> 
        <span>操作</span>
      </template>
    </bn-table>
</template>

<style lang="scss"></style>