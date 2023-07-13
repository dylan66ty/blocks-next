import type { PropType, ExtractPropTypes } from 'vue'

const nativeProps = {
  autocomplete: {
    type: String as PropType<'off' | 'on'>,
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
    default: ''
  }
}

export const inputProps = {
  modelValue: {
    type: [String, Number] as PropType<string | number>,
    default: undefined
  },
  value: {
    type: [String, Number] as PropType<string | number>,
    default: ''
  },
  type: {
    type: String as PropType<'text' | 'textarea'>,
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
    type: String as PropType<'small' | 'default' | 'large'>,
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
    type: [Object, Boolean] as PropType<{ minRows: number; maxRows: number } | boolean>,
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
