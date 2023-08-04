<script lang="ts">
  import type { StyleValue } from 'vue'
  import { defineComponent, computed } from 'vue'
  import { getNamespace } from '../../../utils/global-config'
  import { addUnit } from '../../../shared/utils'

  export default defineComponent({
    name: 'BnIconAppOaSend',
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
      <title>发送</title>
      <g id="组件库" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g
          id="icon"
          transform="translate(-329.000000, -251.000000)"
          fill="#9CA6B9"
          fill-rule="nonzero"
        >
          <g id="发送" transform="translate(329.000000, 251.000000)">
            <g id="编组-3" transform="translate(5.000000, 6.000000)">
              <path
                id="形状"
                d="M4.83676073,7.29403748 L9.27330729,3.47870639 L3.40780597,6.16962965 L0.182663486,3.63181725 C0.0379868013,3.5180476 -0.0288442478,3.32781504 0.011678672,3.14511413 C0.0522015918,2.96241322 0.192617824,2.82088095 0.370928507,2.78300896 L13.4416343,0.00978861395 C13.5972179,-0.0230962203 13.7583446,0.0280590885 13.8688987,0.145438624 C13.9794528,0.26281816 14.02413,0.430172698 13.9873705,0.589217487 L11.4260365,11.6323379 C11.3895871,11.789951 11.2781231,11.9178717 11.1298499,11.9722537 C10.9815768,12.0266357 10.8166389,12.000017 10.6915704,11.9017172 L4.83676073,7.29403748 L4.83676073,7.29403748 Z M3.61884875,11.1074547 L4.25802011,8.02801265 L6.76357188,10.0189322 L4.32170483,11.6112851 C4.16358615,11.7143831 3.96081717,11.7098123 3.80723519,11.599688 C3.65365321,11.4895637 3.57922085,11.2953702 3.61838389,11.1069762 L3.61884875,11.1074547 Z"
              ></path>
            </g>
          </g>
        </g>
      </g>
    </svg>
  </i>
</template>
