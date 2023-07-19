<script lang="ts">
  import {
    computed,
    defineComponent,
    getCurrentInstance,
    inject,
    onMounted,
    onUnmounted
  } from 'vue'
  import { getComponentNamespace, getNamespace } from '../../../utils/global-config'
  import { isUndefined } from '../../../utils/is'
  import { dropdownContextKey } from './context'

  export default defineComponent({
    name: getComponentNamespace('DropdownItem'),
    props: {
      disabled: {
        type: Boolean,
        default: false
      },
      command: {
        type: [String, Number],
        default: undefined
      },
      divided: {
        type: Boolean,
        default: false
      },
      label: {
        type: [String, Number, Object],
        default: undefined
      }
    },
    setup(props) {
      const ns = getNamespace('dropdown-item')
      const dropdownContext = inject(dropdownContextKey)
      const selected = computed(
        () => dropdownContext?.command === props.command && !isUndefined(props.command)
      )
      const cls = computed(() => [
        ns,
        props.disabled && 'is-disabled',
        selected.value && 'is-selected',
        `${ns}--${dropdownContext?.size}`
      ])
      const proxy = getCurrentInstance()?.proxy as any
      const handleDropdownItem = () => {
        dropdownContext?.handleDropdownItem(proxy)
      }

      onMounted(() => {
        if (!isUndefined(props.command)) {
          dropdownContext?.dropdownItemCreate(proxy)
        }
      })

      onUnmounted(() => {
        if (!isUndefined(props.command)) {
          dropdownContext?.dropdownItemDestroy(proxy)
        }
      })

      return {
        ns,
        cls,
        handleDropdownItem
      }
    }
  })
</script>

<template>
  <div :class="cls" @click="handleDropdownItem">
    <slot>
      {{ label }}
    </slot>
  </div>
</template>
