import type { PropType } from 'vue'
import type { DateType } from './types'

export const datePickerProps = {
  modelValue: {
    type: [String, Date, Array, Number],
    default: undefined
  },
  type: {
    type: String as PropType<DateType>,
    default: 'date'
  },
  disabled: {
    type: Boolean,
    default: false
  },
  placeholder: {
    type: String,
    default: '请选择'
  },
  size: {
    type: String as PropType<'small' | 'default' | 'large'>,
    default: 'default'
  },
  clearable: {
    type: Boolean,
    default: false
  },
  rangeSeparator: {
    type: String,
    default: '~'
  },
  dayStartOfWeek: {
    type: Number as PropType<0 | 1 | 2 | 3 | 4 | 5 | 6>,
    default: 1
  },
  modelValueFormat: {
    type: String,
    default: undefined
  },
  inputLabelFormat: {
    type: String,
    default: undefined
  },
  disabledDate: {
    type: Function as PropType<(date: Date) => boolean>,
    default: undefined
  },
  validateEvent: {
    type: Boolean,
    default: true
  },
  popupClass: {
    type: String,
    default: undefined
  }
}
