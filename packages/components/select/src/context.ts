import type { InjectionKey } from 'vue'
import type { OptVmProxy } from './types'

export interface SelectContext {
  multiple: boolean
  popupClass: string | undefined
  optionItemCreate(optVmProxy: OptVmProxy): void
  optionItemDestroy(optVmProxy: OptVmProxy): void
  optionItemSelect(optVmProxy: OptVmProxy): void
  optionItemHoverIndexChange(optVmProxy: OptVmProxy): void
  optionItemHoverChange(optVmProxy: OptVmProxy): void
}

export const selectInjectKey: InjectionKey<SelectContext> = Symbol('Select')
