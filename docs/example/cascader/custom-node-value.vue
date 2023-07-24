<script lang="ts" setup>
  import { ref } from 'vue'

  const model = ref([])

  const options = ref([
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
  ])
</script>

<template>
  <bn-cascader v-model="model" :data="options">
    <template #default="{ node, data }">
      <span>{{ data.label }}</span>
      <span v-if="!node.isLeaf"> ({{ data.children.length }}) </span>
    </template>
  </bn-cascader>
</template>
