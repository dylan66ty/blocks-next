<script lang="ts">
  import type { StyleValue } from 'vue'
  import { defineComponent, computed } from 'vue'
  import { getNamespace } from '../../../utils/global-config'
  import { addUnit } from '../../../shared/utils'

  export default defineComponent({
    name: 'BnIconAppMoney',
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
      <title>财务中心</title>
      <g id="图标" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g
          id="图标1"
          transform="translate(-992.000000, -203.000000)"
          fill="#242934"
          fill-rule="nonzero"
        >
          <g id="一级-财务中心" transform="translate(970.000000, 189.000000)">
            <g id="财务中心" transform="translate(22.000000, 14.000000)">
              <g id="编组" transform="translate(2.000000, 2.000000)">
                <path
                  id="形状结合"
                  d="M12.1905124,4.6 L13.5609966,5.97048411 L11.289,8.241 L13.5474229,8.24161016 L13.5474229,10.1797674 L10.969,10.179 L10.969,11.384 L13.5474229,11.3840414 L13.5474229,13.3221986 L10.969,13.322 L10.9692862,15.4 L9.03112895,15.4 L9.031,13.322 L6.45279841,13.3221986 L6.45279841,11.3840414 L9.031,11.384 L9.031,10.179 L6.45279841,10.1797674 L6.45279841,8.24161016 L8.711,8.241 L6.44,5.97048411 L7.81048411,4.6 L10.0002076,6.7899304 L12.1905124,4.6 Z"
                ></path>
                <path
                  id="Stroke-5"
                  d="M10,0 C4.47738705,0 0,4.47704343 0,10 C0,15.5222847 4.47771525,20 10,20 C15.5229566,20 20,15.522613 20,10 C20,4.47671525 15.5232847,0 10,0 Z M10,2 C14.4187153,2 18,5.58128475 18,10 C18,14.4180778 14.4183527,18 10,18 C5.58228475,18 2,14.4177153 2,10 C2,5.58164729 5.58192219,2 10,2 Z"
                ></path>
              </g>
            </g>
          </g>
        </g>
      </g>
    </svg>
  </i>
</template>
