import type { InjectionKey } from 'vue'
import type { DropdownItemProxyData } from './types'

export interface DropdownContext {
  command: string | number | undefined
  size: 'small' | 'default'
  handleDropdownItem(val: DropdownItemProxyData): void
  dropdownItemCreate(proxy: DropdownItemProxyData): void
  dropdownItemDestroy(proxy: DropdownItemProxyData): void
}

export const dropdownContextKey: InjectionKey<DropdownContext> = Symbol('dropdown')
