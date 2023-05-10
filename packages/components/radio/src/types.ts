import {ComputedRef} from 'vue'

export interface IRadioGroupProvide {
  modelValue?: ComputedRef,
  changeEvent?: (val: unknown) => void,
  name?: string
} 