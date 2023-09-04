import type { PropType, ExtractPropTypes } from 'vue'
import { definePropType } from '../../../utils/vue-utils'
import type { TableData, TableColumnData } from './types'

export const tableProps = {
  data: {
    type: definePropType<TableData[]>(Array),
    default: () => []
  },
  columns: {
    type: definePropType<TableColumnData[]>(Array),
    default: () => []
  },
  border: {
    type: Boolean,
    default: false
  },
  hover: {
    type: Boolean,
    default: false
  },
  stripe: {
    type: Boolean,
    default: false
  },
  selection: {
    type: definePropType<TableData[]>(Array),
    default: undefined
  },
  // 是否可以拖拽改变column的宽度
  columnResizable: {
    type: Boolean,
    default: true
  },
  // 表格固定高度。固定表头
  height: {
    type: [String, Number],
    default: undefined
  },
  maxHeight: {
    type: [String, Number],
    default: undefined
  },
  defaultSort: {
    type: Object as PropType<{
      sort?: 'ascend' | 'descend' | ''
      prop?: string | number
      popup?: boolean
    }>,
    default: () => ({
      sort: '',
      prop: '',
      popup: false
    })
  },
  config: {
    type: Object as PropType<{ setting: boolean }>,
    default: () => ({
      setting: false
    })
  },
  rowHeight: {
    type: [String, Number] as PropType<string | number>,
    default: 68
  },
  loading: {
    type: Boolean,
    default: false
  }
}

export type TableProps = ExtractPropTypes<typeof tableProps>
