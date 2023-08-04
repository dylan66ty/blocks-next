<script lang="ts">
  import type { StyleValue } from 'vue'
  import { defineComponent, computed } from 'vue'
  import { getNamespace } from '../../../utils/global-config'
  import { addUnit } from '../../../shared/utils'

  export default defineComponent({
    name: 'BnIconAppCopy',
    props: {
      size: {
        type: [Number, String],
        default: undefined
      },
      rotate: {
        type: Number,
        default: undefined
      },
      spin: {
        type: Boolean,
        default: false
      },
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
    <svg
      width="24px"
      height="24px"
      viewBox="0 0 24 24"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
    >
      <title>编组 16</title>
      <g id="抓潜拓客" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g
          id="菜单图标"
          transform="translate(-200.000000, -586.000000)"
          fill="#9CA6B9"
          fill-rule="nonzero"
        >
          <g id="编组-16" transform="translate(200.000000, 586.000000)">
            <path
              id="矩形"
              d="M19,7 C20.1045695,7 21,7.8954305 21,9 L21,19 C21,20.1045695 20.1045695,21 19,21 L9,21 C7.8954305,21 7,20.1045695 7,19 L7,9 C7,7.8954305 7.8954305,7 9,7 L19,7 Z M19,8.6 L9,8.6 C8.80670034,8.6 8.64542508,8.7371128 8.60812658,8.91938605 L8.6,9 L8.6,19 C8.6,19.1932997 8.7371128,19.3545749 8.91938605,19.3918734 L9,19.4 L19,19.4 C19.1932997,19.4 19.3545749,19.2628872 19.3918734,19.080614 L19.4,19 L19.4,9 C19.4,8.80670034 19.2628872,8.64542508 19.080614,8.60812658 L19,8.6 Z"
            ></path>
            <polygon id="路径-3" points="15.896472 11.7 15.896472 13.3 12 13.3 12 11.7"></polygon>
            <polygon id="路径-3" points="15.896472 14.7 15.896472 16.3 12 16.3 12 14.7"></polygon>
            <path
              id="形状结合"
              d="M4,16 L4,6 C4,4.8954305 4.8954305,4 6,4 L16,4 C17.1045695,4 18,4.8954305 18,6 L16.4,6 C16.4,5.80670034 16.2628872,5.64542508 16.080614,5.60812658 L16,5.6 L6,5.6 C5.80670034,5.6 5.64542508,5.7371128 5.60812658,5.91938605 L5.6,6 L5.6,16 C5.6,16.1932997 5.7371128,16.3545749 5.91938605,16.3918734 L6,16.4 L6,18 C4.8954305,18 4,17.1045695 4,16 Z"
            ></path>
          </g>
        </g>
      </g>
    </svg>
  </i>
</template>
