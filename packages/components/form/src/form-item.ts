import type { ExtractPropTypes } from 'vue'
import type { Arrayable } from '../../../utils/types'
import { definePropType } from '../../../utils/vue-utils'
import type { FormItemRule } from './types'

export const formItemValidateStates = ['', 'error', 'validating', 'success'] as const

export type FormItemValidateState = (typeof formItemValidateStates)[number]

export type FormItemProp = Arrayable<string>

export const formItemProps = {
  label: String,
  labelWidth: {
    type: [String, Number],
    default: ''
  },
  prop: {
    type: definePropType<FormItemProp>([String, Array])
  },
  required: {
    type: Boolean,
    default: undefined
  },
  rules: {
    type: definePropType<Arrayable<FormItemRule>>([Array])
  },
  validateStatus: {
    type: String,
    values: formItemValidateStates
  },
  showMessage: {
    type: Boolean,
    default: true
  }
}

export type FormItemProps = ExtractPropTypes<typeof formItemProps>
