<script lang="ts" setup>
  import { ref } from 'vue';
  const selection = ref(['卡卡西', '鸣人']);
</script>

<template>
  <div style="margin-bottom: 10px">v-model: {{ selection }}</div>
  <bn-checkbox-group v-model="selection">
    <bn-checkbox label="卡卡西"></bn-checkbox>
    <bn-checkbox label="小樱"></bn-checkbox>
    <bn-checkbox label="凯"></bn-checkbox>
    <bn-checkbox label="带土" disabled></bn-checkbox>
    <bn-checkbox label="佐助" disabled></bn-checkbox>
  </bn-checkbox-group>
</template>

<style lang="scss"></style>
