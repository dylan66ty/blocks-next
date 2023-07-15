import type { InjectionKey } from 'vue'
import type { SelectContext } from './types'

export const selectInjectKey: InjectionKey<SelectContext> = Symbol('Select')
