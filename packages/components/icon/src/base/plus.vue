<script lang="ts">
import { defineComponent } from 'vue';
import IconComponent from '../icon-component.vue';
import { iconProps } from '../icon-props';


export default defineComponent({
  name: 'Plus',
  components: {
    IconComponent,
  },
  props: iconProps,
  inheritAttrs: false
});
</script>

<template>
  <IconComponent v-bind="{ ...$props, ...$attrs }">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" version="1.1">
      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g transform="translate(-156.000000, -1120.000000)" fill="currentColor">
          <g transform="translate(60.000000, 1104.000000)">
            <g transform="translate(96.000000, 16.000000)">
              <rect x="3" y="8" width="11" height="1" />
              <rect x="8" y="3" width="1" height="11" />
            </g>
          </g>
        </g>
      </g>
    </svg>
  </IconComponent>
</template>
