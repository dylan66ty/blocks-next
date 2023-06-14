import type { CascaderData, CascaderNode } from './type'
export const transData = (data: CascaderData[]) => {
  const travel = (data: CascaderData[], parent: CascaderNode | null = null, level = 0) => {
    return data.map((item: CascaderData, index) => {
      const node: CascaderNode = {
        key:'',
        parent,
        raw: item,

        label: item.label,
        value: item.value,
        render: item.render,
        isLeaf: item.isLeaf,
        disabled: false,

        checked: false,
        indeterminate: false,
        level,
        index,
        pathNodes: [],
        pathValue: [],
        pathLabel: [],

        children: [],

      }

      node.pathNodes =(node.parent?.pathNodes || []).concat(node)
      node.pathLabel = node.pathNodes.map(n => n.label!)
      node.pathValue = node.pathNodes.map(n => n.value)
      node.key = node.pathValue.join('-')

      if (item.children && item.children.length !== 0) {
        node.isLeaf = false
        node.hasChildren = true
        node.children = travel(item.children, node, level + 1)

        const enabledNodes:any = []
        const checkValues:any = []

        node.children.forEach(n => {  
          if(!n.disabled) {
            enabledNodes.push(n)
          }
          if(n.checked) {
            checkValues.push(n.value)
          }
        })

        if(checkValues.length) {
          if(enabledNodes.length === checkValues.length) {
            node.checked = true
          }else {
            node.indeterminate = true
          }
        }

        node.checkValues = checkValues
        node.enabledNodes = enabledNodes

      

      }else {
        node.isLeaf = true
        node.hasChildren = false
      }
    
      return node
    })
  }
  const nodes = travel(data)
  return nodes
}