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
  checkedKeys: {
    type: Array as PropType<string[]>,
    default: undefined
  },
  showLine: {
    type: Boolean,
    default: false
  },
  size: {
    type: String as PropType<'small' | 'default' | 'large'>,
    default: 'small'
  }
}
