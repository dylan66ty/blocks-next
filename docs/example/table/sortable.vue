<script lang="ts" setup>
import { ref } from 'vue';


const columns = ref([
  {
    prop: 'time',
    title: '时间',
    sortable:true,
  },
  {
    prop: 'department',
    title: '部门',
    sortable:true,
  },
  {
    prop: 'callCounter',
    title: '外呼次数',

  },
  {
    prop: 'callOn',
    title: '外呼接通次数',

  },
  {
    prop: 'callRate',
    title: '外呼接通率',

  },
])
const data = ref([
  {
    time: '2023-05-25',
    department: 'department1',
    callCounter: 10000,
    callOn: 10000,
    callRate: '100%',
    key:1,
  },
  {
    time: '2023-05-26',
    department: 'department2',
    callCounter: 10000,
    callOn: 10000,
    callRate: '100%',
    key:2,

  },
  {
    time: '2023-05-27',
    department: 'department3',
    callCounter: 10000,
    callOn: 10000,
    callRate: '100%',
    key:3,
  },
  {
    time: '2023-05-28',
    department: 'department4',
    callCounter: 10000,
    callOn: 10000,
    callRate: '100%',
    key:4
  },
  {
    time: '2023-05-29',
    department: 'department5',
    callCounter: 10000,
    callOn: 10000,
    callRate: '100%',
    key:5
  }
])

const pageConfig = ref({
    page:1,
    pageSize:10,
    total: 50,
})

const sizes = [10,20]


</script>

<template>
  <div>
    <bn-table :columns="columns" :data="data" hover  :defaultSort="{popup:true,prop:'time',sort: 'ascend'}">
      <template #footer>
        <bn-pagination :page-config="pageConfig" :page-sizes="sizes"
          layout="prev, pager, next,sizes"></bn-pagination>
      </template>
    </bn-table>
  </div>
</template>

<style lang="scss"></style>