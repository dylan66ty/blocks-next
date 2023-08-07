import { isArray } from '../../../utils/is'
import type { TreeData, TreeNode } from './type'

export const transDataToNodes = (
  data: TreeData[],
  { nodesMap }: { nodesMap: Map<string, TreeNode> }
) => {
  // 深度优先遍历
  const traverse = (data: TreeData[], parent: null | TreeNode) => {
    return data.map((item) => {
      const node: TreeNode = {
        key: '',
        label: item.label,
        value: item.value,
        pathValue: [],
        pathNode: [],
        pathLabel: [],
        parent
      }

      node.key = parent ? `${parent.key}-${item.value}` : String(item.value)

      node.pathValue = parent ? parent.pathValue.concat([item.value]) : [item.value]
      node.pathNode = parent ? parent.pathNode.concat([node]) : [node]
      node.pathLabel = parent ? parent.pathLabel.concat([item.label]) : [item.label]

      nodesMap.set(node.key, node)

      if (isArray(item.children)) {
        node.children = traverse(item.children, node)
      }

      return node
    })
  }

  const nodes = traverse(data, null)
  return nodes
}
