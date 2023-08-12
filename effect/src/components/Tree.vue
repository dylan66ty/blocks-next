<script lang="ts" setup>
import { ref,watch } from 'vue';


 const treeData = ref<any>([])

 setTimeout(() => {
  treeData.value = [
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
  ]
 }, 100);
  
 watch(treeData, (v) => {
  console.log(v);
 }, {deep: true})
  
  const handleUnfoldAllNodes = (val:undefined | string[]) => {
    treeRef.value.unfoldNodes(val)
  }

  const handleFoldAllNodes = (val:undefined| string[]) => {
    treeRef.value.foldNodes(val)
  }



  const treeRef = ref()

  const selected = ref([])

  //['0-0-0-1-0']
  const defaultUnfoldValues = ref()

  watch(() => selected.value, val => {
    console.log(val);
  })

  const del = (node) => {
    treeRef.value.removeNodes([node.value])
  }

  let id = '1000000'
  const add = (node) => {
    treeRef.value.insertNodes(node.value, [{
      value: '1000000',
      label: 'insert node',
      children: [{
        value: '1000001',
        label: 'insert node child'
      }]
    }])
  }

  const checked = ref(['0-0-0-0'])

  watch(checked,val => {
    console.log(val);
  })

  const checkStrictly = ref(false)
  watch(() => checkStrictly.value, () => {
    checked.value = []
  })

</script>

<template>
  <div>
    <!-- defaultUnfoldValues="defaultUnfoldValues" -->

    checkStrictly <bn-switch v-model="checkStrictly"></bn-switch>

    <bn-tree :data="treeData" ref="treeRef" v-model:checked="checked" :checkStrictly="checkStrictly"  show-line show-checkbox :defaultUnfoldValues="defaultUnfoldValues" >
      <template #node-icon="{node}">
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

      <template #node-extra="{node}">
        <bn-space>
          <bn-button link type="danger" @click="del(node)">Delete</bn-button>
          <bn-button link type="primary" @click="add(node)">add</bn-button>
        </bn-space>
      </template>

    </bn-tree>


    <bn-button @click="handleUnfoldAllNodes">unfold</bn-button>
    <bn-button @click="handleFoldAllNodes">fold</bn-button>
    <bn-button @click="handleUnfoldAllNodes(['0-0-0-1-0', '0-2-0-0'])">unfold['0-0-0-1-0']</bn-button>
    <bn-button @click="handleFoldAllNodes(['0-2-0','0-0-2'])">fold['0-2-0']</bn-button>
  </div>
</template>

<style lang="scss"></style> 