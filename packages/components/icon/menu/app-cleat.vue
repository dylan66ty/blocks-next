<script lang="ts">
  import type { StyleValue } from 'vue'
  import { defineComponent, computed } from 'vue'
  import { getNamespace } from '../../../utils/global-config'
  import { addUnit } from '../../../shared/utils'

  export default defineComponent({
    name: 'BnIconAppCleat',
    props: {
      size: {
        type: [Number, String],
        default: undefined
      },
      rotate: {
        type: Number,
        default: undefined
      },
      spin: Boolean,
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
      <g id="图标" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g
          id="图标1"
          transform="translate(-1133.000000, -203.000000)"
          fill="#272636"
          fill-rule="nonzero"
        >
          <g id="一级-羊只管理系统" transform="translate(1111.000000, 189.000000)">
            <g id="羊只管理系统" transform="translate(22.000000, 14.000000)">
              <path
                id="形状结合"
                d="M17.242824,4.85 C19.4559946,4.85 21.25,6.64400543 21.25,8.85717595 C21.25,11.0011849 19.566368,12.7518172 17.4490388,12.859138 L17.242824,12.8643519 L17.242824,10.8087963 C18.3207426,10.8087963 19.1944444,9.93509449 19.1944444,8.85717595 C19.1944444,7.77925741 18.3207426,6.90555556 17.242824,6.90555556 C16.216235,6.90555556 15.3748764,7.6980289 15.2970749,8.70464911 L15.2912037,8.85717595 L15.2912037,13.7452224 C15.2912037,16.6303904 13.9985889,19.1045868 12,19.1045868 C10.0601932,19.1045868 8.78544322,16.7737911 8.71213596,13.9986771 L8.70879635,13.7452224 L8.70879635,8.85717595 C8.70879635,7.77925741 7.83509449,6.90555556 6.75717595,6.90555556 C5.67925741,6.90555556 4.80555556,7.77925741 4.80555556,8.85717595 C4.80555556,9.88376503 5.5980289,10.7251236 6.60464911,10.8029251 L6.75717595,10.8087963 L6.75717595,12.8643519 C4.54400543,12.8643519 2.75,11.0703465 2.75,8.85717595 C2.75,6.64400543 4.54400543,4.85 6.75717595,4.85 C8.9011849,4.85 10.6518172,6.53363205 10.759138,8.65096119 L10.7643519,8.85717595 L10.7643519,13.7452224 C10.7643519,15.6444339 11.4981673,17.0490312 12,17.0490312 C12.4817594,17.0490312 13.177314,15.7545543 13.2321876,13.9706954 L13.2356481,13.7452224 L13.2356481,8.85717595 C13.2356481,6.64400543 15.0296535,4.85 17.242824,4.85 Z"
              ></path>
            </g>
          </g>
        </g>
      </g>
    </svg>
  </i>
</template>
