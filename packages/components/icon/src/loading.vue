<script lang="ts">
  import { defineComponent } from 'vue';
  import IconComponent from './icon-component.vue';
  export default defineComponent({
    name: 'Loading',
    components: {
      IconComponent,
    },
  });
</script>

<template>
  <IconComponent spin>
    <svg
      viewBox="0 0 48 48"
      style="fill: none"
      xmlns="http://www.w3.org/2000/svg"
      stroke="currentColor"
      stroke-width="4"
      stroke-linecap="butt"
      stroke-linejoin="miter"
    >
      <path d="M42 24c0 9.941-8.059 18-18 18S6 33.941 6 24 14.059 6 24 6"></path>
    </svg>
  </IconComponent>
</template>
