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
    }
  ])
  const data = ref([
    {
      time: '2023-05-25',
      department: 'department1',
      callCounter: 10000
    },
    {
      time: '2023-05-26',
      department: 'department2',
      callCounter: 10000
    },
    {
      time: '2023-05-27',
      department: 'department3',
      callCounter: 10000,
    },
    {
      time: '2023-05-28',
      department: 'department4',
      callCounter: 10000,
    },
    {
      time: '2023-05-29',
      department: 'department5',
      callCounter: 10000
    }
  ])
</script>

<template>
  <bn-popup show-arrow width="500" placement="right">
    <template #trigger>
        <bn-button>
          Click Trigger
        </bn-button>
      </template>
      <template #content>
       <bn-table :data="data" :columns="columns"/>
      </template>
  </bn-popup>
</template>

<style lang="scss"></style>