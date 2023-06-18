import type { Plugin, VNode, AppContext } from 'vue'

export type SFCWithInstall<T> = T & Plugin

export type Arrayable<T> = T | T[]

export type Data = Record<string, any>

export interface SlotChildren {
  value?: VNode[]
}

export type SFCInstallWithContext<T> = SFCWithInstall<T> & {
  _context: AppContext | null
}
