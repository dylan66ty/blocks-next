import type { PropType, ExtractPropTypes, CSSProperties } from 'vue'

export const TRIGGER_POSITIONS = [
  'top',
  'tl',
  'tr',
  'bottom',
  'bl',
  'br',
  'left',
  'lt',
  'lb',
  'right',
  'rt',
  'rb'
] as const
export type TriggerPosition = (typeof TRIGGER_POSITIONS)[number]

export const TRIGGER_EVENTS = ['hover', 'click', 'focus', 'contextMenu'] as const
export type TriggerEvent = (typeof TRIGGER_EVENTS)[number]

export type TriggerPopupTranslate =
  | [number, number]
  | { [key in TriggerPosition]?: [number, number] }

export const triggerProps = {
  // 弹出框是否可见
  popupVisible: {
    type: Boolean,
    default: undefined
  },
  // 弹出框默认是否可见（非受控模式）
  defaultPopupVisible: {
    type: Boolean,
    default: false
  },
  /**
   *  触发方式
   * @values 'hover','click','focus','contextMenu'
   */
  trigger: {
    type: [String, Array] as PropType<TriggerEvent | TriggerEvent[]>,
    default: 'hover'
  },
  /**
   *  弹出位置
   * @values 'top','tl','tr','bottom','bl','br','left','lt','lb','right','rt','rb'
   */
  position: {
    type: String as PropType<TriggerPosition>,
    default: 'bottom'
  },
  /**
   *  触发器是否禁用
   */
  disabled: {
    type: Boolean,
    default: false
  },
  /**
   *  弹出框的偏移量（弹出框距离触发器的偏移距离）
   */
  popupOffset: {
    type: Number,
    default: 5
  },
  /**
   *  弹出框的移动距离
   */
  popupTranslate: {
    type: [Array, Object] as PropType<TriggerPopupTranslate>
  },
  /**
   *  弹出框是否显示箭头
   */
  showArrow: {
    type: Boolean,
    default: false
  },
  /**
   *  弹出框是否跟随鼠标
   */
  alignPoint: {
    type: Boolean,
    default: false
  },
  /**
   *  是否在移出触发器，并移入弹出框时保持弹出框显示
   */
  popupHoverStay: {
    type: Boolean,
    default: true
  },
  /**
   *  是否在触发器失去焦点时关闭弹出框
   */
  blurToClose: {
    type: Boolean,
    default: true
  },
  /**
   *  是否在点击触发器时关闭弹出框
   */
  clickToClose: {
    type: Boolean,
    default: true
  },
  /**
   * 是否在点击外部区域时关闭弹出框
   */
  clickOutsideToClose: {
    type: Boolean,
    default: true
  },
  /**
   * 是否在关闭时卸载弹出框节点
   */
  unmountOnClose: {
    type: Boolean,
    default: true
  },
  /**
   * 弹出框内容的类名
   */
  contentClass: {
    type: [String, Array, Object]
  },
  /**
   * 弹出框内容的样式
   */
  contentStyle: {
    type: Object as PropType<CSSProperties>
  },
  /**
   * 弹出框箭头的类名
   */
  arrowClass: {
    type: [String, Array, Object]
  },
  /**
   * 弹出框箭头的样式
   */
  arrowStyle: {
    type: Object as PropType<CSSProperties>
  },
  /**
   *  弹出框的样式
   */
  popupStyle: {
    type: Object as PropType<CSSProperties>
  },
  /**
   * 弹出动画的name
   */
  animationName: {
    type: String,
    default: 'bn-fade-in'
  },
  /**
   * 弹出动画的持续时间
   */
  duration: {
    type: [Number, Object] as PropType<
      | number
      | {
          enter: number
          leave: number
        }
    >
  },
  /**
   * mouseenter事件延时触发的时间（毫秒）
   */
  mouseEnterDelay: {
    type: Number,
    default: 100
  },
  /**
   * mouseleave事件延时触发的时间（毫秒）
   */
  mouseLeaveDelay: {
    type: Number,
    default: 100
  },
  /**
   * focus事件延时触发的时间（毫秒）
   */
  focusDelay: {
    type: Number,
    default: 0
  },
  /**
   * 是否将弹出框宽度设置为触发器宽度
   */
  autoFitPopupWidth: {
    type: Boolean,
    default: false
  },
  /**
   * 是否将弹出框的最小宽度设置为触发器宽度
   */
  autoFitPopupMinWidth: {
    type: Boolean,
    default: false
  },
  /**
   * 当触发器的尺寸发生变化时，是否重新计算弹出框位置
   */
  autoFixPosition: {
    type: Boolean,
    default: true
  },
  /**
   * 弹出框的挂载容器
   */
  popupContainer: {
    type: [String, Object] as PropType<string | HTMLElement>
  },
  autoFitTransformOrigin: {
    type: Boolean,
    default: false
  },
  openedClass: {
    type: [String, Array, Object]
  },
  autoFitPosition: {
    type: Boolean,
    default: true
  },
  renderToBody: {
    type: Boolean,
    default: true
  },
  preventFocus: {
    type: Boolean,
    default: false
  }
}

export type TriggerProps = ExtractPropTypes<typeof triggerProps>
