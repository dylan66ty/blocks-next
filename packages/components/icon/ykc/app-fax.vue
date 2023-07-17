<script lang="ts">
  import type { StyleValue } from 'vue'
  import { defineComponent, computed } from 'vue'
  import { getNamespace } from '../../../utils/global-config'
  import { addUnit } from '../../../shared/utils'

  export default defineComponent({
    name: 'BnIconAppFax',
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
      width="16px"
      height="16px"
      viewBox="0 0 16 16"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
    >
      <title>编组 12</title>
      <g id="抓潜拓客" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g
          id="企业详情-联系方式-解锁"
          transform="translate(-274.000000, -1146.000000)"
          stroke="#242934"
        >
          <g id="编组-20" transform="translate(242.000000, 565.000000)">
            <g id="编组-5" transform="translate(0.000000, 560.000000)">
              <g id="编组-12" transform="translate(32.000000, 21.000000)">
                <path
                  id="矩形"
                  d="M5,2 L11,2 C11.5522847,2 12,2.44771525 12,3 L12,5 L12,5 L4,5 L4,3 C4,2.44771525 4.44771525,2 5,2 Z"
                ></path>
                <path
                  id="路径"
                  d="M4,11 L3,11 C2.44771525,11 2,10.5522847 2,10 L2,6 C2,5.44771525 2.44771525,5 3,5 L13,5 C13.5522847,5 14,5.44771525 14,6 L14,10 C14,10.5522847 13.5522847,11 13,11 L12,11"
                ></path>
                <rect id="矩形" x="4" y="8" width="8" height="6" rx="1"></rect>
              </g>
            </g>
          </g>
        </g>
      </g>
    </svg>
  </i>
</template>
