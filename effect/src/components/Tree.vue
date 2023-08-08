<script lang="ts" setup>
import { ref,watch } from 'vue';


 const treeData = [
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
              children: [{ label: 'leaf', value: '0-0-0-1-0' }],
            },
            { label: 'leaf', value: '0-0-0-2' },
          ],
        },
        {
          label: 'Trunk 1-1',
          value: '0-0-1',
        },
        {
          label: 'Trunk 1-2',
          value: '0-0-2',
          children: [
            { label: 'leaf', value: '0-0-2-0' },
            {
              label: 'leaf',
              value: '0-0-2-1',
            },
          ],
        },
      ],
    },
    {
      label: 'Trunk 2',
      value: '0-1',
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
            { label: 'leaf', value: '0-2-0-1' },
          ],
        },
      ],
    },
  ]
  
  let value = 0
  
  const handleToggleExpandAll = () => {
    treeRef.value.handleToggleExpandAll(value = value^1)
  }

  const treeRef = ref()

  const selected = ref([])

  watch(() => selected.value, val => {
    console.log(val);
  })

</script>

<template>
  <div>
    <bn-tree :data="treeData" ref="treeRef" v-model:selected="selected"></bn-tree>
    <bn-button @click="handleToggleExpandAll">expand</bn-button>
  </div>
</template>

<style lang="scss"></style> 