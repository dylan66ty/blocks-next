<template>
  <bn-radio
      v-model="checkbox"
      :options="options"
      @input="showSelect"
  ></bn-radio>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
const checkbox = ref(1)
const options = ref([
  {
      text: '第一项',
      value: 1
  },
  {
      text: '第二项-禁止',
      value: 2,
      disabled: true
  },
  {
      text: '第三项',
      value: 3
  },
  {
      text: '第四项',
      value: 4
  },
  {
      text: '第五项',
      value: 5
  }
])
const showSelect = val => {
  console.log(val)
}
</script>
