<script lang="ts" setup>
  import { ref } from 'vue'
  const visible = ref(false)
  const visible2 = ref(false)

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

  const onClose = () => {
    console.log('onClose')
  }
</script>

<template>
  <div class="flex gap-x-3">
    <bn-button size="small" @click="visible = true">Open Drawer(显示footer)</bn-button>
    <bn-button size="small" @click="visible2 = true">Open Drawer(隐藏footer)</bn-button>
  </div>
  <bn-drawer
    v-model="visible"
    title="This is title"
    width="700px"
    cancel-text="关闭"
    ok-text="导入"
    @close="onClose"
  >
    <template #body> 显示footer </template>
  </bn-drawer>

  <bn-drawer
    v-model="visible2"
    title="This is title"
    width="700px"
    cancel-text="关闭"
    :show-footer="false"
    ok-text="导入"
  >
    <template #body> 不显示footer </template>
  </bn-drawer>
</template>

<style lang="scss"></style>
