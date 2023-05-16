import type { PropType, ExtractPropTypes } from 'vue';
export const selectProps = {
  modelValue: {
    type: [Array, String, Number, Boolean, Object],
    default: undefined,
  },
  multiple: Boolean,
  loading: Boolean,
  loadingText: {
    type: String,
    default: '加载中',
  },
  noDataText: {
    type: String,
    default: '暂无数据',
  },
  noMatchText: {
    type: String,
    default: '暂无匹配项',
  },
  valueKey: {
    type: String,
    default: 'value',
  },
  labelKey: {
    type: String,
    default: 'label',
  },
  popperClass: {
    type: String,
    default: '',
  },
  size: {
    type: String as PropType<'small' | 'normal' | 'large'>,
    default: '',
  },
  placeholder: {
    type: String,
    default: '请选择',
  },
  disabled: Boolean,
  // input native
  name: {
    type: String,
    default: '',
  },
  autocomplete: {
    type: String as PropType<'off' | 'no'>,
    default: 'off',
  },
  //表单验证
  validateEvent: Boolean,
};

export type InputProps = ExtractPropTypes<typeof selectProps>;
