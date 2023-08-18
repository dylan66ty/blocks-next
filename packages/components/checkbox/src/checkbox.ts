import type { ExtractPropTypes } from 'vue'

export const checkboxProps = {
  indeterminate: Boolean,
  checked: Boolean,
  disabled: Boolean,
  label: {
    type: [String, Number, Boolean],
    default: ''
  },
  modelValue: [String, Number, Boolean],
  // native
  name: {
    type: String
  },
  //form表单验证相关
  validateEvent: {
    type: Boolean,
    default: true
  }
} as const

export type CheckboxProps = ExtractPropTypes<typeof checkboxProps>
