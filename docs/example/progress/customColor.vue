<script lang="ts" setup>
import { ref } from 'vue'
const percent = ref(0.2)

const handler = (step) => {
  percent.value = percent.value + step
}

const color = (percent: number) => {
  if (percent < 30) {
    return '#909399'
  }
  if (percent < 70) {
    return '#e6a23c'
  }
  return '#67c23a'
}


</script>

<template>
  <div style="width:60%">
    <bn-progress :percent="percent" color="#50b142"></bn-progress>
    <br>
    <bn-progress :percent="1" color="linear-gradient(to right, #79E0EE 0%,#98EECC 50%,#D0F5BE 100%)"></bn-progress>
    <br>
    <bn-progress :percent="percent" :color="color"></bn-progress>
    <br>
    <bn-button-group>
      <bn-button type="primary" size="mini" @click="handler(-0.08)">-</bn-button>
      <bn-button type="primary" size="mini" @click="handler(0.08)">+</bn-button>
    </bn-button-group>
  </div>
</template>

<style lang="scss"></style>