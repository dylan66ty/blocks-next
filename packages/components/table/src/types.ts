import type { RenderFunction, VNode } from 'vue'

export interface TableData {
  key?: string
  expand?: string | RenderFunction
  children?: TableData[]
  disabled?: boolean
  isLeaf?: boolean
  [name: string]: any
}

export type ClassName = string

export interface TableSortable {
  sortDirections: ('ascend' | 'descend')[]
  sorter?:
    | ((
        a: TableData,
        b: TableData,
        extra: { dataIndex: string; direction: 'ascend' | 'descend' }
      ) => number)
    | boolean

  sortOrder?: 'ascend' | 'descend' | ''
}

export interface TableFilterData {
  text: string | RenderFunction
  value: string
}

export interface TableFilterable {
  filters?: TableFilterData[]
  filter: (filteredValue: string[], record: TableData) => boolean
  multiple?: boolean
  filteredValue?: string[]
  defaultFilteredValue?: string[]
}

export const tableColumnTypes = ['checkbox', 'index']

export type TableColumnTypes = (typeof tableColumnTypes)[number]

export interface TableColumnData {
  type?: TableColumnTypes
  prop?: string
  title?: string
  width?: number
  minWidth?: number
  align?: 'left' | 'center' | 'right'
  fixed?: 'left' | 'right'
  ellipsis?: boolean
  tooltip?: boolean | Record<string, any>
  sortable?: boolean
  filterable?: TableFilterable
  children?: TableColumnData[]
  renderCell?: (data: {
    row: TableData
    column: TableColumnData
    rowIndex: number
  }) => VNode | string | number
  renderHeader?: (data: { column: TableColumnData }) => VNode | string | number
  renderIndex?: (data: { column: TableColumnData; index: number }) => number
  slotName?: string
  headerSlotName?: string
  hiddenCheckboxAll?: boolean

  hidden?: boolean
  disabled?: boolean
  checked?: boolean

  // private
  isLastLeftFixed?: boolean
  isFirstRightFixed?: boolean
  colSpan?: number
  rowSpan?: number
  index?: number
  parent?: TableColumnData
}

export interface TableDataWithRaw {
  raw?: TableData
  // private
  key?: string
  disabled?: boolean
  expand?: string | RenderFunction
  children?: TableDataWithRaw[]
  isLeaf?: boolean
  hasSubtree?: boolean
}
