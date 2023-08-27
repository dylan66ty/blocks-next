import type { ExtractPropTypes } from 'vue'
import { definePropType } from '../../../utils/vue-utils'
import type { Placement } from './types'

export const drawerProps = {
  disabled: {
    type: Boolean,
    default: false
  },
  modelValue: {
    type: Boolean,
    default: false
  },
  placement: {
    type: definePropType<Placement>(String),
    default: 'right'
  },
  title: {
    type: String,
    default: ''
  },
  mask: {
    type: Boolean,
    default: true
  },
  showFooter: {
    type: Boolean,
    default: true
  },
  // 是否点击遮罩层关闭
  maskToClose: {
    type: Boolean,
    default: true
  },
  // esc键关闭
  escToClose: {
    type: Boolean,
    default: true
  },
  destroyOnClosed: {
    type: Boolean,
    default: true
  },
  width: {
    type: [Number, String],
    default: 340
  },
  height: {
    type: [Number, String],
    default: 340
  },
  okText: {
    type: String,
    default: ''
  },
  cancelText: {
    type: String,
    default: ''
  },
  onBeforeOk: {
    type: definePropType<() => boolean | Promise<boolean>>(Function)
  },
  onBeforeCancel: {
    type: definePropType<() => boolean | Promise<boolean>>(Function)
  },
  renderTo: {
    type: definePropType<string | HTMLElement>([String, Object]),
    default: 'body'
  },
  popupClass: {
    type: String,
    default: undefined
  }
}

export type DrawerProps = ExtractPropTypes<typeof drawerProps>
