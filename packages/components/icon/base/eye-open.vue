<script lang="ts">
  import type { StyleValue } from 'vue'
  import { defineComponent, computed } from 'vue'
  import { getNamespace } from '../../../utils/global-config'
  import { addUnit } from '../../../shared/utils'

  export default defineComponent({
    name: 'BnIconEyeOpen',
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
    <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M512 832C128 832 0 512 0 512s128-320 512-320 512 320 512 320-128 320-512 320z m0-512c-106.048 0-192 85.952-192 192s85.952 192 192 192 192-85.952 192-192-85.952-192-192-192z m0 320c-70.656 0-128-57.344-128-128h128l-90.496-90.496A127.36 127.36 0 0 1 512 384c70.656 0 128 57.344 128 128s-57.344 128-128 128z"
      ></path>
    </svg>
  </i>
</template>
