import type { PropType, ExtractPropTypes } from 'vue'
export const dialogProps = {
  renderTo: {
    type: [String, Object] as PropType<string | HTMLElement>,
    default: 'body',
  },
  disabled: {
    type:Boolean,
    default:false
  },
  modelValue: {
    type:Boolean,
    default: false
  },
  top:{
    type: [String,Number],
    default: '3vh'
  },
  center: {
    type:Boolean,
    default: false
  },
  width: {
    type:[String,Number],
    default:0
  },
  height:{
    type:[String,Number],
    default:0
  },
  minWidth: {
    type: [String,Number],
    default: 0
  },
  minHeight:{
    type:[String,Number],
    default:0
  },
  title: {
    type:String,
    default:''
  },
  mask: {
    type:Boolean,
    default:true
  },
  // 关闭时卸载
  destroyOnClosed: {
    type:Boolean,
    default:true
  },
  // 关闭前回调检查是否可以关闭
  onBeforeCancel:{
    type:Function
  },
  // 是否点击遮罩层关闭
  maskToClose: {
    type:Boolean,
    default: true
  },
  // esc键关闭
  escToClose:{
    type:Boolean,
    default: true
  },
  // 全屏
  fullscreen: {
    type:Boolean,
    default:false
  },
  // 是否是messageBox
  messageBox: {
    type:Boolean,
    default: false
  },
  popupClass: {
    type:String,
    default: undefined
  }
}


export type DialogProps = ExtractPropTypes<typeof dialogProps>

