<script lang="ts" setup>
import {ref} from 'vue'
const percent = ref(0.1)

const handler = () => {
  percent.value = percent.value + 0.1
}

const color = (percent:number) => {
  if ( percent< 30) {
    return '#909399'
  }
  if (percent < 70) {
    return '#e6a23c'
  }
  return '#67c23a'
}


</script>

<template>
  <div style="width:200px">
    <bn-progress 
    :percent="percent" 
    size="large"
    :color="color"
    animation
    type="circle"
    status="danger"
    :width="500"
    ></bn-progress>
    
    <bn-button @click="handler">+</bn-button>
  </div>
</template>

<style lang="scss"></style>