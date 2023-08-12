import type { InjectionKey, Slots } from 'vue'
import type { TreeNode } from './type'

export interface TreeContext {
  showLine: boolean
  rootSlots: Slots
  blockNode: boolean
  showCheckbox: boolean
  checkStrictly: boolean
  selectedValues: (number | string | undefined)[]
  checkedNodesPathKeys: string[]
  nodePathMap: Map<string, TreeNode>
  toggleNodeUnfoldOrFold(node: TreeNode): void
  handleNodeSelected(node: TreeNode): void
  toggleNodeCheckStatus(node: TreeNode, checked: boolean): void
}

export const treeInjectKey: InjectionKey<TreeContext> = Symbol('Tree')
