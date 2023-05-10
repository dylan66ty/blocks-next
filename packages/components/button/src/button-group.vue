<template>
  <div class="bn-btn-group">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ButtonGroup',
})
</script>