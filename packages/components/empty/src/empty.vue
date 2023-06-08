<template>
  <div :class="cls">
    <div :class="[`${ns}__image`]">
      <slot name="image">
        <svg xmlns="http://www.w3.org/2000/svg" :style="imageStyle" viewBox="0 0 244 120"
          version="1.1">
          <defs>
            <linearGradient x1="50%" y1="0%" x2="50%" y2="50%" id="linearGradient-1">
              <stop stop-color="#CAD5EB" offset="0%" />
              <stop stop-color="#ECEFF6" stop-opacity="0" offset="99.9289773%" />
            </linearGradient>
            <linearGradient x1="34.5854478%" y1="9.89324279%" x2="67.8456655%" y2="94.5431915%" id="linearGradient-2">
              <stop stop-color="#A1AFCB" offset="0.0628277972%" />
              <stop stop-color="#D8E0EE" offset="100%" />
            </linearGradient>
            <linearGradient x1="16.7449114%" y1="74.7991872%" x2="75.8928571%" y2="30.6222098%" id="linearGradient-3">
              <stop stop-color="#A4B2CD" offset="0%" />
              <stop stop-color="#E4EAF6" offset="100%" />
            </linearGradient>
          </defs>
          <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <g transform="translate(-813.000000, -420.000000)">
              <g transform="translate(813.000000, 420.000000)">
                <path
                  d="M122,57 C167.975908,57 210.137771,65.1649368 243.001892,78.7529633 L242.999106,120 L-0.000894347329,120 L-0.00363654132,79.1700316 C32.2576315,65.6448296 73.6376675,57.3793167 118.858003,57.0127273 Z"
                  fill="url(#linearGradient-1)" opacity="0.15" />
                <path
                  d="M134,-7.34788079e-16 L148,14 L148,66 C148,68.209139 146.209139,70 144,70 L100,70 C97.790861,70 96,68.209139 96,66 L96,4 C96,1.790861 97.790861,1.75292373e-15 100,1.34711148e-15 L134,-7.34788079e-16 Z M129,31 L106,31 L106,34 L129,34 L129,31 Z M129,24 L106,24 L106,27 L129,27 L129,24 Z M114,17 L106,17 L106,20 L114,20 L114,17 Z"
                  fill="url(#linearGradient-2)" opacity="0.5" />
                <path d="M134,0 L148,14 L138,14 C135.790861,14 134,12.209139 134,10 L134,0 L134,0 Z"
                  fill="url(#linearGradient-3)" opacity="0.5" />
              </g>
            </g>
          </g>
        </svg>
      </slot>
    </div>
    <div :class="[`${ns}__description`]">
      <slot name="description">
        {{ description }}
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { StyleValue, computed, defineComponent } from 'vue'
import { getComponentNamespace, getNamespace } from '../../../utils/global-config'
import { addUnit } from '../../../shared/utils'
import { isArray, isNumber } from '../../../utils/is'

export default defineComponent({
  name: getComponentNamespace('Empty'),
  props: {
    iconSize: {
      type: [Number,Array],
      default: [240,120]
    },
    description: {
      type: [String, Number],
      default: '暂无数据'
    }
  },
  setup(props) {
    const ns = getNamespace('empty')
    const cls = computed(() => [
      ns
    ])

    const imageStyle = computed(() => {
      const style: StyleValue = {}
      const iconSize = props.iconSize
      if(isArray(iconSize)) {
        const w = addUnit(iconSize[0] as number)
        const h = addUnit(iconSize[1] as number) || w
        style.width = w
        style.height = h
      }else {
        const size = addUnit(iconSize)
        style.width = size
        style.height = size
      }
      
      return style
    })

    return {
      ns,
      cls,
      imageStyle
    }
  }
})
</script>