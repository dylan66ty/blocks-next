<script lang="ts">
  import type { StyleValue } from 'vue'
  import { defineComponent, computed } from 'vue'
  import { getNamespace } from '../../../utils/global-config'
  import { addUnit } from '../../../shared/utils'

  export default defineComponent({
    name: 'BnIconAppExclamationPoint',
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
          transform="translate(-200.000000, -674.000000)"
          fill="#9CA6B9"
          fill-rule="nonzero"
        >
          <g id="编组-16" transform="translate(200.000000, 674.000000)">
            <path
              id="椭圆形"
              d="M12.5,4 C17.1944204,4 21,7.80557963 21,12.5 C21,17.1944204 17.1944204,21 12.5,21 C7.80557963,21 4,17.1944204 4,12.5 C4,7.80557963 7.80557963,4 12.5,4 Z M12.5,5.6 C8.68923523,5.6 5.6,8.68923523 5.6,12.5 C5.6,16.3107648 8.68923523,19.4 12.5,19.4 C16.3107648,19.4 19.4,16.3107648 19.4,12.5 C19.4,8.68923523 16.3107648,5.6 12.5,5.6 Z"
            ></path>
            <polygon
              id="路径-8"
              points="13.3 11.2250897 13.3 16.4361333 11.7 16.4361333 11.7 11.2250897"
            ></polygon>
            <polygon
              id="路径-8"
              points="13.3 8.22508968 13.3 10.2250897 11.7 10.2250897 11.7 8.22508968"
            ></polygon>
          </g>
        </g>
      </g>
    </svg>
  </i>
</template>
