import { definePropType } from '../../../utils/vue-utils'
import type { TreeData } from '../../tree'

export const treeSelectProps = {
  modelValue: {
    type: definePropType(Array),
    default: () => []
  },
  data: {
    type: definePropType<TreeData[]>(Array),
    default: () => []
  },
  disabled: Boolean,
  multiple: {
    type: Boolean,
    default: false
  },
  clearable: {
    type: Boolean,
    default: false
  },
  size: {
    type: definePropType<'small' | 'default' | 'large'>(String),
    default: 'default'
  },
  placeholder: {
    type: String,
    default: '请选择'
  },
  popupClass: {
    type: String,
    default: undefined
  },
  //表单验证
  validateEvent: {
    type: Boolean,
    default: true
  },
  noDataText: {
    type: String,
    default: '暂无数据'
  },
  unfoldOnClickNode: {
    type: Boolean,
    default: false
  },
  checkedOnClickNode: {
    type: Boolean,
    default: true
  },
  checkStrictly: {
    type: Boolean,
    default: false
  },
  // 是否显示线型树结构
  showLine: {
    type: Boolean,
    default: false
  },
  // 手风琴模式
  accordion: {
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
  filterable: {
    type: Boolean,
    default: false
  },
  filterMethod: {
    type: Function,
    default: undefined
  }
}
