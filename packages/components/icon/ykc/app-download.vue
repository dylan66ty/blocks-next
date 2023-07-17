<script lang="ts">
  import type { StyleValue } from 'vue'
  import { defineComponent, computed } from 'vue'
  import { getNamespace } from '../../../utils/global-config'
  import { addUnit } from '../../../shared/utils'

  export default defineComponent({
    name: 'BnIconAppDownload',
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
      width="17px"
      height="16px"
      viewBox="0 0 17 16"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
    >
      <title>编组 3</title>
      <g id="抓潜拓客" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g id="空号检测" transform="translate(-1849.000000, -120.000000)" stroke="#FFFFFF">
          <g id="编组-3" transform="translate(1754.000000, 104.000000)">
            <g transform="translate(96.000000, 16.000000)">
              <path
                id="路径"
                d="M14,9 L14,11 C14,12.1045695 13.1045695,13 12,13 L4,13 C2.8954305,13 2,12.1045695 2,11 L2,9"
              ></path>
              <line id="路径-6" x1="8" y1="1.5" x2="8" y2="9.5"></line>
              <polyline
                id="路径-12"
                points="3.9881208 6 7.9999998 10.011879 12.0118788 6"
              ></polyline>
            </g>
          </g>
        </g>
      </g>
    </svg>
  </i>
</template>
