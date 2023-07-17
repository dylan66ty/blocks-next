<script lang="ts">
  import type { StyleValue } from 'vue'
  import { defineComponent, computed } from 'vue'
  import { getNamespace } from '../../../utils/global-config'
  import { addUnit } from '../../../shared/utils'

  export default defineComponent({
    name: 'BnIconSearch',
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
    <svg viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M9,2 C12.8659932,2 16,5.13400675 16,9 C16,12.8659932 12.8659932,16 9,16 C5.13400675,16 2,12.8659932 2,9 C2,5.13400675 5.13400675,2 9,2 Z M9,3.6 C6.01766235,3.6 3.6,6.01766235 3.6,9 C3.6,11.9823376 6.01766235,14.4 9,14.4 C11.9823376,14.4 14.4,11.9823376 14.4,9 C14.4,6.01766235 11.9823376,3.6 9,3.6 Z"
      ></path>
      <polygon
        points="14.141134 12.4343146 18.5544172 16.8475978 17.4230464 17.9789687 13.0097632 13.5656854"
      ></polygon>
    </svg>
  </i>
</template>
