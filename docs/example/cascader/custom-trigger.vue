<script lang="ts" setup>
  import { ref } from 'vue'

  const model = ref([])

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
  <div class="mb-1"> model: {{ model }} </div>
  <div class="mb-4">
    <bn-tag @click="model = []">清空</bn-tag>
  </div>

  <bn-cascader v-model="model" :data="data" multiple show-footer>
    <template #trigger>
      <span :class="['custom-trigger', { 'is-active': model.length }]">open cascader</span>
    </template>
    <template #footer="{ ok, cancel }">
      <div style="width: 100%; display: flex; justify-content: center; gap: 8px">
        <bn-button size="small" @click="cancel()">取消</bn-button>
        <bn-button type="primary" size="small" @click="ok()">确认</bn-button>
      </div>
    </template>
  </bn-cascader>
</template>

<style lang="scss">
  .custom-trigger {
    cursor: pointer;

    &.is-active {
      color: var(--bn-primary);
    }
  }
</style>
