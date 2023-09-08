<script lang="ts" setup>
  import { ref } from 'vue'
  const tab = ref(0)
  const onChange = (val) => {
    console.log('tab key', val)
  }
  const tabs = ref([
    {
      title: 'Tab1',
      key: 0
    },
    {
      title: 'Tab2',
      key: 1
    },
    {
      title: 'Tab3',
      key: 2
    }
  ])

  const close = (item) => {
    const _tabs = tabs.value.slice()
    const index = _tabs.findIndex((tab) => tab.key === item.key)
    if (index > -1) {
      _tabs.splice(index, 1)
    }
    tabs.value = _tabs
  }

  const add = () => {
    let key = Date.now()
    tabs.value.push({
      title: `Tab${key}`,
      key
    })
  }

  const size = ref('small')
  setTimeout(() => {
    size.value = 'large'
  }, 5000)
</script>

<template>
  <bn-tabs v-model:activeKey="tab" @change="onChange">
    <bn-tab-pane v-for="item in tabs" :key="item.key">
      <template #title>
        <div class="flex gap-x-1">
          <span>{{ item.title }}</span>
          <bn-icon-close @click.stop="close(item)" />
        </div>
      </template>
    </bn-tab-pane>
    <template #extra>
      <bn-button :size="size" type="primary" @click="add">Add+</bn-button>
    </template>
  </bn-tabs>
</template>

<style lang="scss"></style>
