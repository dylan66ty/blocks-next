import type { PropType } from 'vue'
import type { Position, PopconfirmTypes } from './types'

export const popconfirmProps = {
  modelValue: {
    type: Boolean,
    default: undefined
  },
  disabled: {
    type: Boolean,
    default: false
  },
  width: {
    type: [String, Number],
    default: 200
  },
  type: {
    type: String as PropType<PopconfirmTypes>,
    default: 'danger'
  },
  content: [String, Number],
  position: {
    type: String as PropType<Position>,
    default: 'top'
  },
  okText: {
    type: String,
    default: '确认'
  },
  cancelText: {
    type: String,
    default: '取消'
  },
  // 点击ok前拦截
  onBeforeOk: {
    type: Function as PropType<(e: Event) => boolean | Promise<boolean>>,
    default: undefined
  },
  // 点击cancel前拦截
  onBeforeCancel: {
    type: Function as PropType<(e: Event) => boolean | Promise<boolean>>,
    default: undefined
  },
  renderTo: {
    type: [String, Object] as PropType<string | HTMLElement>
  },
  popupClass: String
}
