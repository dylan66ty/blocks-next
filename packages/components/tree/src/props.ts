import { definePropType } from '../../../utils/vue-utils'
import type { TreeData } from './type'

export const treeProps = {
  data: {
    type: definePropType<TreeData[]>(Array),
    default: () => []
  },
  // 是否开启多选模式
  multiple: {
    type: Boolean,
    default: false
  },
  // 点击选中的节点集合
  selected: {
    type: definePropType<(string | number)[] | undefined>(Array),
    default: undefined
  },
  checked: {
    type: definePropType<(string | number)[] | undefined>(Array),
    default: undefined
  },
  // 是否显示线型树结构
  showLine: {
    type: Boolean,
    default: false
  },
  // 默认展开全部
  defaultUnfoldAll: {
    type: Boolean,
    default: false
  },
  // 默认展开node节点的value集合
  defaultUnfoldValues: {
    type: definePropType<(string | number)[]>(Array),
    default: () => []
  },
  // 节点独占一行
  blockNode: {
    type: Boolean,
    default: false
  },
  // 是否显示复选框
  showCheckbox: {
    type: Boolean,
    default: false
  },
  // checkbox模式下，checkStrictly为true时父子节点相互不受影响
  checkStrictly: {
    type: Boolean,
    default: false
  },
  // 手风琴
  accordion: {
    type: Boolean,
    default: false
  }
}
