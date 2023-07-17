<script lang="ts">
  import type { StyleValue } from 'vue'
  import { defineComponent, computed } from 'vue'
  import { getNamespace } from '../../../utils/global-config'
  import { addUnit } from '../../../shared/utils'

  export default defineComponent({
    name: 'BnIconAppNewPage',
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
      width="27px"
      height="26px"
      viewBox="0 0 27 26"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
    >
      <title>编组 22</title>
      <g id="抓潜拓客" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g
          id="条件查询-查看企业信息-弹窗"
          transform="translate(-1773.000000, -21.000000)"
          fill="#9CA6B9"
        >
          <g id="头部" transform="translate(720.000000, 0.000000)">
            <g id="编组-22" transform="translate(1054.000000, 21.000000)">
              <path
                id="形状结合"
                d="M21,5 C21.5522847,5 22,5.44771525 22,6 L22,17 C22,17.5522847 21.5522847,18 21,18 L15,18 L15,13 C15,12.4871642 14.6139598,12.0644928 14.1166211,12.0067277 L14,12 L6,12 L6,6 C6,5.44771525 6.44771525,5 7,5 L21,5 Z"
              ></path>
              <rect id="矩形" x="3" y="13" width="11" height="9" rx="1"></rect>
            </g>
          </g>
        </g>
      </g>
    </svg>
  </i>
</template>
