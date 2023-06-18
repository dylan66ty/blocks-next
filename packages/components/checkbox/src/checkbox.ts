import type { PropType, ExtractPropTypes } from 'vue'

export const checkboxProps = {
  indeterminate: Boolean as PropType<boolean>,
  checked: Boolean as PropType<boolean>,
  disabled: Boolean as PropType<boolean>,
  label: {
    type: [String, Number, Boolean] as PropType<string | number | boolean>,
    default: ''
  },
  modelValue: [String, Number, Boolean] as PropType<string | number | boolean>,
  // native
  name: {
    type: String as PropType<string>
  },
  //form表单验证相关
  validateEvent: {
    type: Boolean,
    default: true
  }
} as const

export type CheckboxProps = ExtractPropTypes<typeof checkboxProps>
