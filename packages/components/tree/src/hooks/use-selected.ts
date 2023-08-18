import { computed, getCurrentInstance, ref } from 'vue'
import type { Ref } from 'vue'
import type { TreeNode } from '../type'
import { isArray } from '../../../../utils/is'

export const useSelected = ({
  selected,
  multiple,
  nodeValueMap
}: {
  selected: Ref<(string | number)[] | undefined>
  multiple: Ref<boolean>
  nodeValueMap: Map<string | number, TreeNode>
}) => {
  const instance = getCurrentInstance()

  const hasUpdateSelectedEvent = computed(() => instance?.vnode?.props?.['onUpdate:selected'])
  const innerSelectedValues = ref<(string | number)[]>([])
  const focusNodeValues = ref<(string | number)[]>([])

  const selectedValues = computed(() => {
    const values = selected.value ?? innerSelectedValues.value
    return isArray(values) ? values : [values]
  })

  const updateSelectedValues = (values: (string | number)[]) => {
    if (hasUpdateSelectedEvent.value) {
      instance?.emit('update:selected', values)
    }

    instance?.emit('change-selected', values)
  }

  const exposed: Record<string, Function> = {
    getSelectedNodes() {
      return selectedValues.value.map((value) => nodeValueMap.get(value))
    },
    getNodesByValues(values: (string | number)[]) {
      return values.map((value) => nodeValueMap.get(value))
    }
  }

  if (instance?.exposed) {
    Object.keys(exposed).forEach((method) => {
      instance.exposed![method] = exposed[method]
    })
  }

  const handleNodeSelected = (node: TreeNode) => {
    const value = node.value
    if (multiple.value) {
      const origin = selectedValues.value.slice()
      if (!origin.includes(value)) {
        origin.push(value)
      }
      updateSelectedValues(origin)
    } else {
      updateSelectedValues([value])
    }

    focusNodeValues.value = [value]
  }

  return { handleNodeSelected, selectedValues, focusNodeValues }
}
