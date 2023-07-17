<script lang="ts">
  import type { StyleValue } from 'vue'
  import { defineComponent, computed } from 'vue'
  import { getNamespace } from '../../../utils/global-config'
  import { addUnit } from '../../../shared/utils'

  export default defineComponent({
    name: 'BnIconAppMarket',
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
      <title>服务市场</title>
      <g id="图标" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g id="图标1" transform="translate(-1388.000000, -203.000000)">
          <g id="编组-21" transform="translate(1388.000000, 203.000000)">
            <path
              id="矩形"
              d="M18.1080271,4 C18.3733939,4 18.6156491,4.10365335 18.7952425,4.27354628 C18.9748359,4.4434392 19.0917675,4.6795717 19.1064874,4.94452998 L19.8842652,18.94453 C19.8995828,19.2202472 19.8016938,19.476071 19.6310462,19.6667949 C19.465143,19.8522161 19.2304706,19.976107 18.9641963,19.9969279 L5.11419515,20 C4.83805278,20 4.58805278,19.8880712 4.40708837,19.7071068 C4.23115566,19.5311741 4.12047286,19.2899914 4.11445383,19.0229728 L4.89351258,4.94452998 C4.90823248,4.6795717 5.02516414,4.4434392 5.20475754,4.27354628 C5.38435094,4.10365335 5.62660608,4 5.89197293,4 Z"
              stroke="#242934"
              stroke-width="2"
            ></path>
            <path
              id="形状结合"
              d="M12,10 C13.1045695,10 14,9.1045695 14,8 L16,8 C16,10.209139 14.209139,12 12,12 C9.790861,12 8,10.209139 8,8 L10,8 C10,9.1045695 10.8954305,10 12,10 Z"
              fill="#242934"
            ></path>
            <g id="消息icon" transform="translate(8.000000, 7.000000)"></g>
          </g>
        </g>
      </g>
    </svg>
  </i>
</template>
