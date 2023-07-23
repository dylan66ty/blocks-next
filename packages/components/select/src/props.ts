import type { PropType, ExtractPropTypes } from 'vue'
export const selectProps = {
  modelValue: {
    type: [String, Number, Array],
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
  popupClass: {
    type: String,
    default: undefined
  },
  size: {
    type: String as PropType<'small' | 'default' | 'large'>,
    default: 'default'
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
  },
  filterable: {
    type: Boolean,
    default: false
  },
  filterMethod: {
    type: Function,
    default: undefined
  },
  remote: {
    type: Boolean,
    default: false
  },
  remoteMethod: {
    type: Function,
    default: undefined
  },
  filterDebounce: {
    type: Number,
    default: 300
  }
}

export type SelectProps = ExtractPropTypes<typeof selectProps>
