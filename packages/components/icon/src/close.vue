<script lang="ts">
  import { defineComponent } from 'vue';
  import IconComponent from './icon-component.vue';
  export default defineComponent({
    name: 'Close',
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
    <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
      <polygon points="6.35355339 5.64644661 20.3535534 19.6464466 19.6464466 20.3535534 5.64644661 6.35355339"></polygon>
      <polygon transform="translate(13.000000, 13.000000) scale(-1, 1) translate(-13.000000, -13.000000) " points="6.35355339 5.64644661 20.3535534 19.6464466 19.6464466 20.3535534 5.64644661 6.35355339"></polygon>
    </svg>
  </IconComponent>
</template>
