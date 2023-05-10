<template>
  <div :class="cls">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, provide } from 'vue'
import { getNamespaced } from '../../../utils/global-config'

export default defineComponent({
  name: 'RadioGroup',
  props: {
    modelValue: Array,
    default: () => []
  },
  emits: ['change', 'update:modelValue'],
  setup(props, ctx) {
    const modelValue = computed(() => props.modelValue);
    const changeEvent = (val:any) => {
      ctx.emit('change', val)
      ctx.emit('update:modelValue', val)
    }

    const ns = getNamespaced('radio-group')

    const cls = computed(() => {
      return [
        ns
      ]
    })

    provide('BnRadioGroup', {
      modelValue,
      changeEvent,
      name: 'BnRadioGroup'
    })

    return {
      cls
    }

  }

})
</script>