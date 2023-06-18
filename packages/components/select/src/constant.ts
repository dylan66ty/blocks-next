import type { InjectionKey } from 'vue'
import type { SelectContext } from './types'

export const selectKey: InjectionKey<SelectContext> = Symbol('Select')
