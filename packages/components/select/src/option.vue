<script lang="ts">
  import { computed, defineComponent, inject, getCurrentInstance, ref, onBeforeUnmount } from 'vue'
  import { getComponentNamespace, getNamespace } from '../../../utils/global-config'
  import { isObject } from '../../../utils/is'
  import { selectKey } from './constant'
  import type { SelectOptionProxy } from './types'

  export default defineComponent({
    name: getComponentNamespace('Option'),
    props: {
      value: {
        required: true,
        type: [String, Number, Boolean, Object]
      },
      label: {
        type: [String, Number],
        default: ''
      },
      disabled: {
        type: Boolean,
        default: false
      }
    },
    setup(props) {
      const ns = getNamespace('select-menu')

      // 维护option状态
      const isHover = ref(false)

      // select上下文
      const selectContext = inject(selectKey)!

      const valueIsObject = computed(() => {
        return isObject(props.value)
      })

      const itemSelected = computed(() => {
        if (!selectContext.props.multiple) {
          if (!valueIsObject.value) {
            return props.value === selectContext.props.modelValue
          } else {
            return false
          }
        } else {
          // 多选
          return false
        }
      })

      const cls = computed(() => {
        return [
          `${ns}__item`,
          props.disabled && `is-disabled`,
          itemSelected.value && 'is-selected',
          isHover.value && 'is-hover'
        ]
      })

      const currentLabel = computed(() => {
        return props.label
      })

      const currentValue = computed(() => {
        return props.value
      })

      const vm = getCurrentInstance()?.proxy

      selectContext.optionItemCreate(vm as unknown as SelectOptionProxy)

      const hoverItem = () => {
        if (!props.disabled) {
          selectContext.optionsItemHoverIndexChange(vm as any)
        }
      }

      const selectOptionClick = () => {
        if (props.disabled) return
        selectContext.handleOptionSelect(vm as any, true)
      }

      onBeforeUnmount(() => {
        const key = (vm as unknown as SelectOptionProxy).currentValue
        // const { selected } = selectContext
        // const selectedOptions = selectContext.props.multiple ? selected : [selected]
        // const doesSelected = selectedOptions.some((item) => {
        //   return item.value === (vm as unknown as SelectOptionProxy).value
        // })
        // // if option is not selected, remove it from cache
        // nextTick(() => {
        //   if (select.cachedOptions.get(key) === vm && !doesSelected) {
        //     select.cachedOptions.delete(key)
        //   }
        // })
        selectContext.optionItemDestroy(key, vm as any)
      })

      return {
        cls,
        currentLabel,
        currentValue,
        hoverItem,
        selectOptionClick,
        isHover
      }
    }
  })
</script>

<template>
  <div :class="cls" @mouseenter="hoverItem" @click.stop="selectOptionClick">
    <slot>
      <span>{{ currentLabel }}</span>
    </slot>
  </div>
</template>
