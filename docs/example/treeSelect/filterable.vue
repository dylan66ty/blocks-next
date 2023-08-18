<script lang="ts" setup>
  import { ref } from 'vue'

  const model = ref([])
  const data = ref([
    {
      label: 'Trunk 1',
      value: '0-0',
      children: [
        {
          label: 'Trunk 1-0',
          value: '0-0-0',
          children: [
            { label: 'leaf', value: '0-0-0-0' },
            {
              label: 'leaf',
              value: '0-0-0-1',
              children: [{ label: 'leaf', value: '0-0-0-1-0' }]
            },
            { label: 'leaf', value: '0-0-0-2' }
          ]
        },
        {
          label: 'Trunk 1-1',
          value: '0-0-1'
        },
        {
          label: 'Trunk 1-2',
          value: '0-0-2',
          children: [
            { label: 'leaf', value: '0-0-2-0' },
            {
              label: 'leaf',
              value: '0-0-2-1'
            }
          ]
        }
      ]
    },
    {
      label: 'Trunk 2',
      value: '0-1'
    },
    {
      label: 'Trunk 3',
      value: '0-2',
      children: [
        {
          label: 'Trunk 3-0',
          value: '0-2-0',
          children: [
            { label: 'leaf', value: '0-2-0-0' },
            { label: 'leaf', value: '0-2-0-1' }
          ]
        }
      ]
    }
  ])
</script>

<template>
  <bn-tree-select v-model="model" :data="data" clearable filterable></bn-tree-select>
</template>

<style lang="scss"></style>
