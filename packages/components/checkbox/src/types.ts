import { ComputedRef } from "vue"


export type IModelValue =  string | number | boolean

export interface ICheckboxProps {
  indeterminate?:boolean,
  checked?:boolean,
  name?:string,
  disable?:boolean,
  label?: string | number | boolean,
  modelValue?: IModelValue
}

export interface ICheckboxGroupProvide {
  modelValue?: ComputedRef,
  changeEvent?: (val: unknown) => void,
  name?: string
} 