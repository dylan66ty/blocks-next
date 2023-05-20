<script lang="ts">
  import { defineComponent } from 'vue';
  import IconComponent from './icon-component.vue';
  export default defineComponent({
    name: 'Info',
    components: {
      IconComponent,
    },
    props: {
      open: { type: Boolean, default: true },
    },
  });
</script>

<template>
  <IconComponent>
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor"  stroke-width="4" stroke-linecap="butt" stroke-linejoin="miter"><path fill-rule="evenodd" clip-rule="evenodd" d="M24 44c11.046 0 20-8.954 20-20S35.046 4 24 4 4 12.954 4 24s8.954 20 20 20Zm2-30a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-2Zm0 17h1a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-6a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1h1v-8a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v11Z" fill="currentColor" stroke="none"></path></svg>
  </IconComponent>
</template>
