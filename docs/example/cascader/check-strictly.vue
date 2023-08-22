<script lang="ts" setup>
  import { ref } from 'vue'

  const single = ref([])
  const multiple = ref([])

  const data = ref()

  setTimeout(() => {
    data.value = [
      {
        label: '分组1',
        value: '1',
        children: [
          {
            value: '1-1',
            label: '分组1-1',
            children: [
              {
                value: '1-1-1',
                label: '分组1-1-1'
              }
            ]
          },
          {
            value: '1-2',
            label: '分组1-2'
          }
        ]
      },
      {
        label: '分组2',
        value: '2',
        children: [
          {
            label: '分组2-1',
            value: '2-1'
          }
        ]
      },
      {
        label: '分组3',
        value: '3'
      },
      {
        label: '分组4',
        value: '4',
        children: [
          {
            label: '分组4-1',
            value: '4-1',
            children: [
              {
                label: '分组4-1-1',
                value: '4-1-1'
              }
            ]
          }
        ]
      }
    ]
  }, 100)
</script>

<template>
  <div class="flex gap-x-5">
    <div>
      <div class="mb-2">Single selection {{ single }} </div>
      <bn-cascader v-model="single" :data="data" check-strictly clearable></bn-cascader
    ></div>
    <div>
      <div class="mb-2">Multiple selection {{ multiple }}</div>
      <bn-cascader v-model="multiple" :data="data" multiple check-strictly clearable></bn-cascader
    ></div>
  </div>
</template>
