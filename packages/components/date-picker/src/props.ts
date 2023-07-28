import type { PropType } from 'vue'
import type { DateType } from './types'

export const datePickerProps = {
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

  validateEvent: {
    type: Boolean,
    default: true
  },
  popupClass: {
    type: String,
    default: undefined
  }
}
