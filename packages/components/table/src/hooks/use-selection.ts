import type { Ref } from 'vue'
import { computed, ref, watch } from 'vue'
import type { TableData } from '../types'
export const useSelection = ({
  selection,
  allEnabledSelectionRows,
  emit
}: {
  selection: Ref<TableData[]>
  allEnabledSelectionRows: Ref<TableData[]>
  emit: any
}) => {
  const innerSelection = ref(selection.value ?? [])
  const keepSelection = computed(() => innerSelection.value.filter((row) => row.disabled))
  const selectionRows = computed(() => innerSelection.value)

  const toggleSelectAll = (checked: boolean) => {
    const _allEnabledSelectionRows = [...allEnabledSelectionRows.value, ...keepSelection.value]

    const _selection = checked ? _allEnabledSelectionRows : [...keepSelection.value]
    // TODO 没有绑定事件不需要触发事件函数
    emit('update:selection', _selection)
    emit('selection-change', _selection)

    innerSelection.value = _selection
  }

  watch(selection, (val) => {
    innerSelection.value = val
  })

  const toggleSelect = (row: TableData, checked: boolean) => {
    const originSelection = [...innerSelection.value]
    if (checked) {
      originSelection.push(row)
    } else {
      const index = originSelection.findIndex((r) => r === row)
      if (index > -1) {
        originSelection.splice(index, 1)
      }
    }
    innerSelection.value = originSelection

    emit('update:selection', originSelection)
    emit('selection-change', originSelection)
  }

  return {
    toggleSelect,
    toggleSelectAll,
    selectionRows
  }
}
