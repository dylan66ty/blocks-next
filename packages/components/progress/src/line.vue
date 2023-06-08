<template>
  <div :class="cls" aria-valuemin="0" aria-valuemax="100" :aria-valuenow="percent">

    <div :class="[`${ns}__track`]" :style="trackStyle">
      <div :class="[`${ns}__buffer`, {
        'is-animation': animation
      }]" :style="bufferStyle"></div>
      <div :class="[`${ns}__bar`]" :style="barStyle"></div>
    </div>

    <div :class="[`${ns}__text`]" v-if="showText">
      <slot name="text" :percent="percent">
        {{ text }}
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, StyleValue } from 'vue'
import { getNamespace } from '../../../utils/global-config'
import { ProgressStatus, ProgressSize } from './type'
import { addUnit } from '../../../shared/utils';
import { isFunction, isString } from '../../../utils/is';



const DEFAULT_STROKE_WIDTH = {
  small: 6,
  normal: 8,
  large: 10,
}


export default defineComponent({
  name: 'ProgressLine',
  props: {
    percent: {
      type: Number,
      default: 0,
    },
    animation: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String as PropType<ProgressSize>,
      default: 'normal',
    },
    strokeWidth: {
      type: Number,
      default: 0,
    },
    width: {
      type: [Number, String],
      default: '100%',
    },
    color: {
      type: [String, Function],
      default: undefined,
    },
    trackColor: String,
    formatText: {
      type: Function,
      default: undefined,
    },
    status: {
      type: String as PropType<ProgressStatus>,
    },
    showText: Boolean,
  },
  setup(props) {
    const ns = getNamespace('progress-line')

    const cls = computed(() => {
      return [
        ns
      ]
    })

    const computedStrokeWidth = computed(() => {
      if (props.strokeWidth) {
        return props.strokeWidth
      }
      return DEFAULT_STROKE_WIDTH[props.size];
    })

    const trackStyle = computed(() => {
      const style: StyleValue = {
        width: addUnit(props.width),
        height: addUnit(computedStrokeWidth.value),
        backgroundColor: props.trackColor,
      }
      return style
    })

    const getBarColor = ():string => {
      if(isString(props.color)) {
        return props.color
      }
      if(isFunction(props.color)) {
        return props.color(props.percent) as string
      }

      if(props.status) {
        return `var(--bn-${props.status})`
      }

      return ''
    }

    const barStyle = computed(() => {
      const barBgColor = getBarColor() 
      const style: StyleValue = {
        width: `${props.percent}%`,
        background: barBgColor
      } 
      return style
    })

    const bufferStyle = computed(() => {
      const style:StyleValue = {}
      if(props.animation) {
        style.width = `${props.percent}%`
      }
      return style
    })
 
    const text = computed(() => {
      if(isFunction(props.formatText)) {
        return props.formatText(props.percent)
      }
      return props.percent + '%'
    })


    return {
      ns,
      cls,
      text,
      trackStyle,
      barStyle,
      bufferStyle
    }

  }
})
</script>