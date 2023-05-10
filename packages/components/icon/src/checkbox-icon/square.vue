<template>
  <IconComponent>
    <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M14 0a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12zm0 1H2a1 1 0 0 0-.993.883L1 2v12a1 1 0 0 0 .883.993L2 15h12a1 1 0 0 0 .993-.883L15 14V2a1 1 0 0 0-.883-.993L14 1z"
        fill="currentColor" fill-rule="nonzero" />
    </svg>
  </IconComponent>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import IconComponent from '../icon-component.vue'
export default defineComponent({
  name: 'Square',
  components: {
    IconComponent
  }
})
</script>