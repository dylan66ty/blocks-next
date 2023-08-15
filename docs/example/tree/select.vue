<script lang="ts" setup>
  import { ref, watch } from 'vue'

  const selected = ref([])
  const multiple = ref(false)

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

  watch(multiple, () => {
    selected.value = []
  })
</script>

<template>
  <div class="mb-2">selected: {{ selected }}</div>
  <bn-checkbox v-model="multiple" class="mb-2">multiple</bn-checkbox>
  <bn-tree
    v-model:selected="selected"
    :data="data"
    :multiple="multiple"
    :unfold-on-click-node="false"
  />
</template>

<style lang="scss"></style>
