export interface TreeData {
  label?: string | number
  value?: string | number
  isLeaf?: boolean
  disabled?: boolean
  // 是否可以选中
  checkable?: boolean
  children?: TreeData[]
}

export interface TreeNode extends Omit<TreeData, 'children'> {
  key: string | undefined
  pathValue: (string | number | undefined)[]
  pathNode: TreeData[]
  pathLabel: (string | number | undefined)[]
  parent?: TreeNode | null
  children?: TreeNode[]
}
