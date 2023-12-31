<script lang="ts">
  import type { StyleValue } from 'vue'
  import {
    defineComponent,
    computed,
    ref,
    shallowRef,
    nextTick,
    onMounted,
    watch,
    getCurrentInstance
  } from 'vue'
  import { getNamespace, getComponentNamespace } from '../../../utils/global-config'
  import { isClient } from '../../../utils/browser'
  import { isObject, isUndefined } from '../../../utils/is'
  import { NOOP } from '../../../shared/utils'

  import { BnIconView, BnIconHide, BnIconCloseFill, BnIconCaret } from '../../icon'
  import { useFormItem } from '../../form/src/hooks/use-form-item'
  import { inputProps } from './props'
  import { calcTextareaHeight } from './utils'

  type TargetElement = HTMLInputElement | HTMLTextAreaElement

  export default defineComponent({
    name: getComponentNamespace('Input'),
    components: {
      BnIconView,
      BnIconHide,
      BnIconCloseFill,
      BnIconCaret
    },
    inheritAttrs: false,
    props: inputProps,
    emits: ['update:modelValue', 'input', 'change', 'focus', 'blur', 'clear'],
    setup(props, { emit, slots, attrs }) {
      const inputNs = getNamespace('input')
      const textareaNs = getNamespace('textarea')
      const instance = getCurrentInstance()

      const mergeDisable = computed(() => props.disabled)

      const inputWrapperCls = computed(() => [
        `${inputNs}__wrapper`,
        mergeDisable.value && 'is-disabled',
        props.size && `${inputNs}--${props.size}`,
        props.prefixIcon && `${inputNs}--prefix`,
        showInputInnerSuffixArea.value && `${inputNs}--suffix`,
        props.card && `${inputNs}--card`,
        isHover.value && 'is-hover',
        isFocus.value && 'is-focus'
      ])

      const textareaWrapperCls = computed(() => [
        `${textareaNs}__wrapper`,
        mergeDisable.value && 'is-disabled',
        isHover.value && 'is-hover',
        isFocus.value && 'is-focus'
      ])

      const isPrependGroup = computed(() => props.type === 'text' && slots.prepend)
      const isAppendGroup = computed(() => props.type === 'text' && slots.append)

      const containerCls = computed(() => [
        props.type === 'text' ? inputNs : textareaNs,
        attrs.class,
        isOverLimit.value && 'is-over-limit',
        isPrependGroup.value && 'is-prepend-group',
        isAppendGroup.value && 'is-append-group'
      ])

      const containerStyle = computed(() => [attrs.style as StyleValue])

      const eyeStatus = ref(false)
      const isHover = ref(false)
      const isFocus = ref(false)
      let isComposing = false

      const currentRef = computed(() => inputRef.value || textareaRef.value)

      const setNativeInputValue = () => {
        const target = currentRef.value as HTMLInputElement
        if (target) {
          target.value = computedInputValue.value
        }
      }
      const nativeInputValue = ref('')
      const computedInputValue = computed({
        get() {
          return props.modelValue ?? nativeInputValue.value
        },
        set(val) {
          if (instance?.vnode?.props?.['onUpdate:modelValue']) {
            emit('update:modelValue', val)
          } else {
            nativeInputValue.value = val
          }
        }
      })

      const inputType = computed(() => {
        if (props.showPassword) {
          return eyeStatus.value ? 'text' : 'password'
        }
        return props.type
      })
      const handleEye = () => {
        eyeStatus.value = !eyeStatus.value
        nextTick(() => {
          inputRef.value?.focus()
        })
      }
      const inputRef = shallowRef<HTMLInputElement>()

      const { formItem } = useFormItem()

      // icon show
      const hasPrefixIcon = computed(() => {
        return props.prefixIcon || slots['prefix-icon']
      })
      const hasSuffixIcon = computed(() => {
        return props.suffixIcon || slots['suffix-icon']
      })
      const hasClearableIcon = computed(() => {
        if (!props.clearable || props.disabled || !computedInputValue.value) return false
        if (isHover.value || isFocus.value) return true
        return false
      })

      const hasPasswordIcon = computed(() => {
        return props.showPassword && computedInputValue.value
      })

      const showInputInnerSuffixArea = computed(() => {
        return (
          hasSuffixIcon.value || hasClearableIcon.value || props.showWordLimit || props.showPassword
        )
      })

      // 输入文本字数
      const currentValueLength = computed<number>(() => {
        return String(computedInputValue.value).length
      })

      const isOverLimit = computed(() => {
        if (isUndefined(props.maxlength)) return false
        return currentValueLength.value > Number(props.maxlength)
      })

      // input输入事件
      const handleInput = (e: Event) => {
        let { value } = e.target as TargetElement
        if (isComposing) return
        // 过滤器
        if (props.formatter) {
          value = props.formatter(value)
        }
        emit('input', value)
        computedInputValue.value = value
        nextTick(setNativeInputValue)
      }

      const handleChange = (e: InputEvent) => {
        emit('change', (e.target as TargetElement).value)
        if (props.validateEvent) {
          formItem?.validate?.('change').catch(NOOP)
        }
      }

      const handleFocus = (e: FocusEvent) => {
        isFocus.value = true
        emit('focus', e)
      }

      const handleBlur = (e: FocusEvent) => {
        isFocus.value = false
        emit('blur', e)
        // 表单验证关联-失去焦点触发
        if (props.validateEvent) {
          formItem?.validate?.('blur').catch(NOOP)
        }
      }

      const onCompositionstart = () => {
        isComposing = true
      }

      const onCompositionupdate = () => {}

      const onCompositionend = (e: CompositionEvent) => {
        if (isComposing) {
          isComposing = false
          handleInput(e)
        }
      }

      const handleMouseEnter = () => {
        isHover.value = true
      }

      const handleMouseLeave = () => {
        isHover.value = false
      }

      // 清空
      const handleClear = () => {
        emit('clear', '')
        computedInputValue.value = ''
        nextTick(setNativeInputValue)
      }

      // 手动触发input focus事件
      const manualInputFocus = async () => {
        await nextTick()
        inputRef.value?.focus()
      }

      // textarea
      const textareaRef = shallowRef<HTMLTextAreaElement>()

      const textareaCalcStyle = shallowRef({})
      const textareaBaseStyle = computed(() => {
        const style: any = {}
        style.resize = props.resize ? 'vertical' : 'none'
        return style
      })

      const resizeTextarea = () => {
        const { type, autosize } = props
        if (!isClient || type !== 'textarea' || !textareaRef.value) return

        if (autosize) {
          const minRows = isObject(autosize) ? autosize.minRows : undefined
          const maxRows = isObject(autosize) ? autosize.maxRows : undefined
          const style = calcTextareaHeight(textareaRef.value, minRows, maxRows)
          textareaCalcStyle.value = {
            overflowY: 'scroll',
            ...style,
            ...textareaBaseStyle.value
          }
        } else {
          textareaCalcStyle.value = {
            minHeight: calcTextareaHeight(textareaRef.value).minHeight,
            ...textareaBaseStyle.value
          }
        }
      }

      onMounted(() => {
        nextTick(resizeTextarea)
        nextTick(setNativeInputValue)
      })

      watch(
        () => props.type,
        () => {
          nextTick(resizeTextarea)
          nextTick(setNativeInputValue)
        }
      )

      watch(
        () => computedInputValue.value,
        () => {
          nextTick(resizeTextarea)
          nextTick(setNativeInputValue)
          if (props.validateEvent) {
            formItem?.validate?.('change').catch(NOOP)
          }
        }
      )

      const setFocus = (focus: boolean) => {
        isFocus.value = focus
      }

      return {
        containerCls,
        containerStyle,
        inputNs,
        textareaNs,
        inputWrapperCls,
        textareaWrapperCls,
        eyeStatus,
        computedInputValue,
        inputType,
        inputRef,
        textareaCalcStyle,
        textareaRef,
        mergeDisable,
        currentValueLength,
        isOverLimit,
        showInputInnerSuffixArea,

        hasPrefixIcon,
        hasSuffixIcon,
        hasPasswordIcon,
        hasClearableIcon,
        handleClear,
        handleMouseEnter,
        handleMouseLeave,
        handleInput,
        handleChange,
        handleFocus,
        handleBlur,
        handleEye,
        manualInputFocus,
        setFocus,
        isFocus,
        onCompositionstart,
        onCompositionupdate,
        onCompositionend
      }
    }
  })
</script>

<template>
  <div :class="containerCls" :style="containerStyle">
    <!-- input -->
    <template v-if="type === 'text'">
      <div v-if="$slots['prepend']" :class="[`${inputNs}__group-prepend`]">
        <slot name="prepend"></slot>
      </div>
      <div
        :class="inputWrapperCls"
        @click="manualInputFocus"
        @mouseenter="handleMouseEnter"
        @mouseleave="handleMouseLeave"
      >
        <span v-if="hasPrefixIcon" :class="[`${inputNs}__prefix`]">
          <span :class="[`${inputNs}__icon`]">
            <slot name="prefix-icon">
              <component :is="prefixIcon"></component>
            </slot>
          </span>
        </span>
        <input
          ref="inputRef"
          :class="[`${inputNs}__inner`]"
          :placeholder="placeholder"
          :disabled="mergeDisable"
          :type="inputType"
          :readonly="readonly"
          :autocomplete="autocomplete"
          :form="form"
          :maxlength="maxlength"
          @input="handleInput"
          @change="handleChange"
          @focus="handleFocus"
          @blur="handleBlur"
          @compositionstart="onCompositionstart"
          @compositionupdate="onCompositionupdate"
          @compositionend="onCompositionend"
        />
        <span v-if="showInputInnerSuffixArea" :class="[`${inputNs}__suffix`]">
          <span
            v-if="hasPasswordIcon"
            :class="[`${inputNs}__icon`, `${inputNs}__eye`]"
            @click.stop="handleEye"
          >
            <BnIconView v-if="eyeStatus" />
            <BnIconHide v-else />
          </span>
          <span
            v-if="hasClearableIcon"
            :class="[`${inputNs}__icon`, `${inputNs}__clearable`]"
            @click="handleClear"
          >
            <BnIconCloseFill color="#d9dbe2" />
          </span>
          <span
            v-if="!showPassword && hasSuffixIcon && !hasClearableIcon"
            :class="[`${inputNs}__icon`]"
          >
            <slot name="suffix-icon">
              <component :is="suffixIcon"></component>
            </slot>
          </span>
          <span v-if="showWordLimit" :class="[`${inputNs}__count`]">
            {{ currentValueLength }} / {{ maxlength }}
          </span>
        </span>
      </div>
      <div v-if="$slots['append']" :class="[`${inputNs}__group-append`]">
        <slot name="append"></slot>
      </div>
    </template>

    <!-- textarea -->
    <template v-if="type === 'textarea'">
      <div
        :class="textareaWrapperCls"
        @mouseenter="handleMouseEnter"
        @mouseleave="handleMouseLeave"
      >
        <textarea
          ref="textareaRef"
          :class="[`${textareaNs}__inner`]"
          :disabled="mergeDisable"
          :style="textareaCalcStyle"
          :placeholder="placeholder"
          :readonly="readonly"
          :form="form"
          :maxlength="maxlength"
          @input="handleInput"
          @change="handleChange"
          @focus="handleFocus"
          @blur="handleBlur"
          @compositionstart="onCompositionstart"
          @compositionupdate="onCompositionupdate"
          @compositionend="onCompositionend"
        />

        <span v-if="showWordLimit" :class="[`${textareaNs}__count`]">
          {{ currentValueLength }} / {{ maxlength }}
        </span>
      </div>
    </template>
  </div>
</template>
