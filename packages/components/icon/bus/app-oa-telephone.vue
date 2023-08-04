<script lang="ts">
  import type { StyleValue } from 'vue'
  import { defineComponent, computed } from 'vue'
  import { getNamespace } from '../../../utils/global-config'
  import { addUnit } from '../../../shared/utils'

  export default defineComponent({
    name: 'BnIconAppOaTelephone',
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
      <title>电话</title>
      <g id="组件库" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g id="icon" transform="translate(-329.000000, -159.000000)" fill="#9CA6B9">
          <g id="电话" transform="translate(329.000000, 159.000000)">
            <path
              id="路径"
              d="M18.7270085,16.1002777 C19.0909972,16.4651396 19.0909972,17.0557816 18.7270085,17.4206435 L18.0667839,18.0808847 C17.5789389,18.568742 16.9372711,18.8658914 16.1595202,18.9642798 C15.9666473,18.9883844 15.7724473,19.0003127 15.5780743,19 C15.0120341,19 14.4012943,18.9044064 13.7548413,18.7142822 C12.0001167,18.1985307 10.1545922,17.0353763 8.55975929,15.4400365 C6.96492642,13.8446966 5.80133447,11.9997093 5.28559598,10.2448238 C5.02883547,9.37053227 4.94433793,8.5614829 5.03560462,7.84055127 C5.13399057,7.06278078 5.4311325,6.4210968 5.91897747,5.93323957 L6.57920211,5.27299832 C6.94405482,4.90900056 7.53468196,4.90900056 7.89953467,5.27299832 L10.8045464,8.17796642 C11.1685484,8.54286831 11.1685484,9.133547 10.8045464,9.49844889 L10.1443217,10.1582233 C9.77085192,10.5317025 10.1425711,11.7410749 11.2006578,12.7990715 C12.2587445,13.8570682 13.467503,14.2293803 13.8414396,13.8554342 L14.5016643,13.1951929 C14.866557,12.8311817 15.4572208,12.8311817 15.8221135,13.1951929 L18.7270085,16.1002777 Z"
            ></path>
          </g>
        </g>
      </g>
    </svg>
  </i>
</template>
