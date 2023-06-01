<script lang="ts">
import { defineComponent } from 'vue';
import IconComponent from '../icon-component.vue';
import { iconProps } from '../icon-props';

export default defineComponent({
  name: 'Close',
  components: {
    IconComponent,
  },
  props:iconProps,
  inheritAttrs:false
});
</script>

<template>
  <IconComponent v-bind="{...$props,...$attrs}">
    <svg viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg">
      <g id="编组-19" transform="translate(3.678149, 3.646447)">
        <polygon points="0.707106781 0 8.70710678 8 8 8.70710678 0 0.707106781"></polygon>
        <polygon transform="translate(4.353553, 4.353553) scale(-1, 1) translate(-4.353553, -4.353553) "
          points="0.707106781 0 8.70710678 8 8 8.70710678 0 0.707106781"></polygon>
      </g>
    </svg>
  </IconComponent>
</template>
