import { computed, getCurrentInstance } from 'vue'
import type { WritableComputedRef, Ref } from 'vue'
import type { TreeNode } from '../type'
import { isArray, isUndefined } from '../../../../utils/is'

export const useSelected = ({
  selected,
  multiple,
  nodesMap
}: {
  selected: Ref<string[] | undefined>
  multiple: Ref<boolean>
  nodesMap: Map<string | number, TreeNode>
}) => {
  const instance = getCurrentInstance()

  const selectedValues: WritableComputedRef<(number | string | undefined)[]> = computed({
    get() {
      return isArray(selected.value) ? selected.value : [selected.value]
    },
    set(val) {
      instance?.emit('update:selected', val)
    }
  })

  const getNodesByValues = (values: (string | number)[]) => {
    return values.map((key) => nodesMap.get(key))
  }

  if (instance) {
    instance.exposed = {
      getNodesByValues
    }
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
