<script lang="ts">
  import {
    computed,
    defineComponent,
    provide,
    inject,
    reactive,
    ref,
    nextTick,
    onMounted,
    onBeforeUnmount
  } from 'vue'
  import type { StyleValue, CSSProperties } from 'vue'

  import type { RuleItem } from 'async-validator'
  import AsyncValidator from 'async-validator'
  import { getComponentNamespace, getNamespace } from '../../../utils/global-config'

  import { getProp, setProp, deepClone, addUnit } from '../../../shared/utils'
  import { isString, isFunction } from '../../../utils/is'
  import { formItemProps } from './form-item'
  import type { FormItemValidateState } from './form-item'

  import { formItemContextKey, formContextKey } from './constants'

  import { registerCustomValidator } from './validators/index'

  import type { FormValidateFailure, FormItemContext, FormItemRule } from './types'

  export default defineComponent({
    name: getComponentNamespace('FormItem'),
    props: formItemProps,
    setup(props, { slots }) {
      const ns = getNamespace('form-item')

      // 合并验证规则 form上的rules和form-item上的验证规则合并
      const normalizedRules = computed(() => {
        const { required } = props
        const rules: FormItemRule[] = []
        if (props.rules) {
          rules.push(...(props.rules as []))
        }

        const formRules = formContext?.rules

        if (formRules && props.prop) {
          const field = props.prop as string
          const _rules = formRules[field] as []
          if (_rules) {
            rules.push(..._rules)
          }
        }
        // required优先取 form-item上的数据
        // 如果form表单上rules里面有required字段 如果form-item上也有required字段 会合并required字段到rules上 required取值为form-item上的值
        // 如果form表单上rules里面没有required字段 增加一条验证规则 required false
        if (required !== undefined) {
          const requiredRules = rules
            .map((rule, i) => [rule, i] as const)
            .filter(([rule]) => Object.keys(rule).includes('required'))
          if (requiredRules.length > 0) {
            for (const [rule, i] of requiredRules) {
              if (rule.required === required) continue
              rules[i] = { ...rule, required }
            }
          } else {
            rules.push({ required })
          }
        }
        // 内置正则校验器
        registerCustomValidator(rules)

        return rules
      })
      const validateEnabled = computed(() => normalizedRules.value.length > 0)

      const getFilteredRule = (trigger: string) => {
        const rules = normalizedRules.value
        return rules
          .filter((rule) => {
            // 如果当前没有触发行为 则表明在form里面调用验证器的时候当前规则全部都要验证
            if (!rule.trigger || !trigger) return true
            // rule [change,..] 'change'
            if (Array.isArray(rule.trigger)) {
              return rule.trigger.includes(trigger)
            } else {
              return rule.trigger === trigger
            }
          })
          .map(({ ...rule }): RuleItem => rule)
      }
      const validateState = ref<FormItemValidateState>('')

      const validateMessage = ref('')

      const formItemRef = ref<HTMLDivElement>()

      const isRequired = computed(() => normalizedRules.value.some((rule) => rule.required))

      // cls
      const forItemCls = computed(() => [
        ns,
        isRequired.value && 'is-required',
        validateState.value === 'error' && 'is-error',
        validateState.value === 'success' && 'is-success',
        validateState.value === 'validating' && 'is-validating'
      ])

      const contentCls = computed<StyleValue>(() => [`${ns}__content`])

      const formContext = inject(formContextKey, undefined)
      const parentFormItemContext = inject(formItemContextKey, undefined)

      // 是否是嵌套表单
      const isNested = !!parentFormItemContext

      // style
      const labelStyle = computed<CSSProperties>(() => {
        if (formContext?.labelPosition === 'top') {
          return {}
        }
        const style: CSSProperties = {
          width: addUnit(props?.labelWidth || formContext?.labelWidth) || 0
        }
        return style
      })
      const contentStyle = computed<CSSProperties>(() => {
        if (formContext?.labelPosition === 'top') {
          return {}
        }
        if (formContext?.inline) {
          return {}
        }
        // 嵌套form-item不展示label
        if (!props.label && !props.labelWidth && isNested) {
          return {}
        }

        const labelWidth = addUnit(props?.labelWidth || formContext?.labelWidth)
        if (labelWidth || slots.label) {
          return { marginLeft: labelWidth }
        }
        return {}
      })

      // 是否显示label
      const hasLabel = computed<boolean>(() => {
        return !!(props.label || slots.label)
      })

      let initialValue: any

      const fieldValue = computed(() => {
        return getProp(formContext?.model, props.prop as string, '')
      })

      const currentLabel = computed(() => props.label || '')

      const setValidationState = (state: FormItemValidateState) => {
        validateState.value = state
      }

      const shouldShowError = computed(
        () =>
          props.showMessage && (formContext?.showMessage ?? true) && validateState.value === 'error'
      )

      // 表单验证失败
      const onValidationFailed = (error: FormValidateFailure) => {
        const { errors, fields } = error
        if (!errors || !fields) {
          console.error(error)
        }
        setValidationState('error')
        validateMessage.value = errors ? errors?.[0]?.message ?? `${props.prop}是必填项` : ''

        formContext?.emit('validate', props.prop!, false, validateMessage.value)
      }

      // 表单验证成功
      const onValidationSucceeded = () => {
        setValidationState('success')
        formContext?.emit('validate', props.prop!, true, '')
      }

      const propString = computed(() => {
        if (!props.prop) return ''
        return isString(props.prop) ? props.prop : props.prop.join('.')
      })

      // 执行验证器
      const doValidate = async (rules: RuleItem[]): Promise<boolean> => {
        const modelName = propString.value
        // 创建校验对象
        const validator = new AsyncValidator({
          [modelName]: rules
        })
        return validator
          .validate({ [modelName]: fieldValue.value }, { firstFields: true })
          .then(() => {
            onValidationSucceeded()
            return true as const
          })
          .catch((err: FormValidateFailure) => {
            onValidationFailed(err as FormValidateFailure)
            return Promise.reject(err)
          })
      }

      // 组件的验证器对象 子组件可直接调用此方法来触发验证器
      const validate: FormItemContext['validate'] = async (trigger, callback) => {
        if (isResettingField || !props.prop) {
          return false
        }
        const hasCallback = isFunction(callback)
        if (!validateEnabled.value) {
          callback?.(false)
          return false
        }

        const rules = getFilteredRule(trigger)

        if (rules.length === 0) {
          callback?.(true)
          return true
        }
        // 异步验证时候这个需要加上loading
        setValidationState('validating')

        return doValidate(rules)
          .then(() => {
            callback?.(true)
            return true as const
          })
          .catch((err: FormValidateFailure) => {
            const { fields } = err
            callback?.(false, fields)
            return hasCallback ? false : Promise.reject(fields)
          })
      }

      let isResettingField = false

      const clearValidate: FormItemContext['clearValidate'] = () => {
        setValidationState('')
        validateMessage.value = ''
        isResettingField = false
      }

      const resetField: FormItemContext['resetField'] = async () => {
        const model = formContext?.model
        if (!model || !props.prop) return
        // 恢复初始值
        setProp(model, props.prop, deepClone(initialValue))
        isResettingField = true
        await nextTick()
        clearValidate()
        isResettingField = false
      }

      // 向下面的input组件 注入FormItemContext 主要是验证器 validate 对象
      const context = reactive({
        $el: formItemRef,
        prop: props.prop,
        validateState,
        validate,
        resetField,
        clearValidate
      })
      provide(formItemContextKey, context as any)

      onBeforeUnmount(() => {
        formContext?.removeField(context as any)
      })

      onMounted(() => {
        // 将所有的form-item验证器保存到form上，方便后面在form里面直接循环验证
        if (props.prop) {
          formContext?.addField(context as any)
          initialValue = deepClone(fieldValue.value)
        }
      })

      return {
        forItemCls,
        contentCls,
        currentLabel,
        hasLabel,
        shouldShowError,
        labelStyle,
        contentStyle,
        formItemRef,
        validateMessage,
        validateState,

        validate,
        clearValidate,
        resetField
      }
    },
    expose: ['validateMessage', 'validateState', 'validate', 'clearValidate', 'resetField']
  })
</script>

<template>
  <div ref="formItemRef" :class="forItemCls">
    <div v-if="hasLabel" class="bn-form-item__label" :style="labelStyle">
      <slot name="label">
        {{ currentLabel }}
      </slot>
    </div>

    <div :class="contentCls" :style="contentStyle">
      <slot></slot>
      <transition name="bn-slide-bottom">
        <slot v-if="shouldShowError" name="error" :error="validateMessage">
          <div class="bn-form-item__error">
            {{ validateMessage }}
          </div>
        </slot>
      </transition>
    </div>
  </div>
</template>
