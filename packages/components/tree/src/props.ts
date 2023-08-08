import type { PropType } from 'vue'
import type { TreeData } from './type'

export const treeProps = {
  data: {
    type: Array as PropType<TreeData[]>,
    default: () => []
  },
  multiple: {
    type: Boolean,
    default: false
  },
  selected: {
    type: Array as PropType<string[]>,
    default: () => []
  },
  showLine: {
    type: Boolean,
    default: false
  },
  defaultExpandAll: {
    type: Boolean,
    default: false
  },
  // 节点独占一行
  blockNode: {
    type: Boolean,
    default: false
  },
  // 带复选框
  checkable: {
    type: Boolean,
    default: false
  }
}
