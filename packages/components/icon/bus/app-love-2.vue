<script lang="ts">
  import type { StyleValue } from 'vue'
  import { defineComponent, computed } from 'vue'
  import { getNamespace } from '../../../utils/global-config'
  import { addUnit } from '../../../shared/utils'

  export default defineComponent({
    name: 'BnIconAppLove2',
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
          transform="translate(-1819.000000, -21.000000)"
          fill="#9CA6B9"
          fill-rule="nonzero"
        >
          <g id="头部" transform="translate(720.000000, 0.000000)">
            <g id="编组-22" transform="translate(1100.000000, 21.000000)">
              <path
                id="路径"
                d="M16.940707,5 C15.391106,5 13.95439,5.79263804 13,7.09631902 C12.0558723,5.79263804 10.608894,5 9.05929304,5 C6.26795895,5 4,7.52392638 4,10.6214724 C4,12.4674847 4.81071836,13.7711656 5.46750285,14.8141104 C7.36602052,17.8490798 12.1482326,21.6141104 12.3534778,21.7705521 C12.5484607,21.9269939 12.7742303,22 13,22 C13.2257697,22 13.4515393,21.9269939 13.6465222,21.7705521 C13.8517674,21.6141104 18.6237172,17.8386503 20.5324971,14.8141104 C21.1892816,13.7711656 22,12.4674847 22,10.6214724 C22,7.52392638 19.732041,5 16.940707,5 Z"
              ></path>
            </g>
          </g>
        </g>
      </g>
    </svg>
  </i>
</template>
