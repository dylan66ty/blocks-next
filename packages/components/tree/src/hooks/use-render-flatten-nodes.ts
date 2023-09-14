import type { Ref } from 'vue'
import { ref, watch, getCurrentInstance, computed } from 'vue'
import type { TreeNode, TreeData } from '../type'
import { transToFlattenNodes, findParentNodeByValue } from '../utils'
import { isArray, isFunction } from '../../../../utils/is'
import { compose } from '../../../../shared/utils'
import { dfs } from '../../../../utils/tree-traverse'

export const useRenderFlattenNodes = ({
  nodes,
  nodeValueMap,
  originData,
  defaultUnfoldAll,
  defaultUnfoldValues,
  accordion,
  filterNodeMethod
}: {
  nodes: Ref<TreeNode[]>
  nodeValueMap: Map<string | number, TreeNode>
  originData: Ref<TreeData[]>
  defaultUnfoldAll: Ref<boolean>
  defaultUnfoldValues: Ref<(string | number)[]>
  accordion: Ref<boolean>
  filterNodeMethod: ((q: string, data: TreeData) => boolean) | undefined
}) => {
  const renderFlattenNodes = ref<TreeNode[]>([])

  const flattenNodes = computed(() => [...nodeValueMap.values()])

  const updateRenderFlattenNodes = (nodes: TreeNode[]) => {
    renderFlattenNodes.value = compose(transToFlattenNodes, (nodes) => {
      if (defaultUnfoldAll.value) {
        dfs<TreeNode>(nodes, {
          visitor(node) {
            if (!node.isLeaf) {
              node.unfold = true
            }
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
    })(nodes)
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
    },
    // 过滤
    filter(query: string) {
      const _nodes = nodes.value.slice()
      console.log(111)
      dfs<TreeNode>(_nodes, {
        visitor(node) {
          if (!query) {
            node.filter = false
            return
          }
          const RE = new RegExp(`${query}`, 'ig')
          let ret = RE.test(String(node.label))
          if (isFunction(filterNodeMethod)) {
            ret = filterNodeMethod(query, node.data)
          }
          if (ret) {
            let cur = node
            while (cur) {
              cur.filter = false
              cur = cur.parent as any
            }
          } else {
            node.filter = true
          }
        }
      })
      updateRenderFlattenNodes(_nodes)
    }
  }

  if (instance?.exposed) {
    Object.keys(exposed).forEach((method) => {
      instance.exposed![method] = exposed[method]
    })
  }

  const emitEvent = (node: TreeNode) => {
    instance?.emit(node.unfold ? 'unfold-node' : 'fold-node', node)
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
