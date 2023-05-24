import type { ExtractPropTypes, PropType } from 'vue'
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
    type: String as PropType<Placement>,
    default: 'right'
  },
  title: {
    type:String,
    default: ''
  },
  mask: {
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
    default: 340,
  },
  height: {
    type: [Number, String],
    default: 340,
  },
  okText: {
    type:String,
    default: ''
  },
  cancelText:{
    type:String,
    default: ''
  },
  onBeforeOk: {
    type: Function as PropType<() => boolean | Promise<boolean>>,
  },
  onBeforeCancel: {
    type: Function as PropType<() => boolean | Promise<boolean>>,
  },
  renderTo: {
    type: [String, Object] as PropType<string | HTMLElement>,
    default: 'body',
  },
}


export type DrawerProps = ExtractPropTypes<typeof drawerProps>