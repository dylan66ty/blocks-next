import type { InjectionKey, Slots } from 'vue'
import type { TreeNode } from './type'

export interface TreeContext {
  showLine: boolean
  rootSlots: Slots
  showCheckbox: boolean
  checkStrictly: boolean
  selectedValues: (number | string | undefined)[]
  checkedNodeKeys: string[]
  nodeKeyMap: Map<string, TreeNode>
  focusNodeValues: (number | string | undefined)[]
  unfoldOnClickNode: boolean
  toggleNodeUnfoldOrFold(node: TreeNode): void
  handleNodeSelected(node: TreeNode): void
  toggleNodeCheckStatus(node: TreeNode, checked: boolean): void
  clickNode(node: TreeNode): void
}

export const treeInjectKey: InjectionKey<TreeContext> = Symbol('Tree')
