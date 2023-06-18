<script lang="ts">
  import { computed, defineComponent } from 'vue'
  import { getComponentNamespace, getNamespace } from '../../../utils/global-config'
  import { isNumber } from '../../../utils/is'
  import { badgeProps } from './props'

  export default defineComponent({
    name: getComponentNamespace('Badge'),
    props: badgeProps,
    setup(props) {
      const ns = getNamespace('badge')

      const contentCls = computed(() => [
        `${ns}__content`,
        props.effect && `is-${props.effect}`,
        props.type && `${ns}--${props.type}`,
        props.isDot && 'is-dot'
      ])

      const content = computed<string>(() => {
        if (props.isDot) return ''
        const value = props.value
        const max = props.max
        if (isNumber(value) && isNumber(max)) {
          return value > max ? `${max}+` : `${value}`
        }
        return `${value}`
      })

      return {
        ns,
        contentCls,
        content
      }
    }
  })
</script>

<template>
  <div :class="[ns]">
    <slot></slot>
    <span v-show="!hidden && (content || isDot)" :class="contentCls">
      {{ content }}
    </span>
  </div>
</template>
