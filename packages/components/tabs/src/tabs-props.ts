import type { PropType } from 'vue'
import type { TabsType } from './types'
export const tabsProps = {
  activeKey: {
    type: [String, Number],
    default: undefined
  },
  type: {
    type: String as PropType<TabsType>,
    default: 'line'
  },
  destroyOnHide: {
    type: Boolean,
    default: undefined
  },
  // 选项卡切换时是否开启动画
  animation: {
    type: Boolean,
    default: true
  },
  // 隐藏panes
  hidePanes: {
    type: Boolean,
    default: true
  }
}
