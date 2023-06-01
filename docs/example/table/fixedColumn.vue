<script lang="ts" setup>
import { ref } from 'vue';


const columns = ref([
  {
    prop: 'time',
    title: '时间',
    width: 120,
    fixed: 'left'
  },
  {
    prop: 'department',
    title: '部门',
    width: 120,
    fixed: 'left'
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
    prop: 'callRate',
    title: '外呼接通率',
    width: 120,

  },
  {
    prop: 'badCounter',
    title: '黑名单号码拨打数',
    width: 150,

  },
  {
    prop: 'voidCounter',
    title: '无效号码拨打数',
    width: 150,

  },
  {
    prop: 'totalTime',
    title: '外呼总时长',
    width: 120,
    fixed: 'right'

  }
])
const data = ref(Array.from({ length: 30 }, (_, index) => {
  return ({
    time: `2023-05-${index+1}`,
    department: 'department',
    callCounter: 10000,
    callOn: 10000,
    callRate: '100%',
    badCounter: index +1,
    voidCounter: index * 2,
    totalTime: 10000
  })
}))





</script>

<template>
  <bn-table :columns="columns" :data="data" height="350">
  </bn-table>
</template>

<style lang="scss"></style>