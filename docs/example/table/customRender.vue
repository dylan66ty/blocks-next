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
    }
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
  },
  {
    title: '操作',
    slotName: 'ops',
    headerSlotName:'opsHeader'
  }
])
const data = ref([
  {
    time: '2023-05-25',
    department: 'department1',
    callCounter: 10000,
    callOn: 10000,
    callRate: '100%'
  },
  {
    time: '2023-05-26',
    department: 'department1',
    callCounter: 10000,
    callOn: 10000,
    callRate: '100%'
  },
  {
    time: '2023-05-27',
    department: 'department1',
    callCounter: 10000,
    callOn: 10000,
    callRate: '100%'
  },
  {
    time: '2023-05-28',
    department: 'department1',
    callCounter: 10000,
    callOn: 10000,
    callRate: '100%'
  },
  {
    time: '2023-05-29',
    department: 'department1',
    callCounter: 10000,
    callOn: 10000,
    callRate: '100%'
  }
])

const handler = (row) => {
  console.log(row);
  MessageBox.success(row.time,row.department)
}

</script>

<template>
  <div>
    <bn-table :columns="columns" :data="data">
      <template #ops="{row}">
        <bn-button type="primary" size="small" @click="handler(row)">{{ row.time  }}</bn-button>
      </template>
      <template #opsHeader>
        <bn-icon-setting :size="18"/>
        <span>设置</span>
      </template>
    </bn-table>
  </div>
</template>

<style lang="scss"></style>