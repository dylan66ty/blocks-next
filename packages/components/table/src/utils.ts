import { compose, deepClone, getProp, getUniqueId } from '../../../shared/utils'
import type { TableData, TableDataWithRaw, TableColumnData } from './types'

export const injectPrivatePropToTableData = (data: TableData[]) => {
  const travel = (data: TableData[]) => {
    const result: TableDataWithRaw[] = []
    for (const _record of data) {
      const record: TableDataWithRaw = {
        raw: _record,
        disabled: _record.disabled,
        expand: _record.expand,
        isLeaf: _record.isLeaf
      }
      if (_record.children) {
        record.isLeaf = false
        record.children = travel(_record.children)
      } else {
        record.isLeaf = true
      }
      record.hasSubtree = false

      result.push(record)
    }
    return result
  }

  return travel(data ?? [])
}

// 把columns按fixed left right排序
export const splitColumns = (columns: TableColumnData[]) => {
  const normal: TableColumnData[] = []
  const left: TableColumnData[] = []
  const right: TableColumnData[] = []
  columns.forEach((column) => {
    if (column.fixed === 'left') {
      left.push(column)
      return
    }
    if (column.fixed === 'right') {
      right.push(column)
      return
    }
    normal.push(column)
  })

  return [...left, ...normal, ...right]
}

// 克隆column 添加一些属性
const cloneColumnAddProp = (columns: TableColumnData[]) => {
  return columns.map((column) => {
    const _column = deepClone(column)
    _column.hidden = _column.hidden ?? false
    _column.disabled = _column.disabled ?? false
    _column.checked = !_column.hidden
    _column.width = _column.width ?? ''
    _column.key = _column.key ?? getUniqueId()
    return _column
  })
}

const transformColumns = (columns: TableColumnData[]) => {
  return compose(cloneColumnAddProp)(columns)
}

export const injectPrivatePropToTableColumnData = (columns: TableColumnData[]) => {
  const _columns = transformColumns(columns)
  const dataColumns: TableColumnData[] = _columns
  const groupColumns: TableColumnData[][] = [_columns]

  return {
    dataColumns,
    groupColumns
  }
}

export const genSortFn = (prop: any, order: 'ascend' | 'descend' | '') => {
  const compare = (a: TableData, b: TableData, reserve: number) => {
    const v1 = getProp(a.raw, prop)
    const v2 = getProp(b.raw, prop)

    if (typeof v1 === 'string' && typeof v2 === 'string') {
      if (v1.length > v2.length) {
        return 1 * reserve
      }
      for (let i = 0; i < v1.length; i++) {
        if (v1[i] < v2[i]) {
          return -1 * reserve
        }
        if (v1[i] > v2[i]) {
          return 1 * reserve
        }
      }
      return 0
    }

    return (v1 - v2) * reserve
  }

  let sortFn
  if (!prop) {
    sortFn = (data: TableData[]) => data
  }
  if (order === 'ascend') {
    sortFn = (data: TableData[]) => data.sort((a, b) => compare(a, b, 1))
  }
  if (order === 'descend') {
    sortFn = (data: TableData[]) => data.sort((a, b) => compare(a, b, -1))
  }
  if (!order) {
    sortFn = (data: TableData[]) => data
  }
  return sortFn
}
