<template>
  <i class="bn-icon" :class="{'bn-builtin-icon': outline}" :type="type" :style="styles" :disabled="disabled" :hover="hover && !disabled">
    <slot></slot>
  </i>
</template>

<script lang="ts">
import { defineComponent, PropType, computed , StyleValue } from 'vue'
import type { IThemeType } from './types'
export default defineComponent({
  name: 'Icon',
  props: {
    hover: { type: Boolean, default: true },
    type: String as PropType<IThemeType>,
    disabled: Boolean,
    color: String,
    size: String,
    outline: Boolean
  },
  setup(props) {
    const styles = computed(() => {
      const style:StyleValue = {}
      if (props.color) style['--bn-i-color'] = props.color
      if (props.size) style['--bn-i-size'] = props.size
      return style
    })
    
    return {
      styles
    }
  }
})



</script>