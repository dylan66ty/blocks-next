<script lang="ts" setup>
import { ref , watch} from 'vue'
const treeData = ref([
    {
      label: 'Trunk 1',
      value: '0-0',
      children: [
        {
          label: 'Trunk 1-0',
          value: '0-0-0',
          disabled: true,
          children: [
            { label: 'leaf', value: '0-0-0-0'},
            {
              label: 'leaf',
              value: '0-0-0-1',
              children: [{ label: 'leaf', value: '0-0-0-1-0' }],
            },
            { label: 'leaf', value: '0-0-0-2' , disabled: true},
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
])

// const treeData = ref([])

const model = ref(['0-0-2-0'])

watch(() => model.value, () => {
  console.log(model.value)
})
</script>

<template>
  <div>
    <!-- checkStrictly -->
    <bn-tree-select :data="treeData" v-model="model" multiple clearable filterable>
      <!-- <template #node-icon="{node}">
        <template v-if="node.isLeaf">
          <bn-icon-document />
        </template>
        <template v-if="node.unfold && !node.isLeaf">
          <bn-icon-folder-open />
        </template>
        <template v-if="!node.unfold && !node.isLeaf">
          <bn-icon-folder />
        </template>
      </template> -->
    </bn-tree-select>
  </div>
</template>

<style lang="scss"></style>