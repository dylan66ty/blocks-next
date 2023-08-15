<script lang="ts" setup>
  import { ref } from 'vue'
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

  const defaultUnfoldValues = ['0-0-0', '0-2-0-0']

  const treeRef = ref()
  const unfoldAll = () => {
    treeRef.value.unfoldNodes()
  }
  const foldAll = () => {
    treeRef.value.foldNodes()
  }
  const unfold = () => {
    treeRef.value.unfoldNodes(['0-0-0', '0-2-0-0'])
  }
</script>

<template>
  <div class="mb-2">默认展开： {{ defaultUnfoldValues }}</div>
  <div class="flex gap-x-2 mb-2">
    <bn-button size="small" @click="unfoldAll">展开全部</bn-button>
    <bn-button size="small" @click="foldAll">折叠全部</bn-button>
    <bn-button size="small" @click="unfold">展开['0-0-0', '0-2-0-0']节点</bn-button>
  </div>

  <bn-tree ref="treeRef" :data="data" :default-unfold-values="defaultUnfoldValues">
    <template #node-label="{ node }">
      <span :class="{ 'text-red-500': defaultUnfoldValues.includes(node.value) }"
        >{{ node.label }} ({{ node.value }})</span
      >
    </template>
  </bn-tree>
</template>

<style lang="scss"></style>
