import type { PropType, ExtractPropTypes } from 'vue';

const nativeProps = {
  autocomplete: {
    type: String as PropType<'off' | 'on'>,
    default: 'off',
  },
  name: {
    type: String as PropType<string>,
    default: '',
  },
  readonly: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
  autofocus: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
  form: {
    type: String as PropType<string>,
    default: '',
  },
};

export const inputProps = {
  modelValue: [String, Number] as PropType<string | number>,
  type: {
    type: String as PropType<'text' | 'textarea' | string>,
    default: 'text',
  },
  placeholder: String as PropType<string>,
  disabled: Boolean as PropType<boolean>,
  error: Boolean as PropType<boolean>,
  size: String as PropType<string>,
  showPassword: Boolean as PropType<boolean>,
  resize: Boolean as PropType<boolean>,
  prefixIcon: {
    type: String as PropType<string>,
    default: '',
  },
  suffixIcon: {
    type: String as PropType<string>,
    default: '',
  },
  throttle: {
    type: Number as PropType<number>,
    default: 0,
  },
  autosize: {
    type: [Object, Boolean] as PropType<{ minRows: number; maxRows: number } | boolean>,
    default: false,
  },
  // 过滤器
  formatter: {
    type: Function,
  },
  //form表单验证相关
  validateEvent: {
    type: Boolean,
    default: true,
  },

  // 原生input属性
  ...nativeProps,
} as const;

export type InputProps = ExtractPropTypes<typeof inputProps>;