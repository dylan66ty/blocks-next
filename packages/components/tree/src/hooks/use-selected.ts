import { computed, getCurrentInstance } from 'vue'
import type { WritableComputedRef, Ref } from 'vue'
import type { TreeNode } from '../type'
import { isArray, isUndefined } from '../../../../utils/is'

export const useSelected = ({
  selected,
  multiple,
  nodesMap
}: {
  selected: Ref<(string | number)[] | undefined>
  multiple: Ref<boolean>
  nodesMap: Map<string | number, TreeNode>
}) => {
  const instance = getCurrentInstance()

  const hasUpdateSelectedEvent = computed(() => instance?.vnode?.props?.['onUpdate:selected'])

  const selectedValues: WritableComputedRef<(number | string | undefined)[]> = computed({
    get() {
      if (selected.value) {
        return isArray(selected.value) ? selected.value : [selected.value]
      }
      return []
    },
    set(val) {
      if (hasUpdateSelectedEvent.value) {
        instance?.emit('update:selected', val)
      }
    }
  })

  const exposed: Record<string, Function> = {
    getSelectedNodes() {
      return selectedValues.value.map((key) => nodesMap.get(key!))
    }
  }

  if (instance?.exposed) {
    Object.keys(exposed).forEach((method) => {
      instance.exposed![method] = exposed[method]
    })
  }

  const handleNodeSelected = (node: TreeNode) => {
    const values = selectedValues.value.slice()
    const key = node.value
    if (isUndefined(key)) return
    if (values.includes(key)) return
    if (multiple.value) {
      values.push(key)
      selectedValues.value = values
      return
    }
    selectedValues.value = [key]
  }

  return { handleNodeSelected, selectedValues }
}
