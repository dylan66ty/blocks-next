export interface TreeData {
  label: string | number
  value: string | number
  isLeaf?: boolean
  disabled?: boolean
  children?: TreeData[]
}

export interface TreeNode extends Omit<TreeData, 'children'> {
  key: string
  indents: number[]
  deep: number
  pathValue: (string | number | undefined)[]
  pathNode: TreeNode[]
  pathLabel: (string | number | undefined)[]
  data: TreeData
  unfold: boolean
  lasted: boolean
  hasChildren: boolean
  totalLeafNumber?: number
  parent?: TreeNode | null
  children?: TreeNode[]
}
