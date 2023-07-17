<script lang="ts">
  import type { StyleValue } from 'vue'
  import { defineComponent, computed } from 'vue'
  import { getNamespace } from '../../../utils/global-config'
  import { addUnit } from '../../../shared/utils'

  export default defineComponent({
    name: 'BnIconAppPlus',
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
        <g id="帐号设置" transform="translate(-1861.000000, -120.000000)" fill="#FFFFFF">
          <g id="编组-3" transform="translate(1766.000000, 104.000000)">
            <g id="矩形" transform="translate(96.000000, 16.000000)">
              <rect x="3" y="8" width="11" height="1"></rect>
              <rect x="8" y="3" width="1" height="11"></rect>
            </g>
          </g>
        </g>
      </g>
    </svg>
  </i>
</template>
