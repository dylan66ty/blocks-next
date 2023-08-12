import type { Ref } from 'vue'
import { computed, getCurrentInstance, ref } from 'vue'
import type { TreeNode } from '../type'
import { dfs } from '../../../../utils/tree-traverse'
export const useChecked = ({
  checked,
  nodeValueMap,
  nodePathMap,
  checkStrictly
}: {
  checked: Ref<(string | number)[] | undefined>
  nodeValueMap: Map<string | number, TreeNode>
  nodePathMap: Map<string | number, TreeNode>
  checkStrictly: Ref<boolean>
}) => {
  const instance = getCurrentInstance()
  const innerCheckedValues = ref<(string | number)[]>([])
  const hasUpdateCheckedEvent = computed(() => instance?.vnode?.props?.['onUpdate:checked'])
  const checkedNodesPathKeys = computed(() => {
    const values = checked.value ?? innerCheckedValues.value
    return values.map((value) => nodeValueMap.get(value)?.key).filter(Boolean) as string[]
  })
  console.log(nodePathMap)

  const flattenNodes = computed(() => [...nodeValueMap.values()])

  const updateChecked = (keys: string[]) => {
    // keys => values
    const values: (string | number)[] = []
    flattenNodes.value.forEach((node) => {
      if (keys.includes(node.key)) {
        values.push(node.value)
      }
    })

    if (hasUpdateCheckedEvent.value) {
      instance?.emit('update:checked', values)
    } else {
      innerCheckedValues.value = values
    }
  }
  const getAllLeafNodes = (nodes: TreeNode[]) => {
    const leafNodes: TreeNode[] = []
    dfs(nodes, {
      visitor(node) {
        if (node.isLeaf && !node.disabled) {
          leafNodes.push(node)
        }
      }
    })
    return leafNodes
  }

  const toggleNodeCheckStatus = (node: TreeNode, checked: boolean) => {
    const originKeys = checkedNodesPathKeys.value

    let keys: string[] = []
    if (!checkStrictly.value) {
      // 产生关联关系
      keys = getAllLeafNodes([node]).map((node) => node.key)
    } else {
      keys = [node.key]
    }

    if (checked) {
      updateChecked([...new Set(originKeys.concat(keys))])
    } else {
      updateChecked(originKeys.filter((key) => !keys.includes(key)))
    }
  }

  return {
    checkedNodesPathKeys,
    toggleNodeCheckStatus
  }
}
