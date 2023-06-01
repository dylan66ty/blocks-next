<script lang="ts">
import { defineComponent } from 'vue';
import IconComponent from '../icon-component.vue';
import { iconProps } from '../icon-props';
export default defineComponent({
  name: 'Warning',
  components: {
    IconComponent,
  },
  props:iconProps,
  inheritAttrs:false
});
</script>

<template>
  <IconComponent v-bind="{...$props,...$attrs}">
    <svg viewBox="0 0 60 60" version="1.1" xmlns="http://www.w3.org/2000/svg">
      <circle fill="currentColor" cx="30" cy="30" r="30"></circle>
      <polygon fill="#FFFFFF" points="28 16 32 16 31.2 36 28.8 36"></polygon>
      <circle fill="#FFFFFF" cx="30" cy="42" r="2"></circle>
    </svg>
  </IconComponent>
</template>
