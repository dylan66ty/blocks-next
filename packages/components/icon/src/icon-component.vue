<template>
  <i :class="cls" :style="styles">
    <slot></slot>
  </i>
</template>

<script lang="ts">
import { defineComponent, computed, StyleValue } from 'vue'
import {isNumber} from '../../../utils/is'
import {getNamespaced} from '../../../utils/global-config'

export default defineComponent({
  name: 'Icon',
  props: {
    size: [Number, String],
    rotate: Number,
    spin: Boolean,
    color: String
  },
  setup(props) {
    const ns = getNamespaced('icon')

    const styles = computed(() => {
      const styles: StyleValue = {};
      if (props.size) {
        styles.fontSize = isNumber(props.size) ? `${props.size}px` : props.size;
      }

      if (props.rotate) {
        styles.transform = `rotate(${props.rotate}deg)`;
      }

      if(props.color) {
        styles.color = props.color
      }
      return styles;
    });

    const cls = computed(() => [
       ns,
      {
        [`${ns}-loading`]: props.spin,
      },
    ])
    
    return {
      cls,
      styles
    }

  }
})



</script>