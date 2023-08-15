import { computed, getCurrentInstance, ref } from 'vue'
import type { Ref } from 'vue'
import type { TreeNode } from '../type'
import { isArray, isUndefined } from '../../../../utils/is'

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
  }

  const exposed: Record<string, Function> = {
    getSelectedNodes() {
      return selectedValues.value.map((key) => nodeValueMap.get(key!))
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
      updateSelectedValues(values)
    } else {
      updateSelectedValues([key])
    }

    focusNodeValues.value = [key]
  }

  return { handleNodeSelected, selectedValues, focusNodeValues }
}
