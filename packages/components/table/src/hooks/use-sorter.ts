import { ref } from 'vue'
import type { TableColumnData } from '../types'

const sortDirection = ['ascend', 'descend', ''] as const

type SortDirection = (typeof sortDirection)[number]

const getDirection = (direction: SortDirection) => {
  let index = sortDirection.indexOf(direction)
  if (index === sortDirection.length - 1) {
    index = 0
  } else {
    index++
  }

  return sortDirection[index]
}

export const useSorter = ({ sort, prop, popup, callback }: { sort: SortDirection; prop: string | number; popup: boolean; callback: () => void }) => {
  const activeSort = ref<SortDirection>(sort)
  const activeProp = ref(prop)
  const isSortPopup = ref(popup)

  const handleSortChange = (column: TableColumnData, direction?: SortDirection) => {
    if (activeProp.value !== column.prop) {
      activeSort.value = ''
    }
    activeProp.value = column.prop!
    activeSort.value = direction ? direction : getDirection(activeSort.value)
    callback()
  }
  return {
    activeSort,
    activeProp,
    handleSortChange,
    isSortPopup
  }
}
