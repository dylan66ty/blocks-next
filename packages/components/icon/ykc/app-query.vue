<script lang="ts">
  import type { StyleValue } from 'vue'
  import { defineComponent, computed } from 'vue'
  import { getNamespace } from '../../../utils/global-config'
  import { addUnit } from '../../../shared/utils'

  export default defineComponent({
    name: 'BnIconAppQuery',
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
          transform="translate(-200.000000, -324.000000)"
          fill="#9CA6B9"
          fill-rule="nonzero"
        >
          <g id="编组-16" transform="translate(200.000000, 324.000000)">
            <path
              id="路径"
              d="M17,4.2 C18.4891233,4.2 19.7067389,5.36246286 19.79489,6.82943181 L19.8,7 L19.8,12 L18.2,12 L18.2,7 C18.2,6.37867966 17.7278003,5.86764746 17.122693,5.80619546 L17,5.8 L7,5.8 C6.37867966,5.8 5.86764746,6.27219968 5.80619546,6.87730697 L5.8,7 L5.8,17 C5.8,17.6213203 6.27219968,18.1323525 6.87730697,18.1938045 L7,18.2 L12,18.2 L12,19.8 L7,19.8 C5.51087667,19.8 4.2932611,18.6375371 4.20511004,17.1705682 L4.2,17 L4.2,7 C4.2,5.51087667 5.36246286,4.2932611 6.82943181,4.20511004 L7,4.2 L17,4.2 Z"
            ></path>
            <path
              id="椭圆形"
              d="M12,8 C14.209139,8 16,9.790861 16,12 C16,14.209139 14.209139,16 12,16 C9.790861,16 8,14.209139 8,12 C8,9.790861 9.790861,8 12,8 Z M12,9.6 C10.6745166,9.6 9.6,10.6745166 9.6,12 C9.6,13.3254834 10.6745166,14.4 12,14.4 C13.3254834,14.4 14.4,13.3254834 14.4,12 C14.4,10.6745166 13.3254834,9.6 12,9.6 Z"
            ></path>
            <polygon
              id="路径-5"
              points="14.5665033 13.4220936 19.0665033 17.9351336 17.9334967 19.0648664 13.4334967 14.5518264"
            ></polygon>
          </g>
        </g>
      </g>
    </svg>
  </i>
</template>
