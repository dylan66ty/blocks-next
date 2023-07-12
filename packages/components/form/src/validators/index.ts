import { isString } from '../../../../utils/is'
import type { FormItemRule } from '../types'
import { REGEXPS } from './regExps'
import type { IREGEXPS } from './regExps'

export const replaceValidatorToFunction = (row: any) => {
  if (isString(row.validator)) {
    const validator: IREGEXPS = row.validator
    const RE: RegExp = REGEXPS[validator]

    const validatorFn = (rule: any, value: string, callback: Function) => {
      if (RE) {
        if (row.required) {
          RE.test(value) ? callback() : callback(new Error(rule.message || '校验不通过'))
        } else {
          if (value) {
            RE.test(value) ? callback() : callback(new Error(rule.message || '校验不通过'))
          } else {
            callback()
          }
        }
      } else {
        callback(
          new Error('内置validator不存在！validator支持(email ｜ url | mobile | chinese | number)')
        )
      }
    }
    // 重写 validator
    row.validator = validatorFn
  }
}

export const registerCustomValidator = (rules: FormItemRule[]) => {
  rules.forEach((ruleItem) => {
    replaceValidatorToFunction(ruleItem)
  })
}
