<script lang="ts" setup>
import { computed, ref } from 'vue';


const columns = ref([
  {
    type: 'checkbox',
    width:50,
    hiddenCheckboxAll: true
  },
  {
    prop: 'time',
    title: '时间',
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
const _data = ref([
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


const hover = ref(false)
const stripe = ref(false)
const border = ref(false)
const noDate = ref(false)
const loading = ref(false)

const showCheckAll = ref(false)


const data = computed(() => !noDate.value ? _data.value : [])

const onCheckAllChange = (status) => {
  columns.value[0].hiddenCheckboxAll = !status
}



</script>

<template>
  <bn-space direction="vertical" :size="20">
    <span>table属性</span>
    <bn-space>
      <bn-switch v-model="hover" active-text="Hover"></bn-switch>
      <bn-switch v-model="stripe" active-text="Stripe"></bn-switch>
      <bn-switch v-model="border" active-text="Border"></bn-switch>
      <bn-switch v-model="noDate" active-text="NoData"></bn-switch>
      <bn-switch v-model="loading" active-text="Loading"></bn-switch>
    </bn-space>
   <span>column属性</span>
    <bn-space>
      <bn-switch v-model="showCheckAll" active-text="ShowCheckAll" @change="onCheckAllChange"></bn-switch>
    </bn-space>

    <bn-table 
      :columns="columns" :data="data" :hover="hover" :stripe="stripe" :border="border" :loading="loading">
    </bn-table>

  </bn-space>
</template>

<style lang="scss"></style>