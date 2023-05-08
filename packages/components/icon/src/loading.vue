<template>
  <IconComponent>
    <svg viewBox="0 0 50 50" class="loading-svg">
      <circle cx="25" cy="25" r="20" fill="none" class="path" max="100"></circle>
    </svg>
  </IconComponent>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import IconComponent from './icon-component.vue'
export default defineComponent({
  name: 'Loading',
  components: {
    IconComponent
  }
})
</script>