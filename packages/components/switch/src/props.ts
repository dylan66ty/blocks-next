import type { PropType, ExtractPropTypes } from 'vue'

export const switchProps = {
  modelValue: {
    type: [Boolean, String, Number],
    default: false
  },
  value: {
    type: [Boolean, String, Number],
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  width: {
    type: [String, Number],
    default: ''
  },
  activeText: {
    type: String,
    default: ''
  },
  inactiveText: {
    type: String,
    default: ''
  },
  activeColor: {
    type: String,
    default: undefined
  },
  inactiveColor: {
    type: String,
    default: undefined
  },
  trueValue: {
    type: [Boolean, String, Number],
    default: true
  },
  falseValue: {
    type: [Boolean, String, Number],
    default: false
  },
  beforeChange: {
    type: Function as PropType<() => Promise<boolean> | boolean>
  },
  type: {
    type: String as PropType<'line' | 'circle'>,
    default: 'circle'
  },
  inlinePrompt: {
    type: Boolean,
    default: false
  },
  name: {
    type: String,
    default: ''
  },
  validateEvent: {
    type: Boolean,
    default: true
  }
}

export type SwitchProps = ExtractPropTypes<typeof switchProps>
