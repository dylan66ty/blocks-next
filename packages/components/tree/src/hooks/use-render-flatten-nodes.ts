import type { Ref } from 'vue'
import { ref, watch, getCurrentInstance } from 'vue'
import type { TreeNode } from '../type'
import { findAllUnfoldNodes, unfoldAllNodes, foldAllNodes } from '../utils'

export const useRenderFlattenNodes = ({
  nodes,
  defaultExpandAll
}: {
  nodes: Ref<TreeNode[]>
  defaultExpandAll: Ref<boolean>
}) => {
  const renderFlattenNodes = ref<TreeNode[]>([])

  watch(
    () => nodes.value,
    (newData) => {
      renderFlattenNodes.value = defaultExpandAll.value ? unfoldAllNodes(newData) : newData
    }
  )

  const instance = getCurrentInstance()

  const handleToggleExpandAll = (status: boolean) => {
    if (status) {
      renderFlattenNodes.value = unfoldAllNodes(nodes.value)
    } else {
      renderFlattenNodes.value = foldAllNodes(nodes.value)
    }
  }

  if (instance) {
    instance.exposed = {
      handleToggleExpandAll
    }
  }

  const toggleNodeExpand = (node: TreeNode) => {
    const { key } = node
    const nodes = renderFlattenNodes.value.slice()
    const index = nodes.findIndex((node) => node.key === key)
    if (index < 0) return
    const children = node.children
    if (!children) return
    if (!node.unfold) {
      // 展开
      const left = nodes.slice(0, index + 1)
      const right = nodes.slice(index + 1)
      node.unfold = true
      renderFlattenNodes.value = [...left, ...findAllUnfoldNodes(node), ...right]
    } else {
      // 折叠
      nodes.splice(index + 1, findAllUnfoldNodes(node).length)
      renderFlattenNodes.value = nodes
      node.unfold = false
    }
  }

  return {
    renderFlattenNodes,
    toggleNodeExpand
  }
}
