import type { InjectionKey } from 'vue'

export interface DescriptionsContext {
  size: 'large' | 'default' | 'small'
  border: boolean
  cellHeight: number | string | undefined
}

export const descriptionsInjectionKey: InjectionKey<DescriptionsContext> = Symbol('Descriptions')
