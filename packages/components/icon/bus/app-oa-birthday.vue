<script lang="ts">
  import type { StyleValue } from 'vue'
  import { defineComponent, computed } from 'vue'
  import { getNamespace } from '../../../utils/global-config'
  import { addUnit } from '../../../shared/utils'

  export default defineComponent({
    name: 'BnIconAppOaBirthday',
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
      <title>生日</title>
      <g id="组件库" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g
          id="icon"
          transform="translate(-329.000000, -205.000000)"
          fill="#9CA6B9"
          fill-rule="nonzero"
        >
          <g id="生日" transform="translate(329.000000, 205.000000)">
            <path
              id="形状"
              d="M7.500034,13.9373437 C8.34745878,13.9373437 9.09313276,13.5399949 9.54502805,12.935296 C10.0874724,13.5400131 10.9831209,13.9373437 12,13.9373437 C13.0168791,13.9373437 13.9118817,13.5399949 14.454394,12.935296 C14.9068673,13.5400131 15.6531022,13.9373437 16.500034,13.9373437 C17.8799762,13.9373437 18.999983,12.8880094 18.999983,11.5933578 C18.999983,10.4400402 18.109332,9.48665702 16.9394016,9.29134601 C16.7962604,9.26463852 16.6500085,9.24931751 16.500017,9.24931751 L12.999983,9.24931753 L12.999983,7.1666408 L11,7.1666408 L11,9.25000651 L7.500034,9.25000651 C7.34997451,9.25000651 7.20312766,9.26465664 7.06064933,9.29203501 C5.8899881,9.48665702 5,10.4400402 5,11.5939924 C5,12.8880094 6.11874894,13.9373437 7.500034,13.9373437 L7.500034,13.9373437 Z M12,6.64601695 C12.5518953,6.64601695 13.0006289,6.17931575 13.0006289,5.60398958 C13.0006289,5.02866342 12,3 12,3 C12,3 11,5.02864527 11,5.60398958 C11,6.17931575 11.4481047,6.64601695 12,6.64601695 L12,6.64601695 Z M14.4331633,13.8886791 C13.8887642,14.5466299 13.0050144,14.9793892 12,14.9793892 C10.9949856,14.9793892 10.1112358,14.547337 9.56692163,13.8886791 C9.07876934,14.5419883 8.22624512,14.9793892 7.24943057,14.9793892 C6.31750809,14.9793892 5.49755227,14.5820404 5.00001701,13.9780123 L5.00001701,16.3960104 C5.00001701,17.8340085 6.11874894,19 7.50005101,19 L16.500051,19 C17.8799932,19 19,17.8340085 19,16.3960104 L19,13.9766343 C18.5025327,14.5813514 17.681863,14.979371 16.7493796,14.979371 C15.7731089,14.979371 14.9206017,14.5419701 14.4331633,13.8886791 L14.4331633,13.8886791 Z"
            ></path>
          </g>
        </g>
      </g>
    </svg>
  </i>
</template>
