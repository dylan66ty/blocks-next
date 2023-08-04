<script lang="ts">
  import type { StyleValue } from 'vue'
  import { defineComponent, computed } from 'vue'
  import { getNamespace } from '../../../utils/global-config'
  import { addUnit } from '../../../shared/utils'

  export default defineComponent({
    name: 'BnIconAppSearch',
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
      <title>编组 16</title>
      <g id="抓潜拓客" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g
          id="菜单图标"
          transform="translate(-200.000000, -456.000000)"
          fill="#9CA6B9"
          fill-rule="nonzero"
        >
          <g id="编组-16" transform="translate(200.000000, 456.000000)">
            <path
              id="椭圆形"
              d="M11,4 C14.8659932,4 18,7.13400675 18,11 C18,14.8659932 14.8659932,18 11,18 C7.13400675,18 4,14.8659932 4,11 C4,7.13400675 7.13400675,4 11,4 Z M11,5.6 C8.01766235,5.6 5.6,8.01766235 5.6,11 C5.6,13.9823376 8.01766235,16.4 11,16.4 C13.9823376,16.4 16.4,13.9823376 16.4,11 C16.4,8.01766235 13.9823376,5.6 11,5.6 Z"
            ></path>
            <polygon
              id="路径-5"
              points="15.5665033 14.4220936 20.0665033 18.9351336 18.9334967 20.0648664 14.4334967 15.5518264"
            ></polygon>
            <path
              id="路径-7"
              d="M9.42406643,7.3698722 C11.4001889,6.69681945 13.5445891,7.6823839 14.3343673,9.58930703 L14.4359786,9.85975398 L12.9280031,10.394553 L12.9007979,10.3178423 C12.491128,9.16269401 11.2659137,8.52794861 10.0986468,8.8364764 L9.93991529,8.88443482 L9.42406643,7.3698722 Z"
            ></path>
          </g>
        </g>
      </g>
    </svg>
  </i>
</template>
