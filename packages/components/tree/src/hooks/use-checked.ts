import type { Ref } from 'vue'
import { computed, getCurrentInstance, ref } from 'vue'
import type { TreeNode } from '../type'
import { dfs } from '../../../../utils/tree-traverse'
export const useChecked = ({
  checked,
  checkStrictly,
  nodesMap
}: {
  checked: Ref<(string | number)[] | undefined>
  checkStrictly: Ref<boolean>
  nodesMap: Map<string | number, TreeNode>
}) => {
  const instance = getCurrentInstance()
  const innerCheckedValues = ref<(string | number)[]>([])
  const hasUpdateCheckedEvent = computed(() => instance?.vnode?.props?.['onUpdate:checked'])
  const checkedNodesPathKeys = computed(() => checked.value ?? innerCheckedValues.value)

  const updateChecked = (keys: string[]) => {
    if (hasUpdateCheckedEvent.value) {
      instance?.emit('update:checked', keys)
    } else {
      innerCheckedValues.value = keys
    }
  }
  console.log(checkStrictly, nodesMap)
  const getAllLeafNodes = (nodes: TreeNode[]) => {
    const leafNodes: TreeNode[] = []
    dfs(nodes, {
      visitor(node) {
        if (node.isLeaf) {
          leafNodes.push(node)
        }
      }
    })
    return leafNodes
  }

  const toggleNodeCheckStatus = (node: TreeNode, checked: boolean) => {
    const leafNodes = getAllLeafNodes([node])
    const keys = leafNodes.map((node) => node.key)
    const originKeys = checkedNodesPathKeys.value

    if (checked) {
      updateChecked(originKeys.concat(keys) as string[])

      // updateChecked(leafKeys)
    } else {
      console.log(1)
    }
  }

  return {
    checkedNodesPathKeys,
    toggleNodeCheckStatus
  }
}
