import type { InjectionKey, Slots } from 'vue'
import type { TreeNode } from './type'

export interface TreeContext {
  showLine: boolean
  rootSlots: Slots
  blockNode: boolean
  selectedValues: (number | string | undefined)[]
  toggleNodeExpand(node: TreeNode): void
  handleNodeSelected(node: TreeNode): void
}

export const treeInjectKey: InjectionKey<TreeContext> = Symbol('Tree')
