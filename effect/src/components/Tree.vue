<script lang="ts" setup>

const treeData = [
    {
      label: 'Trunk 0-0',
      value: '0-0',
      children: [
        {
          label: 'Leaf 0-0-1',
          value: '0-0-1',
        },
        {
          label: 'Branch 0-0-2',
          value: '0-0-2',
          children: [
            {
              label: 'Leaf 0-0-2-1',
              value: '0-0-2-1'
            }
          ]
        },
      ],
    },
    {
      label: 'Trunk 0-1',
      value: '0-1',
      children: [
        {
          label: 'Leaf 0-1-1',
          value: '0-1-1',
        },
        {
          label: 'Leaf 0-1-2',
          value: '0-1-2',
        },
      ],
    },
];

</script>

<template>
  <div>
    <bn-tree :data="treeData"></bn-tree>

  </div>
</template>

<style lang="scss"></style> 