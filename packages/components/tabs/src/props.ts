import { definePropType } from '../../../utils/vue-utils'
import type { TabsType } from './types'

export const tabsProps = {
  activeKey: {
    type: [String, Number],
    default: undefined
  },
  type: {
    type: definePropType<TabsType>(String),
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
  },
  size: {
    type: definePropType<'small' | 'default' | 'large'>(String),
    default: 'small'
  }
}
