<script setup lang="ts">
import { ref } from 'vue'

const radio = ref('1')

const checkbox = ref(false)

</script>

<template>
  <div>
    <bn-radio v-model="radio" :label="radio">12313</bn-radio>
    <bn-checkbox v-model="checkbox">复选框</bn-checkbox>
  </div>
</template>

<style>

</style>
