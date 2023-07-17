<script lang="ts">
  import type { StyleValue } from 'vue'
  import { defineComponent, computed } from 'vue'
  import { getNamespace } from '../../../utils/global-config'
  import { addUnit } from '../../../shared/utils'

  export default defineComponent({
    name: 'BnIconAppIphone',
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
        <g id="企业详情-联系方式-解锁" transform="translate(-274.000000, -666.000000)">
          <g id="编组-20" transform="translate(242.000000, 565.000000)">
            <g id="编组-5" transform="translate(0.000000, 80.000000)">
              <g id="编组-12" transform="translate(32.000000, 21.000000)">
                <rect
                  id="矩形"
                  stroke="#242934"
                  x="3.5"
                  y="1.5"
                  width="9"
                  height="13"
                  rx="2"
                ></rect>
                <circle id="椭圆形" fill="#242934" cx="8" cy="12" r="1"></circle>
              </g>
            </g>
          </g>
        </g>
      </g>
    </svg>
  </i>
</template>
