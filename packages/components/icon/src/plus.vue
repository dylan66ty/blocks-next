<script lang="ts">
  import { defineComponent } from 'vue';
  import IconComponent from './icon-component.vue';
  export default defineComponent({
    name: 'Plus',
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
    <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M452.00906068 891.99918377a60 60 0 0 0 119.98187864 0L571.99093932 571.99093932l320.00824445 0a60 60 0 0 0 0-119.98187864L571.99093932 452.00906068 571.99093932 132.00081623a60 60 0 1 0-119.98187864 0L452.00906068 452.00906068l-320.00824445 0a60 60 0 0 0 0 119.98187864L452.00906068 571.99093932l0 320.00824445z"
      ></path>
    </svg>
  </IconComponent>
</template>
