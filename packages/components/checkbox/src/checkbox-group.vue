<script lang="ts">
  import { defineComponent, computed, provide, watch } from 'vue'
  import { getNamespace, getComponentNamespace } from '../../../utils/global-config'
  import { useFormItem } from '../../form/src/hooks/use-form-item'
  import { NOOP } from '../../../shared/utils'
  import { checkboxGroupContextKey } from './constant'

  export default defineComponent({
    name: getComponentNamespace('CheckboxGroup'),
    props: {
      // eslint-disable-next-line vue/require-default-prop
      modelValue: Array,
      validateEvent: {
        type: Boolean,
        default: true
      }
    },
    emits: ['change', 'update:modelValue'],
    setup(props, ctx) {
      const modelValue = computed(() => props.modelValue)
      const changeEvent = (val: any) => {
        ctx.emit('update:modelValue', val)
        ctx.emit('change', val)
      }

      const ns = getNamespace('checkbox-group')

      const cls = computed(() => {
        return [ns]
      })

      const { formItem } = useFormItem()

      provide(checkboxGroupContextKey, {
        modelValue,
        changeEvent
      })

      watch(
        () => props.modelValue,
        () => {
          if (props.validateEvent) {
            formItem?.validate('change').catch(NOOP)
          }
        }
      )

      return {
        cls
      }
    }
  })
</script>

<template>
  <div :class="cls">
    <slot></slot>
  </div>
</template>
