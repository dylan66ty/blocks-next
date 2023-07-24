<script lang="ts" setup>
  import { ref } from 'vue'
  const visible = ref(false)

  const handler = () => {
    visible.value = true
  }

  const data = ref()

  setTimeout(() => {
    data.value = [
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
    ]
  }, 100)
</script>

<template>
  <bn-button size="small" @click="handler">Open Drawer</bn-button>

  <bn-drawer
    v-model="visible"
    title="批量导入"
    width="700px"
    cancel-text="关闭"
    ok-text="导入"
    popup-class="test"
  >
    <template #body>
      <bn-cascader :data="data" popup-class="test"></bn-cascader>
      <bn-select>
        <bn-option label="Vue" value="vue"></bn-option>
        <bn-option label="React" value="react"></bn-option>
      </bn-select>
    </template>
  </bn-drawer>
</template>

<style lang="scss"></style>
