<template>
  <IconComponent>
    <svg viewBox="0 0 18 18" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g transform="translate(-418.000000, -4865.000000)">
          <g transform="translate(418.000000, 4865.000000)">
            <path
              d="M9,0 C13.9705627,0 18,4.02943725 18,9 C18,13.9705627 13.9705627,18 9,18 C4.02943725,18 0,13.9705627 0,9 C0,4.02943725 4.02943725,0 9,0 Z M9,1 C4.581722,1 1,4.581722 1,9 C1,13.418278 4.581722,17 9,17 C13.418278,17 17,13.418278 17,9 C17,4.581722 13.418278,1 9,1 Z"
              fill="#9CA6B9" fill-rule="nonzero"></path>
               <circle fill="currentColor" cx="9" cy="9" r="3"></circle>
          </g>
        </g>
      </g>
    </svg>
  </IconComponent>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import IconComponent from '../icon-component.vue'
export default defineComponent({
  name: 'Radio',
  components: {
    IconComponent
  }
})
</script>