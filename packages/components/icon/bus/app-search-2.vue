<script lang="ts">
  import type { StyleValue } from 'vue'
  import { defineComponent, computed } from 'vue'
  import { getNamespace } from '../../../utils/global-config'
  import { addUnit } from '../../../shared/utils'

  export default defineComponent({
    name: 'BnIconAppSearch2',
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
      <defs>
        <filter id="filter-1">
          <feColorMatrix
            in="SourceGraphic"
            type="matrix"
            values="0 0 0 0 0.141176 0 0 0 0 0.160784 0 0 0 0 0.203922 0 0 0 1.000000 0"
          ></feColorMatrix>
        </filter>
      </defs>
      <g id="抓潜拓客" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g id="查企业" transform="translate(-953.000000, -588.000000)">
          <g id="编组-16" transform="translate(919.000000, 588.000000)" filter="url(#filter-1)">
            <g transform="translate(34.000000, 0.000000)">
              <path
                id="路径"
                d="M12,19 L7,19 C5.8954305,19 5,18.1045695 5,17 L5,7 C5,5.8954305 5.8954305,5 7,5 L17,5 C18.1045695,5 19,5.8954305 19,7 L19,12"
                stroke="#9CA6B9"
                stroke-width="1.6"
              ></path>
              <circle
                id="椭圆形"
                stroke="#9CA6B9"
                stroke-width="1.6"
                cx="12"
                cy="12"
                r="3.2"
              ></circle>
              <line
                id="路径-5"
                x1="14"
                y1="13.98696"
                x2="18.5"
                y2="18.5"
                stroke="#9CA6B9"
                stroke-width="1.6"
              ></line>
            </g>
          </g>
        </g>
      </g>
    </svg>
  </i>
</template>
