<script lang="ts">
  import { defineComponent, inject, computed, ref, watch } from 'vue'
  import { getNamespace, getComponentNamespace } from '../../../utils/global-config'
  import { useFormItem } from '../../form/src/hooks/use-form-item'
  import { NOOP } from '../../../shared/utils'
  import { checkboxGroupContextKey } from './constant'
  import { checkboxProps } from './props'
  import RenderIcon from './icon'

  import type { CheckboxGroupContext } from './types'

  export default defineComponent({
    name: getComponentNamespace('Checkbox'),
    components: {
      RenderIcon
    },
    props: checkboxProps,
    emits: ['update:modelValue', 'change'],
    setup(props, { emit, slots }) {
      const ns = getNamespace('checkbox')
      const checkboxGroup = inject<CheckboxGroupContext | null>(checkboxGroupContextKey, null)
      const isGroup = computed(() => !!checkboxGroup)
      const selfModel = ref<boolean>(false)

      const model = computed({
        get() {
          return isGroup.value
            ? checkboxGroup?.modelValue?.value
            : props.modelValue ?? selfModel.value
        },
        set(val) {
          if (isGroup.value) {
            checkboxGroup?.changeEvent?.(val)
          } else {
            emit('update:modelValue', val)
            selfModel.value = val
          }
        }
      })

      const isChecked = computed(() => {
        const value = model.value
        if (Array.isArray(value)) {
          return value.includes(props.label)
        }
        return value
      })

      const isFocused = ref(false)

      const { formItem } = useFormItem()

      const cls = computed(() => {
        const cls = [ns]
        props.disabled && cls.push('is-disabled')
        if (isGroup.value) {
          isChecked.value && cls.push('is-checked')
        } else {
          props.modelValue && cls.push('is-checked')
        }

        if (props.indeterminate && !props.modelValue) {
          cls.push('is-indeterminate')
        }

        if (isFocused.value) {
          cls.push('is-focus')
        }

        return cls
      })

      const isShowLabel = computed(() => slots['default'] || props.label)

      const handleChange = (e: InputEvent) => {
        const target = e.target as HTMLInputElement
        const changeValue = target.checked
        emit('change', changeValue)
      }

      const validateEvent = computed(() => checkboxGroup?.validateEvent || props.validateEvent)

      // 接入form-item的表单验证
      watch(
        () => props.modelValue,
        () => {
          if (validateEvent.value) {
            formItem?.validate('change').catch(NOOP)
          }
        }
      )

      return {
        ns,
        cls,
        handleChange,
        model,
        isChecked,
        isFocused,
        isShowLabel
      }
    }
  })
</script>

<template>
  <label :class="cls">
    <slot name="icon" :checked="isChecked" :indeterminate="indeterminate">
      <RenderIcon :is-checked="isChecked" :indeterminate="indeterminate" />
    </slot>
    <span :class="[`${ns}__input`]">
      <input
        v-model="model"
        :class="[`${ns}__origin`]"
        type="checkbox"
        :name="name"
        :disabled="disabled"
        :checked="isChecked"
        :indeterminate="indeterminate"
        :value="label"
        @change="handleChange"
        @focus="isFocused = true"
        @blur="isFocused = false"
      />
    </span>
    <span v-if="isShowLabel" :class="[`${ns}__label`]">
      <slot>{{ label }}</slot>
    </span>
  </label>
</template>
