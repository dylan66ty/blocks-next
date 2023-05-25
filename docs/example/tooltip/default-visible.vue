<script lang="ts" setup>
import { ref } from 'vue'
const visible = ref(true)

</script>

<template>
  <div>
    <bn-tooltip content="This is a Tooltip" v-model="visible">
      <bn-button size="small">默认显示</bn-button>
    </bn-tooltip>
  </div>
</template>

<style lang="scss"></style>