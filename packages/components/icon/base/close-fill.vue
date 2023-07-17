<script lang="ts">
  import type { StyleValue } from 'vue'
  import { defineComponent, computed } from 'vue'
  import { getNamespace } from '../../../utils/global-config'
  import { addUnit } from '../../../shared/utils'

  export default defineComponent({
    name: 'BnIconCloseFill',
    props: {
      size: {
        type: [Number, String],
        default: undefined
      },
      rotate: {
        type: Number,
        default: undefined
      },
      spin: Boolean,
      color: {
        type: String,
        default: undefined
      }
    },
    setup(props) {
      const ns = getNamespace('icon')

      const styles = computed(() => {
        const styles: StyleValue = {}
        if (props.size) {
          styles.fontSize = addUnit(props.size)
        }

        if (props.rotate) {
          styles.transform = `rotate(${props.rotate}deg)`
        }

        if (props.color) {
          styles.color = props.color
        }
        return styles
      })

      const cls = computed(() => [
        ns,
        {
          [`${ns}-loading`]: props.spin
        }
      ])

      return {
        cls,
        styles
      }
    }
  })
</script>

<template>
  <i :class="cls" :style="styles">
    <svg viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg">
      <g transform="translate(-340.000000, -3150.000000)">
        <g transform="translate(340.000000, 3150.000000)">
          <path
            d="M8,0 C12.418278,-8.11624501e-16 16,3.581722 16,8 C16,12.418278 12.418278,16 8,16 C3.581722,16 5.41083001e-16,12.418278 0,8 C-5.41083001e-16,3.581722 3.581722,8.11624501e-16 8,0 Z M11.6781485,3.64644661 L8.032,7.293 L4.38525533,3.64644661 L3.67814855,4.35355339 L7.325,8 L3.67814855,11.6464466 L4.38525533,12.3535534 L8.032,8.707 L11.6781485,12.3535534 L12.3852553,11.6464466 L8.739,8 L12.3852553,4.35355339 L11.6781485,3.64644661 Z"
            fill="currentColor"
          ></path>
          <g transform="translate(3.678149, 3.646447)"></g>
        </g>
      </g>
    </svg>
  </i>
</template>
