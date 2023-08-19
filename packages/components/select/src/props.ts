import type { ExtractPropTypes } from 'vue'
import { definePropType } from '../../../utils/vue-utils'

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
    type: definePropType<'small' | 'default' | 'large'>(String),
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
    type: definePropType<'off' | 'no'>(String),
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
  },
  card: {
    type: Boolean,
    default: false
  }
}

export type SelectProps = ExtractPropTypes<typeof selectProps>
