<script lang="ts" setup>
import { ref } from 'vue'
const percent = ref(0.4)

const step = 0.1

const decrease = () => {
  if (percent.value <= 0) return
  percent.value = percent.value - step
}

const increase = () => {
  if (percent.value >= 0.99) return
  percent.value = percent.value + step
}


</script>

<template>
  <bn-progress style="width:60%" :percent="percent" status="primary"></bn-progress>
  <br>
  <bn-progress style="width:60%" :percent="percent" status="success"></bn-progress>
  <br>
  <bn-progress style="width:60%" :percent="percent" status="warning"></bn-progress>
  <br>
  <bn-progress style="width:60%" :percent="percent" status="danger"></bn-progress>
  <br>
  <bn-button-group>
    <bn-button type="primary" size="mini" @click="decrease">-</bn-button>
    <bn-button type="primary" size="mini" @click="increase">+</bn-button>
  </bn-button-group>
</template>

<style lang="scss"></style>