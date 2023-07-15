import type { PropType, ExtractPropTypes } from 'vue'
export const selectProps = {
  modelValue: {
    type: [Array, String, Number, Boolean, Object],
    default: undefined
  },
  multiple: {
    type: Boolean,
    default: false
  },
  loading: {
    type: Boolean,
    default: false
  },
  clearable: {
    type: Boolean,
    default: false
  },
  loadingText: {
    type: String,
    default: '加载中'
  },
  noDataText: {
    type: String,
    default: '暂无数据'
  },
  noMatchText: {
    type: String,
    default: '暂无匹配项'
  },
  popperClass: {
    type: String,
    default: ''
  },
  size: {
    type: String as PropType<'small' | 'default' | 'large'>,
    default: ''
  },
  placeholder: {
    type: String,
    default: '请选择'
  },
  disabled: Boolean,
  // input native
  name: {
    type: String,
    default: ''
  },
  autocomplete: {
    type: String as PropType<'off' | 'no'>,
    default: 'off'
  },
  //表单验证
  validateEvent: {
    type: Boolean,
    default: true
  }
}

export type SelectProps = ExtractPropTypes<typeof selectProps>
