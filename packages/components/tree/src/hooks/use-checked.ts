import type { Ref } from 'vue'
import { computed, getCurrentInstance, ref } from 'vue'
import type { TreeNode } from '../type'
import { dfs } from '../../../../utils/tree-traverse'
export const useChecked = ({
  checked,
  nodeValueMap,
  nodeKeyMap,
  checkStrictly
}: {
  checked: Ref<(string | number)[] | undefined>
  nodeValueMap: Map<string | number, TreeNode>
  nodeKeyMap: Map<string | number, TreeNode>
  checkStrictly: Ref<boolean>
}) => {
  const instance = getCurrentInstance()
  const innerCheckedValues = ref<(string | number)[]>([])
  const hasUpdateCheckedEvent = computed(() => instance?.vnode?.props?.['onUpdate:checked'])
  const checkedNodeKeys = computed(() => {
    return transToNodeKeys(checked.value ?? innerCheckedValues.value)
  })
  const flattenNodes = computed(() => [...nodeValueMap.values()])

  const getAllLeafNodes = (nodes: TreeNode[]) => {
    const leafNodes: TreeNode[] = []
    dfs(nodes, {
      visitor(node) {
        // 这里要去重
        if (node.isLeaf && !leafNodes.includes(node)) {
          leafNodes.push(node)
        }
      }
    })
    return leafNodes
  }

  const transToNodeKeys = (values: (string | number)[]) => {
    if (checkStrictly.value) {
      return values.map((value) => nodeValueMap.get(value)?.key).filter(Boolean) as string[]
    } else {
      const nodes = flattenNodes.value.filter((node) => values.includes(node.value))
      const leafNodes = getAllLeafNodes(nodes)
      return leafNodes.map((node) => node.key)
    }
  }

  const updateCheckedNodeKeys = (keys: string[]) => {
    // keys => values
    const values = keys.map((key) => nodeKeyMap.get(key)).map((n) => n!.value)
    if (hasUpdateCheckedEvent.value) {
      instance?.emit('update:checked', values)
    } else {
      innerCheckedValues.value = values
    }
  }

  const toggleNodeCheckStatus = (node: TreeNode, checked: boolean) => {
    const originKeys = checkedNodeKeys.value

    let keys: string[] = []
    if (!checkStrictly.value) {
      // 产生关联关系
      keys = getAllLeafNodes([node])
        .filter((n) => !n.disabled)
        .map((n) => n.key)
    } else {
      keys = [node.key]
    }

    if (checked) {
      updateCheckedNodeKeys([...new Set(originKeys.concat(keys))])
    } else {
      updateCheckedNodeKeys(originKeys.filter((key) => !keys.includes(key)))
    }
  }

  return {
    checkedNodeKeys,
    toggleNodeCheckStatus
  }
}
