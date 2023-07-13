import type { InjectionKey } from 'vue'

export interface DescriptionsContext {
  size: 'large' | 'default' | 'small'
  border: boolean
  cellHeight: number | string | undefined
  direction: 'vertical' | 'horizontal'
}

export const descriptionsInjectionKey: InjectionKey<DescriptionsContext> = Symbol('Descriptions')
