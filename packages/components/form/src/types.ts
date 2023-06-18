import type { SetupContext } from 'vue'
import type { RuleItem, ValidateError, ValidateFieldsError } from 'async-validator'
import type { Arrayable } from '../../../utils/types'

import type { FormProps, FormEmits } from './form'

import type { FormItemProp, FormItemProps, FormItemValidateState } from './form-item'

export interface FormItemRule extends RuleItem {
  trigger?: Arrayable<string>
}

export type FormRules = Partial<Record<string, Arrayable<FormItemRule>>>

export type FormValidationResult = Promise<any>

export type FormValidateCallback = (isValid: boolean, invalidFields?: any) => void

export type FormContext = FormProps & {
  emit: SetupContext<FormEmits>['emit']
  // expose
  addField: (field: FormItemContext) => void
  removeField: (field: FormItemContext) => void
  resetFields: (props?: Arrayable<FormItemProp>) => void
  clearValidate: (props?: Arrayable<FormItemProp>) => void
  validateField: (props?: Arrayable<FormItemProp>, callback?: FormValidateCallback) => FormValidationResult
}

export interface FormItemContext extends FormItemProps {
  $el: HTMLDivElement | undefined
  validateState: FormItemValidateState
  validate: (trigger: string, callback?: FormValidateCallback) => FormValidationResult
  resetField(): void
  clearValidate(): void
}

export interface FormValidateFailure {
  errors: ValidateError[] | null
  fields: ValidateFieldsError
}
