import type { PropType } from 'vue'
import type { CascaderData } from './type'

export const cascaderProps = {
  data: {
    type: Array as PropType<CascaderData>,
    default: () => []
  },
  modelValue: {
    type: [Array] as PropType<string[] | string[][]>,
    default: undefined
  },
  multiple: {
    type: Boolean,
    default: false
  },
  checkStrictly: {
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
  disabled: {
    type: Boolean,
    default: false
  },
  // 输入框格式化函数
  inputLabelFormat: {
    type: Function as PropType<(labels: string[]) => string>,
    default: undefined
  },
  separator: {
    type: String,
    default: '/'
  },
  showFooter: Boolean,
  expandChild: {
    type: Boolean,
    default: false
  },
  // 表单验证
  validateEvent: {
    type: Boolean,
    default: true
  },
  popupClass: {
    type: String,
    default: undefined
  }
}
