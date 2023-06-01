<script lang="ts">
import { defineComponent } from 'vue';
import IconComponent from '../icon-component.vue';
import { iconProps } from '../icon-props';

export default defineComponent({
  name: 'Delete',
  components: {
    IconComponent,
  },
  props:iconProps,
  inheritAttrs:false
});
</script>

<template>
  <IconComponent v-bind="{...$props,...$attrs}">
    <svg viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg">
      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g transform="translate(-293.000000, -3880.000000)" fill="currentColor">
          <g transform="translate(293.000000, 3880.000000)">
            <path
              d="M17,8 L17,17 C17,18.1045695 16.1045695,19 15,19 L9,19 C7.8954305,19 7,18.1045695 7,17 L7,8 L17,8 Z M16,9 L8,9 L8,17 C8,17.5128358 8.38604019,17.9355072 8.88337887,17.9932723 L9,18 L15,18 C15.5128358,18 15.9355072,17.6139598 15.9932723,17.1166211 L16,17 L16,9 Z"
              fill-rule="nonzero"></path>
            <rect x="10" y="11" width="1" height="5"></rect>
            <rect x="13" y="11" width="1" height="5"></rect>
            <polygon fill-rule="nonzero" points="19 8 19 9 5 9 5 8"></polygon>
            <path
              d="M14,5 C14.5522847,5 15,5.44771525 15,6 L15,9 L9,9 L9,6 C9,5.44771525 9.44771525,5 10,5 L14,5 Z M14,6 L10,6 L10,8 L14,8 L14,6 Z"
              fill-rule="nonzero"></path>
          </g>
        </g>
      </g>
    </svg>
</IconComponent></template>
