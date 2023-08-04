<script lang="ts">
  import type { StyleValue } from 'vue'
  import { defineComponent, computed } from 'vue'
  import { getNamespace } from '../../../utils/global-config'
  import { addUnit } from '../../../shared/utils'

  export default defineComponent({
    name: 'BnIconAppOverview',
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
      <defs>
        <filter id="filter-1">
          <feColorMatrix
            in="SourceGraphic"
            type="matrix"
            values="0 0 0 0 0.612817 0 0 0 0 0.649587 0 0 0 0 0.725459 0 0 0 1.000000 0"
          ></feColorMatrix>
        </filter>
      </defs>
      <g id="抓潜拓客" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g id="菜单图标" transform="translate(-200.000000, -150.000000)">
          <g id="编组-16" transform="translate(200.000000, 150.000000)" filter="url(#filter-1)">
            <g>
              <path
                id="矩形"
                d="M9,13 C10.1045695,13 11,13.8954305 11,15 L11,18 C11,19.1045695 10.1045695,20 9,20 L6,20 C4.8954305,20 4,19.1045695 4,18 L4,15 C4,13.8954305 4.8954305,13 6,13 L9,13 Z M9,14.6 L6,14.6 C5.80670034,14.6 5.64542508,14.7371128 5.60812658,14.919386 L5.6,15 L5.6,18 C5.6,18.1932997 5.7371128,18.3545749 5.91938605,18.3918734 L6,18.4 L9,18.4 C9.19329966,18.4 9.35457492,18.2628872 9.39187342,18.080614 L9.4,18 L9.4,15 C9.4,14.8067003 9.2628872,14.6454251 9.08061395,14.6081266 L9,14.6 Z"
                fill="#9CA6B9"
                fill-rule="nonzero"
                transform="translate(7.500000, 16.500000) scale(1, -1) translate(-7.500000, -16.500000) "
              ></path>
              <path
                id="矩形"
                d="M18,13 C19.1045695,13 20,13.8954305 20,15 L20,18 C20,19.1045695 19.1045695,20 18,20 L15,20 C13.8954305,20 13,19.1045695 13,18 L13,15 C13,13.8954305 13.8954305,13 15,13 L18,13 Z M18,14.6 L15,14.6 C14.8067003,14.6 14.6454251,14.7371128 14.6081266,14.919386 L14.6,15 L14.6,18 C14.6,18.1932997 14.7371128,18.3545749 14.919386,18.3918734 L15,18.4 L18,18.4 C18.1932997,18.4 18.3545749,18.2628872 18.3918734,18.080614 L18.4,18 L18.4,15 C18.4,14.8067003 18.2628872,14.6454251 18.080614,14.6081266 L18,14.6 Z"
                fill="#9CA6B9"
                fill-rule="nonzero"
                transform="translate(16.500000, 16.500000) scale(-1, -1) translate(-16.500000, -16.500000) "
              ></path>
              <path
                id="矩形"
                d="M9,4 C10.1045695,4 11,4.8954305 11,6 L11,9 C11,10.1045695 10.1045695,11 9,11 L6,11 C4.8954305,11 4,10.1045695 4,9 L4,6 C4,4.8954305 4.8954305,4 6,4 L9,4 Z M9,5.6 L6,5.6 C5.80670034,5.6 5.64542508,5.7371128 5.60812658,5.91938605 L5.6,6 L5.6,9 C5.6,9.19329966 5.7371128,9.35457492 5.91938605,9.39187342 L6,9.4 L9,9.4 C9.19329966,9.4 9.35457492,9.2628872 9.39187342,9.08061395 L9.4,9 L9.4,6 C9.4,5.80670034 9.2628872,5.64542508 9.08061395,5.60812658 L9,5.6 Z"
                fill="#9CA6B9"
                fill-rule="nonzero"
              ></path>
              <path
                id="矩形"
                d="M16.5,4 C18.4329966,4 20,5.56700338 20,7.5 C20,9.43299662 18.4329966,11 16.5,11 C14.5670034,11 13,9.43299662 13,7.5 C13,5.56700338 14.5670034,4 16.5,4 Z M16.5,5.6 C15.450659,5.6 14.6,6.45065898 14.6,7.5 C14.6,8.54934102 15.450659,9.4 16.5,9.4 C17.549341,9.4 18.4,8.54934102 18.4,7.5 C18.4,6.45065898 17.549341,5.6 16.5,5.6 Z"
                fill="#9CA6B9"
                fill-rule="nonzero"
                transform="translate(16.500000, 7.500000) scale(-1, 1) translate(-16.500000, -7.500000) "
              ></path>
            </g>
          </g>
        </g>
      </g>
    </svg>
  </i>
</template>
