<script lang="ts">
  import { computed, defineComponent } from 'vue'
  import type { PropType, StyleValue } from 'vue'
  import { getComponentNamespace, getNamespace } from '../../../utils/global-config'
  import Trigger from '../../trigger'
  import { addUnit } from '../../../shared/utils'
  import type { TriggerPosition } from '../../trigger/src/_trigger'
  import { isUndefined } from '../../../utils/is'

  export default defineComponent({
    name: getComponentNamespace('Popup'),
    components: {
      Trigger
    },
    props: {
      trigger: {
        type: String as PropType<'click' | 'hover'>,
        default: 'click'
      },
      minWidth: {
        type: [String, Number],
        default: 150
      },
      width: {
        type: [String, Number],
        default: 'auto'
      },
      placement: {
        type: String as PropType<TriggerPosition>,
        default: 'bottom'
      },
      showArrow: {
        type: Boolean,
        default: false
      },
      contentClass: {
        type: String,
        default: undefined
      },
      offset: {
        type: Number,
        default: undefined
      },
      disabled: {
        type: Boolean,
        default: false
      }
    },
    emits: ['show', 'hide'],
    setup(props) {
      const ns = getNamespace('popup')

      const contentCls = computed(() => [`${ns}__content`, props.contentClass])

      const contentStyle = computed(() => {
        const style: StyleValue = {}
        style.minWidth = addUnit(props.minWidth)
        style.width = addUnit(props.width)
        return style
      })

      const arrowStyle = computed(() => {
        const style: Record<string, string> = {
          '--bn-trigger-arrow-background-color': '#fff'
        }

        return style
      })

      const computedOffset = computed(() => {
        if (isUndefined(props.offset) && props.showArrow) return 12
        if (isUndefined(props.offset)) return 6
        return props.offset
      })

      return {
        ns,
        contentCls,
        contentStyle,
        arrowStyle,
        computedOffset
      }
    }
  })
</script>

<template>
  <Trigger
    :trigger="trigger"
    :position="placement"
    :show-arrow="showArrow"
    :popup-offset="computedOffset"
    :arrow-style="arrowStyle"
    :disabled="disabled"
    @show="$emit('show')"
    @hide="$emit('hide')"
  >
    <template #default>
      <slot name="trigger"></slot>
    </template>
    <template #content>
      <div :class="contentCls" :style="contentStyle">
        <slot name="content"></slot>
      </div>
    </template>
  </Trigger>
</template>
