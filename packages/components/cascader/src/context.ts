import type { InjectionKey, Slots } from 'vue'
import type { CascaderNode } from './type'

export interface CascaderContext {
  slots: Slots
  setSelectedPath: (key?: string) => void
  emitPath: (node?: CascaderNode, checked?: boolean) => void
  setActiveKey: (key?: string) => void
  nodeKeys: string[]
  footer?: {
    handleCancel: () => void
    handleOk: () => void
  }
}

export const cascaderInjectionKey: InjectionKey<CascaderContext> = Symbol('Cascader')
