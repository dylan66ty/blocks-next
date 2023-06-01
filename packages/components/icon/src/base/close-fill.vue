<script lang="ts">
import { defineComponent } from 'vue';
import IconComponent from '../icon-component.vue';
import { iconProps } from '../icon-props';

export default defineComponent({
  name: 'CloseFill',
  components: {
    IconComponent,
  },
  props: iconProps,
  inheritAttrs:false
});
</script>

<template>
  <IconComponent v-bind="{...$props,...$attrs}">
    <svg viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg">
      <g transform="translate(-340.000000, -3150.000000)">
        <g transform="translate(340.000000, 3150.000000)">
          <path
            d="M8,0 C12.418278,-8.11624501e-16 16,3.581722 16,8 C16,12.418278 12.418278,16 8,16 C3.581722,16 5.41083001e-16,12.418278 0,8 C-5.41083001e-16,3.581722 3.581722,8.11624501e-16 8,0 Z M11.6781485,3.64644661 L8.032,7.293 L4.38525533,3.64644661 L3.67814855,4.35355339 L7.325,8 L3.67814855,11.6464466 L4.38525533,12.3535534 L8.032,8.707 L11.6781485,12.3535534 L12.3852553,11.6464466 L8.739,8 L12.3852553,4.35355339 L11.6781485,3.64644661 Z"
            fill="currentColor"></path>
          <g transform="translate(3.678149, 3.646447)"></g>
        </g>
      </g>
    </svg>
  </IconComponent></template>