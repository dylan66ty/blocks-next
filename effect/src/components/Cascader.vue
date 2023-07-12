<script lang="ts" setup>
  import { getCurrentInstance, ref } from 'vue'

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
              label: 'Datunli'
            }
          ]
        },
        {
          value: 'haidian',
          label: 'Haidian'
        },
        {
          value: 'dongcheng',
          label: 'Dongcheng'
        },
        {
          value: 'xicheng',
          label: 'Xicheng',
          children: [
            {
              value: 'jinrongjie',
              label: 'Jinrongjie'
            },
            {
              value: 'tianqiao',
              label: 'Tianqiao'
            }
          ]
        }
      ]
    },
    {
      value: 'shanghai',
      label: 'Shanghai',
      children: [
        {
          value: 'huangpu',
          label: 'Huangpu'
        }
      ]
    }
  ])

  const model = ref([
    ['beijing', 'xicheng', 'tianqiao'],
    ['beijing', 'xicheng', 'jinrongjie']
  ])

  const onChange = (val) => {
    console.log(val)
  }
</script>

<template>
  <div class="wrapper">
    <!-- multiple -->
    <bn-cascader
      style="width: 600px"
      :data="data"
      clearable
      v-model="model"
      @change="onChange"
      multiple
    ></bn-cascader>

    <bn-cascader style="width: 600px" :data="data" clearable @change="onChange"></bn-cascader>
  </div>
</template>

<style lang="scss">
  .wrapper {
    height: 300vh;
  }
</style>
