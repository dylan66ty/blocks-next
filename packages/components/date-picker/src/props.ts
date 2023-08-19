import { definePropType } from '../../../utils/vue-utils'
import type { DateType } from './types'

export const datePickerProps = {
  modelValue: {
    type: [String, Date, Array, Number],
    default: undefined
  },
  type: {
    type: definePropType<DateType>(String),
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
    type: definePropType<'small' | 'default' | 'large'>(String),
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
    type: definePropType<0 | 1 | 2 | 3 | 4 | 5 | 6>(Number),
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
    type: definePropType<(date: Date) => boolean>(Function),
    default: undefined
  },
  validateEvent: {
    type: Boolean,
    default: true
  },
  popupClass: {
    type: String,
    default: undefined
  },
  card: {
    type: Boolean,
    default: false
  }
}
