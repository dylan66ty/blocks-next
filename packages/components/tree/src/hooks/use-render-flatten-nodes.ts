import type { Ref } from 'vue'
import { ref, watch, getCurrentInstance, computed } from 'vue'
import type { TreeNode, TreeData } from '../type'
import { transToFlattenNodes, findParentNodeByValue } from '../utils'
import { isArray } from '../../../../utils/is'
import { compose } from '../../../../shared/utils'
import { dfs } from '../../../../utils/tree-traverse'

export const useRenderFlattenNodes = ({
  nodes,
  nodeValueMap,
  originData,
  defaultUnfoldAll,
  defaultUnfoldValues,
  accordion
}: {
  nodes: Ref<TreeNode[]>
  nodeValueMap: Map<string | number, TreeNode>
  originData: Ref<TreeData[]>
  defaultUnfoldAll: Ref<boolean>
  defaultUnfoldValues: Ref<(string | number)[]>
  accordion: Ref<boolean>
}) => {
  const renderFlattenNodes = ref<TreeNode[]>([])

  const flattenNodes = computed(() => [...nodeValueMap.values()])

  const updateRenderFlattenNodes = () => {
    renderFlattenNodes.value = compose(transToFlattenNodes, (nodes) => {
      if (defaultUnfoldAll.value) {
        flattenNodes.value.forEach((node) => {
          if (!node.isLeaf) {
            node.unfold = true
          }
        })
      } else if (isArray(defaultUnfoldValues.value)) {
        defaultUnfoldValues.value.forEach((value) => {
          const node = nodeValueMap.get(value)
          if (node) {
            node.pathNode.forEach((n) => {
              n.unfold = true
            })
          }
        })
      }
      return nodes
    })(nodes.value)
  }

  watch(() => nodes.value, updateRenderFlattenNodes)

  const instance = getCurrentInstance()

  const exposed: Record<string, Function> = {
    // 展开节点
    unfoldNodes(values?: (number | string)[]) {
      renderFlattenNodes.value = compose(transToFlattenNodes, (nodes) => {
        if (isArray(values)) {
          values.forEach((value) => {
            const node = nodeValueMap.get(value)
            if (node) {
              node.pathNode.forEach((n) => {
                n.unfold = true
              })
            }
          })
        } else {
          flattenNodes.value.forEach((node) => {
            node.unfold = true
          })
        }
        return nodes
      })(nodes.value)
    },
    // 折叠节点
    foldNodes(values?: (number | string)[]) {
      renderFlattenNodes.value = compose(transToFlattenNodes, (nodes) => {
        if (isArray(values)) {
          values.forEach((value) => {
            const node = nodeValueMap.get(value)
            if (node) {
              node.unfold = false
            }
          })
        } else {
          flattenNodes.value.forEach((node) => {
            node.unfold = false
          })
        }
        return nodes
      })(nodes.value)
    },
    // 新增node
    insertNodes(parentValue: number | string, data: TreeData[]) {
      if (!parentValue) {
        originData.value.push(...data)
        return
      }
      const node = flattenNodes.value.find((n) => n.value === parentValue)
      if (!node) return
      const dataChildren = node.data.children
      if (dataChildren) {
        dataChildren.push(...data)
      } else {
        node.data.children = [...data]
      }
    },
    // 删除node
    removeNodes(values: (number | string)[]) {
      values.forEach((value) => {
        const parent = findParentNodeByValue(value, nodes.value)
        const children = parent ? parent.data.children : originData.value
        if (!children) return
        const index = children.findIndex((n) => n.value === value)
        if (~index) {
          children.splice(index, 1)
        }
        const node = nodeValueMap.get(value)
        if (!node) return
        dfs<TreeNode>([node!], {
          visitor(node) {
            if (nodeValueMap.has(node.value)) {
              nodeValueMap.delete(node.value)
            }
          }
        })
      })
    }
  }

  if (instance?.exposed) {
    Object.keys(exposed).forEach((method) => {
      instance.exposed![method] = exposed[method]
    })
  }

  const emitEvent = (node: TreeNode) => {
    if (node.unfold) {
      instance?.emit('unfold-node', node)
    } else {
      instance?.emit('fold-node', node)
    }
  }

  const toggleNodeUnfoldOrFold = (node: TreeNode) => {
    if (node.isLeaf) return
    renderFlattenNodes.value = compose(transToFlattenNodes, (nodes) => {
      if (accordion.value) {
        const parent = findParentNodeByValue(node.value, nodes)
        const children = parent ? parent.children : nodes
        children?.forEach((n) => {
          if (n.value !== node.value) {
            n.unfold = false
          }
        })
      }
      node.unfold = !node.unfold
      return nodes
    })(nodes.value)
    emitEvent(node)
  }

  return {
    renderFlattenNodes,
    toggleNodeUnfoldOrFold
  }
}
