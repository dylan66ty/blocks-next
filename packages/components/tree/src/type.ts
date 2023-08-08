export interface TreeData {
  label: string | number
  value: string | number
  isLeaf?: boolean
  disabled?: boolean
  // 是否可以选中
  checkable?: boolean
  children?: TreeData[]
}

export interface TreeNode extends Omit<TreeData, 'children'> {
  key: string | undefined
  indents: number[]
  deep: number
  pathValue: (string | number | undefined)[]
  pathNode: TreeData[]
  pathLabel: (string | number | undefined)[]
  unfold: boolean
  lasted: boolean
  hasChildren: boolean
  parent?: TreeNode | null
  children?: TreeNode[]
}
