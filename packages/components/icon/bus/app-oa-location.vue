<script lang="ts">
  import type { StyleValue } from 'vue'
  import { defineComponent, computed } from 'vue'
  import { getNamespace } from '../../../utils/global-config'
  import { addUnit } from '../../../shared/utils'

  export default defineComponent({
    name: 'BnIconAppOaLocation',
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
      <title>定位</title>
      <g id="组件库" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g id="icon" transform="translate(-329.000000, -113.000000)" fill="#9CA6B9">
          <g id="定位" transform="translate(329.000000, 113.000000)">
            <path
              id="形状结合"
              d="M12,5 C15.3137085,5 18,7.6862915 18,11 C18,13.0760695 16.2336869,15.850593 12.7010608,19.3235706 C12.3119614,19.7061001 11.6880455,19.7061001 11.2989461,19.3235707 L11.2989461,19.3235707 L10.9826605,19.0097728 C7.66088685,15.6830832 6,13.013159 6,11 C6,7.6862915 8.6862915,5 12,5 Z M12,8 C10.8954305,8 10,8.8954305 10,10 C10,11.1045695 10.8954305,12 12,12 C13.1045695,12 14,11.1045695 14,10 C14,8.8954305 13.1045695,8 12,8 Z"
            ></path>
          </g>
        </g>
      </g>
    </svg>
  </i>
</template>
