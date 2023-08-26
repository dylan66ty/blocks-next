import type { ExtractPropTypes } from 'vue'
import { definePropType } from '../../../utils/vue-utils'

const nativeProps = {
  autocomplete: {
    type: definePropType<'off' | 'on'>(String),
    default: 'off'
  },
  name: {
    type: String,
    default: ''
  },
  readonly: {
    type: Boolean,
    default: false
  },
  autofocus: {
    type: Boolean,
    default: false
  },
  form: {
    type: String,
    default: undefined
  }
}

export const inputProps = {
  modelValue: {
    type: String,
    default: undefined
  },
  type: {
    type: definePropType<'text' | 'textarea'>(String),
    default: 'text'
  },
  placeholder: {
    type: String,
    default: '请输入'
  },
  disabled: {
    type: Boolean,
    default: false
  },
  size: {
    type: definePropType<'small' | 'default' | 'large'>(String),
    default: 'default'
  },
  showPassword: {
    type: Boolean,
    default: false
  },
  resize: {
    type: Boolean,
    default: false
  },
  prefixIcon: {
    type: String,
    default: ''
  },
  suffixIcon: {
    type: String,
    default: ''
  },
  autosize: {
    type: definePropType<{ minRows: number; maxRows: number } | boolean>([Object, Boolean]),
    default: false
  },
  // 过滤器
  formatter: {
    type: Function,
    default: undefined
  },
  //form表单验证相关
  validateEvent: {
    type: Boolean,
    default: true
  },
  clearable: {
    type: Boolean,
    default: false
  },
  card: {
    type: Boolean,
    default: false
  },
  maxlength: {
    type: [String, Number],
    default: undefined
  },
  showWordLimit: {
    type: Boolean,
    default: false
  },
  // 原生input属性
  ...nativeProps
}

export type InputProps = ExtractPropTypes<typeof inputProps>
