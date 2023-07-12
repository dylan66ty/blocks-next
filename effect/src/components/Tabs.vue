<script lang="ts" setup>
  import { ref } from 'vue'

  const key = ref('1')

  const count = ref(0)

  setTimeout(() => {
    count.value = 10
  }, 1000)
</script>

<template>
  <div class="wrapper">
    <div style="width: 20px"> </div>

    <bn-tabs v-model:activeKey="key" :hidePanes="false" :animation="false" type="button-group">
      <bn-tab-pane title="Tab1" key="1">
        <div v-for="item in 20">{{ 1 }}</div>
      </bn-tab-pane>
      <bn-tab-pane title="Tab2" key="2">
        <div v-for="item in 20">{{ 2 }}</div>
      </bn-tab-pane>
      <bn-tab-pane title="Tab3" :key="item + 3" v-for="item in count"></bn-tab-pane>
    </bn-tabs>
  </div>
</template>

<style lang="scss">
  .wrapper {
    display: flex;
  }
</style>
