import { type Ref } from 'vue'
import { isArray, isNumber } from '../../../utils/is'
import type { CascaderData, CascaderNode } from './type'

export const transDataToNodes = (
  data: CascaderData[],
  {
    nodesMap,
    totalLevel
  }: {
    nodesMap: Map<string, CascaderNode>
    totalLevel: Ref<number>
  }
) => {
  let innerLevel = totalLevel.value
  const traverse = (data: CascaderData[], parent: CascaderNode | null = null, level = 0) => {
    innerLevel = Math.max(innerLevel, level)

    return data.map((item: CascaderData, index) => {
      const node: CascaderNode = {
        key: '',
        parent,
        raw: item,

        label: item.label,
        value: item.value,
        render: item.render,
        isLeaf: item.isLeaf,
        disabled: item.disabled,
        selectionDisabled: false,

        level,
        index,
        pathNodes: [],
        pathValue: [],
        pathLabel: [],

        children: []
      }

      node.pathNodes = (node.parent?.pathNodes || []).concat(node)
      node.pathLabel = node.pathNodes.map((n) => n.label!)
      node.pathValue = node.pathNodes.map((n) => n.value)
      node.key = node.pathValue.join('-')

      nodesMap.set(node.key, node)

      if (item.children && item.children.length !== 0) {
        node.isLeaf = false
        node.hasChildren = true
        node.children = traverse(item.children, node, level + 1)

        if (!item.disabled) {
          // 计算出当前node下所有leaf数量
          node.totalLeafNumber = node.children.reduce((pre, n) => {
            if (isNumber(n.totalLeafNumber)) {
              return pre + n.totalLeafNumber
            }

            if (n.disabled || n.selectionDisabled) {
              return pre
            }

            return pre + (n.isLeaf ? 1 : 0)
          }, 0)
          if (node.totalLeafNumber === 0) {
            node.selectionDisabled = true
          }
        }
      } else {
        node.isLeaf = true
        node.hasChildren = false
      }

      return node
    })
  }
  const nodes = traverse(data)

  totalLevel.value = innerLevel

  return nodes
}

// 组合生成nodeKey，方便在nodesMap中查找
export const getNodeKey = (keys: string[]) => {
  return keys.join('-')
}

// 对入参进行格式化
// 多选时 二维数组 [[1,2,3],[4,5,6]] => ['1-2-3','4-5-6']
// 单选 [1,2,3] => ['1-2-3']
export const formatModelValue = (
  value: string[] | string[][],
  { multiple }: { multiple: boolean }
): string[] => {
  if (multiple) {
    return value.map((m) => (isArray(m) ? getNodeKey(m as string[]) : getNodeKey([m])))
  }
  return [getNodeKey(value as string[])]
}

export const getCheckedStatus = (node: CascaderNode, nodeKeys?: string[]) => {
  let checked = false
  let indeterminate = false

  if (node.isLeaf) {
    if (nodeKeys?.includes(node.key)) {
      checked = true
    }
  } else {
    const reg = new RegExp(`^${node.key}(-|$)`)

    const checkedLeafOptionNumber = nodeKeys?.reduce((pre, key) => {
      if (reg.test(key)) {
        return pre + 1
      }
      return pre
    }, 0)
    if (checkedLeafOptionNumber! >= (node.totalLeafNumber ?? 1)) {
      checked = true
    } else if (checkedLeafOptionNumber! > 0) {
      indeterminate = true
    }
  }

  return {
    checked,
    indeterminate
  }
}

export const getLeafNodes = (node: CascaderNode) => {
  const leafNodes: CascaderNode[] = []
  const traverse = (children: CascaderNode[]) => {
    children.forEach((node) => {
      if (node.isLeaf) {
        leafNodes.push(node)
      }
      if (node.hasChildren) {
        traverse(node.children!)
      }
    })
  }
  traverse([node])

  return leafNodes
}

export const getAllLeafNodesByQuery = (
  nodes: CascaderNode[],
  callback?: (node: CascaderNode) => boolean | undefined
) => {
  const leafNodes: CascaderNode[] = []
  const stack: CascaderNode[] = [...nodes]

  // 深度优先遍历
  while (stack.length) {
    const node = stack.shift()!
    if (callback && callback(node)) {
      leafNodes.push(...getLeafNodes(node))
    } else {
      const children = node?.children || []
      for (let i = children.length - 1; i >= 0; i--) {
        stack.unshift(children[i])
      }
    }
  }
  return leafNodes
}
