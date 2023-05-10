<template>
  <IconComponent>
    <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
      <g fill="currentColor" fill-rule="evenodd">
        <rect fill="currentColor" width="16" height="16" rx="2" />
        <path d="M11.481 4.62l1.126 1.137-5.61 5.558L3.48 7.834l1.126-1.137 2.389 2.365z" fill="#fff"
          fill-rule="nonzero" />
      </g>
    </svg>
  </IconComponent>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import IconComponent from '../icon-component.vue'
export default defineComponent({
  name: 'Check',
  components: {
    IconComponent
  }
})
</script>