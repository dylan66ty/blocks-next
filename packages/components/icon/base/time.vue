<script lang="ts">
  import type { StyleValue } from 'vue'
  import { defineComponent, computed } from 'vue'
  import { getNamespace } from '../../../utils/global-config'
  import { addUnit } from '../../../shared/utils'

  export default defineComponent({
    name: 'BnIconTime',
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
        d="M506.36 946.35999969c-243 0-439.99999969-196.99999969-439.99999969-439.99999969s196.99999969-439.99999969 439.99999969-439.99999969 439.99999969 196.99999969 439.99999969 439.99999969S749.40000031 946.35999969 506.36 946.35999969zM506.36 148.88c-197.44000031 0-357.52000031 160.03999969-357.52000031 357.52000031 0 197.44000031 160.03999969 357.52000031 357.52000031 357.52000032 197.44000031 0 357.52000031-160.08 357.52000031-357.52000032C863.88000031 308.91999969 703.80000031 148.88 506.36 148.88zM685.11999969 547.64l-82.51999969 0-55.00000031 0-41.23999969 0 0 0c-22.8 0-41.23999969-18.48-41.23999969-41.23999969L465.12000031 258.87999969c0-22.75999969 18.43999969-41.23999969 41.23999969-41.23999969 22.75999969 0 41.23999969 18.48 41.23999969 41.23999969l0 206.23999968 55.00000031 0 82.51999969 0c22.75999969 0 41.23999969 18.48 41.23999969 41.23999969S707.88000031 547.64 685.11999969 547.64z"
      ></path>
    </svg>
  </i>
</template>
