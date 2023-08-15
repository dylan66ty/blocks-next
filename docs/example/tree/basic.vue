<script lang="ts" setup>
  import { ref } from 'vue'
  const data = ref([
    {
      label: '根节点 A',
      value: '0',
      children: [
        {
          label: '节点 A1',
          value: '0-1',
          children: [
            {
              label: '叶子节点 A1.1',
              value: '0-1-1'
            },
            {
              label: '叶子节点 A1.2',
              value: '0-1-2'
            }
          ]
        },
        {
          label: '节点 A2',
          value: '0-2'
        }
      ]
    },
    {
      label: '根节点 B',
      value: '1',
      children: [
        {
          label: '节点 B1',
          value: '1-1',
          children: [
            {
              label: '叶子节点 B1.1',
              value: '1-1-1'
            },
            {
              label: '叶子节点 B1.2',
              value: '1-1-2'
            }
          ]
        },
        {
          label: '节点 B2',
          value: '1-2'
        }
      ]
    }
  ])

  const onUnfoldNode = (node) => {
    console.log('展开', node)
  }
  const onFoldNode = (node) => {
    console.log('折叠', node)
  }
  const onClickNode = (node) => {
    console.log('点击节点', node)
  }
</script>

<template>
  <bn-tree
    :data="data"
    @unfold-node="onUnfoldNode"
    @fold-node="onFoldNode"
    @click-node="onClickNode"
  />
</template>

<style lang="scss"></style>
