<script lang="ts" setup>
import { getCurrentInstance, ref } from 'vue'
const ins = getCurrentInstance()

const visible = ref(false)

const data = ref([
  {
    value: 'beijing',
    label: 'Beijing',
    children: [
      {
        value: 'chaoyang',
        label: 'ChaoYang',
        children: [
          {
            value: 'datunli',
            label: 'Datunli',
          },
        ],
      },
      {
        value: 'haidian',
        label: 'Haidian',
      },
      {
        value: 'dongcheng',
        label: 'Dongcheng',
      },
      {
        value: 'xicheng',
        label: 'Xicheng',
        children: [
          {
            value: 'jinrongjie',
            label: 'Jinrongjie',
          },
          {
            value: 'tianqiao',
            label: 'Tianqiao',
          },
        ],
      },
    ],
  },
  {
    value: 'shanghai',
    label: 'Shanghai',
    children: [
      {
        value: 'huangpu',
        label: 'Huangpu',
      },
    ],
  },
])

const loading = ref(false)

const onLoading = () => {
  loading.value = true  
  setTimeout(() => {
    loading.value = false
  }, 1000);
}

</script>

<template>
  <div class="wrapper">
    <bn-cascader :data="data" clearable></bn-cascader>
    <bn-select>
      <bn-option label="A" value="a"></bn-option>
      <bn-option label="A" value="a"></bn-option>
      <bn-option label="A" value="a"></bn-option>

    </bn-select>

    <bn-button @click="visible = true">open</bn-button>

    <bn-drawer v-model="visible" placement="right"></bn-drawer>

    <span>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iure et aut vel beatae qui. Pariatur nisi tempora, sequi odio minima dolore dicta quo vel, officia iste id reiciendis accusantium laborum?</span>

    <bn-dialog v-model="visible">
      <h1>hello world</h1>
    </bn-dialog>

    <div style="width:200px;height:200px;border:1px solid #ddd;" v-bn-loading.fullScreen="loading">
      <bn-button @click="onLoading"></bn-button>
    </div>
  </div>
</template>

<style lang="scss">
.wrapper {
  height: 300vh;
}
</style>