import { isArray, isNumber } from '../../../utils/is'
import { dfs } from '../../../utils/tree-traverse'
import type { TreeData, TreeNode } from './type'

// 双向链表
export const transDataToNodes = (
  data: TreeData[],
  {
    nodeValueMap,
    nodeKeyMap,
    checkStrictly
  }: {
    nodeValueMap: Map<string | number, TreeNode>
    nodeKeyMap: Map<string | number, TreeNode>
    checkStrictly: boolean
  }
) => {
  const traverse = (data: TreeData[], parent: null | TreeNode, deep: number) => {
    return data.map((item, index) => {
      const node: TreeNode = {
        key: '',
        deep,
        label: item.label,
        value: item.value,
        disabled: item.disabled,
        unfold: false,
        lasted: false,
        hasChildren: false,
        indents: [],
        pathValue: [],
        pathNode: [],
        pathLabel: [],
        data: item,
        parent
      }
      const oldNode = nodeValueMap.get(item.value)

      node.pathValue = parent ? parent.pathValue.concat([item.value]) : [item.value]
      node.pathNode = parent ? parent.pathNode.concat([node]) : [node]
      node.pathLabel = parent ? parent.pathLabel.concat([item.label]) : [item.label]
      node.lasted = index === data.length - 1
      node.indents = parent ? parent.indents.concat([!parent.lasted ? 1 : 0]) : []

      const key = node.pathValue.join('-')
      node.key = key

      if (!checkStrictly) {
        node.disabled = parent?.disabled ? parent.disabled : item.disabled
      }

      if (oldNode) {
        node.unfold = oldNode.unfold
      }

      nodeValueMap.set(node.value, node)
      nodeKeyMap.set(key, node)

      if (isArray(item.children) && item.children.length) {
        node.children = traverse(item.children, node, deep + 1)
        node.hasChildren = true

        if (!node.disabled) {
          node.totalLeafNumber = node.children.reduce((pre, n) => {
            if (isNumber(n.totalLeafNumber)) {
              return pre + n.totalLeafNumber
            }
            if (n.disabled) {
              return pre
            }
            return pre + (n.isLeaf ? 1 : 0)
          }, 0)
        }
      } else {
        node.isLeaf = true
      }

      return node
    })
  }

  const nodes = traverse(data, null, 0)

  return nodes
}

// 通过unfold状态的不同，来组装扁平化列表
export const transToFlattenNodes = (nodes: TreeNode[]) => {
  const seqNodeList: TreeNode[] = []
  const traverse = (nodes: TreeNode[]) => {
    nodes.forEach((node) => {
      if (!node.parent) {
        seqNodeList.push(node)
      }
      if (node.parent && node.parent.unfold) {
        seqNodeList.push(node)
      }
      if (node.unfold && node.children) {
        traverse(node.children)
      }
    })
  }

  traverse(nodes)
  return seqNodeList
}

export const findParentNodeByValue = (
  value: string | number,
  nodes: TreeNode[]
): TreeNode | null => {
  let parent = null
  dfs<TreeNode>(nodes, {
    visitor(node, done) {
      if (node.value === value) {
        parent = node.parent as null
        done()
      }
    }
  })
  return parent
}

export const getCheckedStatus = (
  node: TreeNode,
  nodeKeys: string[] | undefined,
  nodeKeyMap: Map<string, TreeNode> | undefined
) => {
  let checked = false
  let indeterminate = false

  if (node.isLeaf) {
    if (nodeKeys?.includes(node.key)) {
      checked = true
    }
  } else {
    const reg = new RegExp(`^${node.key}(-|$)`)
    const checkedLeafNumber = nodeKeys?.reduce((pre, key) => {
      if (reg.test(key) && !nodeKeyMap?.get(key)?.disabled) {
        return (pre as number) + 1
      }
      return pre
    }, 0) as number

    if (checkedLeafNumber >= (node.totalLeafNumber ?? 1)) {
      checked = true
    } else if (checkedLeafNumber > 0) {
      indeterminate = true
    }
  }

  return {
    checked,
    indeterminate
  }
}
