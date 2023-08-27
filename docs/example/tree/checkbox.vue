<script lang="ts" setup>
  import { ref, watch } from 'vue'

  const checked = ref([])
  const checkStrictly = ref(false)
  const checkedOnClickNode = ref(false)

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

  watch(checkStrictly, () => {
    checked.value = []
  })

  const onChangeChecked = (val) => {
    console.log('checked:', val)
  }
</script>

<template>
  <div class="mb-2">selected: {{ checked }}</div>
  <div class="mb-2 flex gap-x-5">
    <bn-checkbox v-model="checkStrictly">checkStrictly</bn-checkbox>
    <bn-checkbox v-model="checkedOnClickNode">checkedOnClickNode</bn-checkbox>
  </div>

  <bn-tree
    v-model:checked="checked"
    show-checkbox
    :data="data"
    :unfold-on-click-node="false"
    :check-strictly="checkStrictly"
    :checked-on-click-node="checkedOnClickNode"
    @change-checked="onChangeChecked"
  />
</template>

<style lang="scss"></style>
