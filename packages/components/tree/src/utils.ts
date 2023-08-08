import { isArray } from '../../../utils/is'
import { dfs } from '../../../utils/tree-traverse'
import type { TreeData, TreeNode } from './type'

export const transDataToNodes = (
  data: TreeData[],
  { nodesMap }: { nodesMap: Map<string | number, TreeNode> }
) => {
  const traverse = (data: TreeData[], parent: null | TreeNode, deep: number) => {
    return data.map((item, index) => {
      const node: TreeNode = {
        key: '',
        deep,
        label: item.label,
        value: item.value,
        unfold: false,
        lasted: false,
        hasChildren: false,
        indents: [],
        pathValue: [],
        pathNode: [],
        pathLabel: [],
        parent
      }

      node.pathValue = parent ? parent.pathValue.concat([item.value]) : [item.value]
      node.pathNode = parent ? parent.pathNode.concat([node]) : [node]
      node.pathLabel = parent ? parent.pathLabel.concat([item.label]) : [item.label]
      node.lasted = index === data.length - 1

      node.indents = parent ? parent.indents.concat([!parent.lasted ? 1 : 0]) : []
      node.key = node.pathValue.join('-')

      nodesMap.set(item.value, node)

      if (isArray(item.children) && item.children.length) {
        node.children = traverse(item.children, node, deep + 1)
        node.hasChildren = true
      }

      return node
    })
  }

  const nodes = traverse(data, null, 0)
  return nodes
}

// 查询所有的展开节点
export const findAllUnfoldNodes = (node: TreeNode) => {
  const nodes: TreeNode[] = []
  const traverse = (node: TreeNode) => {
    if (node.unfold && node.children) {
      node.children.forEach((child) => {
        // 一定要深度优先遍历
        nodes.push(child)
        traverse(child)
      })
    }
  }
  traverse(node)
  return nodes
}

export const unfoldAllNodes = (nodes: TreeNode[]) => {
  const ret: TreeNode[] = []
  dfs<TreeNode>(nodes, {
    visitor(node) {
      if (node.children) {
        node.unfold = true
      }
      ret.push(node)
    }
  })
  return ret
}

export const foldAllNodes = (nodes: TreeNode[]) => {
  dfs<TreeNode>(nodes, {
    visitor(node) {
      if (node.children) {
        node.unfold = false
      }
    }
  })
  return nodes
}
