<script lang="ts" setup>

</script>

<template>
  <bn-progress style="width:60%" :percent="0.6"></bn-progress>
  <br />
  <bn-progress style="width:60%" :percent="0.3">
    <template #text="{ percent }">
      进度{{ percent }}%
    </template>
  </bn-progress>
  <br />
  <bn-progress style="width:60%" :percent="0.3" :show-text="false">
  </bn-progress>
</template>

<style lang="scss"></style>