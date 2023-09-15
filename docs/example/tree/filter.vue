<script lang="ts" setup>
  import { ref, watch } from 'vue'
  import type { TreeInstance } from 'blocks-next'

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

  const treeRef = ref<TreeInstance>()
  const query = ref('')

  watch(query, (text) => {
    treeRef.value?.filter(text)
  })
</script>

<template>
  <bn-input v-model="query" class="mb-4"></bn-input>
  <bn-tree ref="treeRef" :data="data" default-unfold-all show-line>
    <template #node-icon="{ node }">
      <template v-if="node.isLeaf">
        <bn-icon-document />
      </template>
      <template v-if="node.unfold && !node.isLeaf">
        <bn-icon-folder-open />
      </template>
      <template v-if="!node.unfold && !node.isLeaf">
        <bn-icon-folder />
      </template>
    </template>
  </bn-tree>
</template>
