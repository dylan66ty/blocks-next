<template>
  <div aria-valuemin="0" aria-valuemax="100" :aria-valuenow="percent" :class="cls"
    :style="{ width: `${mergedWidth}px`, height: `${mergedWidth}px` }">
    <svg :viewBox="`0 0 ${mergedWidth} ${mergedWidth}`" :class="[`${ns}__svg`]">
      <circle :class="`${ns}__track`" fill="none" :cx="center" :cy="center" :r="radius"
        :stroke-width="mergedPathStrokeWidth" :style="{
          stroke: trackColor,
        }" />
      <circle :class="`${ns}__bar`" fill="none" :cx="center" :cy="center" :r="radius" :stroke-width="mergedStrokeWidth"
        :style="barStyle" />
    </svg>
    <div :class="[`${ns}__text`]" v-if="showText">
      <slot name="text" :percent="percent">
        {{ text }}
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import { ProgressSize } from './type'
import { getNamespace } from '../../../utils/global-config';
import { isFunction, isString } from '../../../utils/is';


const SIZE_MAP = {
  small: 60,
  normal: 80,
  large: 100,
};

const DEFAULT_STROKE_MAP = {
  small: 2,
  normal: 3,
  large: 4,
};

export default defineComponent({
  name: 'ProgressCircle',
  props: {
    percent: {
      type: Number,
      default: 0,
    },
    type: {
      type: String,
    },
    size: {
      type: String as PropType<ProgressSize>,
      default: 'normal',
    },
    strokeWidth: {
      type: Number,
    },
    width: {
      type: Number,
      default: undefined,
    },
    color: {
      type: [String, Function],
      default: undefined,
    },
    trackColor: String,
    status: {
      type: String,
      default: undefined,
    },
    showText: {
      type: Boolean,
      default: true,
    },
    formatText: Function

  },
  setup(props) {

    const ns = getNamespace('progress-circle')

    const cls = computed(() => [
      ns
    ])


    const mergedWidth = computed(() => {
      return props.width ?? SIZE_MAP[props.size];
    });


    const mergedStrokeWidth = computed(
      () =>
        props.strokeWidth ?? DEFAULT_STROKE_MAP[props.size]
    );



    const mergedPathStrokeWidth = computed(
      () => Math.max(2, mergedStrokeWidth.value - 2)
    );

    const radius = computed(
      () => (mergedWidth.value - mergedStrokeWidth.value) / 2
    );

    const perimeter = computed(() => Math.PI * 2 * radius.value);

    const center = computed(() => mergedWidth.value / 2);

    const text = computed(() => {
      if(isFunction(props.formatText)) {
        return props.formatText(props.percent)
      }
      return props.percent + '%'
    })

    const getStrokeDashoffset = (percent:number,perimeter:number) => {      
      const offset = (100 - percent) * perimeter / 100
      return offset
    }


    
    const getStroke = (color:any,status:any) => {
      if(isString(color)) {
        return props.color
      }

      if(isFunction(color)) {
        return color(props.percent) as string
      }

      if(status) {
        return `var(--bn-${status})`
      }
      
      return ''

    }

    const barStyle = computed(() => {
      const style = {
        stroke: getStroke(props.color,props.status),
        strokeDasharray: perimeter.value,
        strokeDashoffset: getStrokeDashoffset(props.percent,perimeter.value),
      }
      return style as any
    })

    return {
      ns,
      cls,
      radius,
      text,
      center,
      mergedWidth,
      mergedStrokeWidth,
      mergedPathStrokeWidth,
      barStyle,
    };
  },
});
</script>