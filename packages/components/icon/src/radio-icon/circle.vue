<template>
  <IconComponent>
    <svg viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg" stroke-width="0.5" >
      <path d="M9 0a9 9 0 1 1 0 18A9 9 0 0 1 9 0zm0 1a8 8 0 1 0 0 16A8 8 0 0 0 9 1z" fill="#999"
        fill-rule="nonzero" />
    </svg>
  </IconComponent>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import IconComponent from '../icon-component.vue'
export default defineComponent({
  name: 'Circle',
  components: {
    IconComponent
  }
})
</script>