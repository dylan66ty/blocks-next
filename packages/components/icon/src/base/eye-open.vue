<script lang="ts">
  import { defineComponent } from 'vue';
  import IconComponent from '../icon-component.vue';
  export default defineComponent({
    name: 'EyeOpen',
    components: {
      IconComponent,
    },
  });
</script>

<template>
  <IconComponent>
    <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M512 832C128 832 0 512 0 512s128-320 512-320 512 320 512 320-128 320-512 320z m0-512c-106.048 0-192 85.952-192 192s85.952 192 192 192 192-85.952 192-192-85.952-192-192-192z m0 320c-70.656 0-128-57.344-128-128h128l-90.496-90.496A127.36 127.36 0 0 1 512 384c70.656 0 128 57.344 128 128s-57.344 128-128 128z"
      ></path>
    </svg>
  </IconComponent>
</template>
