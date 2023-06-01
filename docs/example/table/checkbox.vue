<script lang="ts" setup>
import { ref } from 'vue';


const columns = ref([
  {
    type: 'checkbox',
    width: 40
  },
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
    time: '2023-05-25',
    department: 'department1',
    callCounter: 10000,
    callOn: 10000,
    callRate: '100%',
    disabled:true,
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

const selection = ref([data.value[0], data.value[2]])

const onSelectionChange = (selection) => {
  console.log(selection);
}


</script>

<template>
  <div>
    <bn-table :columns="columns" :data="data" v-model:selection="selection" @selection-change="onSelectionChange"></bn-table>
  </div>
</template>

<style lang="scss"></style>