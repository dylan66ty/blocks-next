<template>
  <div :class="cls">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, provide } from 'vue'
import type { IModelValue } from './types'
import { getNamespaced } from '../../../utils/global-config'

export default defineComponent({
  name: 'CheckboxGroup',
  props: {
    modelValue: Array,
    default: () => []
  },
  emits: ['change', 'update:modelValue'],
  setup(props, ctx) {
    const modelValue = computed(() => props.modelValue);
    const changeEvent = (val: IModelValue) => {
      ctx.emit('change', val)
      ctx.emit('update:modelValue', val)
    }

    const ns = getNamespaced('checkbox-group')

    const cls = computed(() => {
      return [
        ns
      ]
    })

    provide('BnCheckboxGroup', {
      modelValue,
      changeEvent,
      name: 'BnCheckboxGroup'
    })

    return {
      cls
    }

  }

})
</script>