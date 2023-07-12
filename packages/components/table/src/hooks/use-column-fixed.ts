import type { StyleValue, Ref } from 'vue'
import { computed } from 'vue'
import { addUnit, findLastIndex } from '../../../../shared/utils'
import type { TableColumnData } from '../types'

const getLeft = (dataColumns: TableColumnData[], index: number) => {
  if (index === 0) return '0'
  const res: any = []
  dataColumns.slice(0, index).forEach((v) => {
    res.push(addUnit(v.width) || 0)
  })
  return `calc(${res.join(' + ')})`
}

const getRight = (dataColumns: TableColumnData[], index: number) => {
  const lastIndex = dataColumns.length - 1
  if (index === lastIndex) return '0'
  const res: any = []
  dataColumns.slice(index + 1, lastIndex + 1).forEach((v) => {
    res.push(addUnit(v.width) || 0)
  })
  return `calc(${res.join(' + ')})`
}

export const useColumnFixed = (
  dataColumns: Ref<TableColumnData[]>,
  column: Ref<TableColumnData>
) => {
  const leftFixedLastIndex = computed(() =>
    findLastIndex(dataColumns.value as [], (_column) => _column.fixed === 'left')
  )
  const rightFixedFirstIndex = computed(() =>
    dataColumns.value.findIndex((_column) => _column.fixed === 'right')
  )

  const fixedIndex = computed(() =>
    dataColumns.value.findIndex((_column) => _column === column.value)
  )

  // 是否是左边固定列最后一个
  const isLeftFixedLast = computed(
    () => leftFixedLastIndex.value > -1 && leftFixedLastIndex.value === fixedIndex.value
  )

  // 是否是右边固定列第一个
  const isRightFixedFirst = computed(
    () => rightFixedFirstIndex.value > -1 && rightFixedFirstIndex.value === fixedIndex.value
  )

  const fixedStyle = computed(() => {
    const style: StyleValue = {}
    if (column.value.fixed === 'left') {
      style.left = getLeft(dataColumns.value, fixedIndex.value)
    }
    if (column.value.fixed === 'right') {
      style.right = getRight(dataColumns.value, fixedIndex.value)
    }
    return style
  })

  return {
    fixedStyle,
    isLeftFixedLast,
    isRightFixedFirst
  }
}
