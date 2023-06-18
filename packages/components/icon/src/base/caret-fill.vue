<script lang="ts">
  import { defineComponent } from 'vue'
  import IconComponent from '../icon-component.vue'
  import { iconProps } from '../icon-props'

  export default defineComponent({
    name: 'CaretFill',
    components: {
      IconComponent
    },
    inheritAttrs: false,
    props: iconProps
  })
</script>

<template>
  <IconComponent v-bind="{ ...$props, ...$attrs }">
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      stroke="currentColor"
      stroke-width="4"
      stroke-linecap="butt"
      stroke-linejoin="miter"
    >
      <path
        d="M24.938 34.829a1.2 1.2 0 0 1-1.875 0L9.56 17.949c-.628-.785-.069-1.949.937-1.949h27.007c1.006 0 1.565 1.164.937 1.95L24.937 34.829Z"
        fill="currentColor"
        stroke="none"
      ></path>
    </svg>
  </IconComponent>
</template>
