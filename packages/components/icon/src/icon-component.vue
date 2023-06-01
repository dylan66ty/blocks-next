<script lang="ts">
  import type { StyleValue } from 'vue';
  import { defineComponent, computed } from 'vue';
  import { isNumber } from '../../../utils/is';
  import { getNamespace } from '../../../utils/global-config';
  import { iconProps } from './icon-props'

  export default defineComponent({
    name: 'Icon',
    props: iconProps,
    setup(props) {
      const ns = getNamespace('icon');

      const styles = computed(() => {
        const styles: StyleValue = {};
        if (props.size) {
          styles.fontSize = isNumber(props.size) ? `${props.size}px` : props.size;
        }

        if (props.rotate) {
          styles.transform = `rotate(${props.rotate}deg)`;
        }

        if (props.color) {
          styles.color = props.color;
        }
        return styles;
      });

      const cls = computed(() => [
        ns,
        {
          [`${ns}-loading`]: props.spin,
        },
      ]);

      return {
        cls,
        styles,
      };
    },
  });
</script>

<template>
  <i :class="cls" :style="styles">
    <slot></slot>
  </i>
</template>
