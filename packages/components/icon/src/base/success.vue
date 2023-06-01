<script lang="ts">
import { defineComponent } from 'vue';
import IconComponent from '../icon-component.vue';
import { iconProps } from '../icon-props';
export default defineComponent({
  name: 'Success',
  components: {
    IconComponent,
  },
  props: iconProps,
  inheritAttrs: false
});
</script>

<template>
  <IconComponent v-bind="{...$props,...$attrs}">
    <svg viewBox="0 0 60 60" version="1.1" xmlns="http://www.w3.org/2000/svg">
      <circle fill="currentColor" cx="30" cy="30" r="30"></circle>
      <path
        d="M17.6470588,30.4585821 L19.3914264,28.8222085 L27.4170184,35.4674424 C27.4170184,35.4674424 33.3805761,30.0895888 44.296687,21.1764706 L45,22.8905447 C45,22.8905447 35.9008019,31.4608541 27.3730535,40.5882353 L17.6470588,30.4585821 Z"
        fill="#FFFFFF" fill-rule="nonzero"
        transform="translate(31.323529, 30.882353) rotate(-5.000000) translate(-31.323529, -30.882353) "></path>
    </svg>
  </IconComponent>
</template>
