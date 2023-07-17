<script lang="ts">
  import type { StyleValue } from 'vue'
  import { defineComponent, computed } from 'vue'
  import { getNamespace } from '../../../utils/global-config'
  import { addUnit } from '../../../shared/utils'

  export default defineComponent({
    name: 'BnIconAppPc2',
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
        <g id="查企业" transform="translate(-1282.000000, -588.000000)">
          <g id="编组-16" transform="translate(1241.000000, 588.000000)" filter="url(#filter-1)">
            <g transform="translate(41.000000, 0.000000)">
              <rect
                id="矩形"
                stroke="#9CA6B9"
                stroke-width="1.6"
                x="4.8"
                y="4.8"
                width="14.4"
                height="11.4"
                rx="2"
              ></rect>
              <line
                id="路径-3"
                x1="14.0657196"
                y1="7.83174595"
                x2="16.0657196"
                y2="7.83174595"
                stroke="#9CA6B9"
                stroke-width="1.6"
                transform="translate(15.065720, 7.831746) rotate(-0.000000) translate(-15.065720, -7.831746) "
              ></line>
              <line
                id="路径-3"
                x1="4"
                y1="19.5"
                x2="20"
                y2="19.5"
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
