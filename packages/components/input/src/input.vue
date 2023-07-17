<script lang="ts">
  import type { StyleValue } from 'vue'
  import { defineComponent, computed, ref, shallowRef, nextTick, onMounted, watch } from 'vue'
  import { getNamespace, getComponentNamespace } from '../../../utils/global-config'
  import { isClient } from '../../../utils/browser'
  import { isObject } from '../../../utils/is'
  import { NOOP } from '../../../shared/utils'
  import EyeOpenIcon from '../../icon/src/base/eye-open.vue'
  import EyeCloseIcon from '../../icon/src/base/eye-close.vue'
  import ClearableIcon from '../../icon/src/base/close-fill.vue'

  import { useFormItem } from '../../form/src/hooks/use-form-item'
  import { inputProps } from './props'
  import { calcTextareaHeight } from './utils'

  type TargetElement = HTMLInputElement | HTMLTextAreaElement

  export default defineComponent({
    name: getComponentNamespace('Input'),
    components: {
      EyeOpenIcon,
      EyeCloseIcon,
      ClearableIcon
    },
    inheritAttrs: false,
    props: inputProps,
    emits: ['update:modelValue', 'input', 'change', 'focus', 'blur', 'clear'],
    setup(props, { emit, slots, attrs }) {
      const inputNs = getNamespace('input')
      const textareaNs = getNamespace('textarea')
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

      const containerCls = computed(() => [
        props.type === 'text' ? inputNs : textareaNs,
        attrs.class
      ])

      const containerStyle = computed(() => [attrs.style as StyleValue])

      const eyeStatus = ref(false)
      const isHover = ref(false)
      const isFocus = ref(false)

      const innerValue = ref(props.value)
      const computedModelValue = computed(() => props.modelValue ?? innerValue.value)

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
        if (!props.clearable) return false
        if (!computedModelValue.value) return false
        if (isHover.value || isFocus.value) return true
        return false
      })

      const hasPasswordIcon = computed(() => {
        return props.showPassword && computedModelValue.value
      })

      const showInputInnerSuffixArea = computed(() => {
        return (
          hasSuffixIcon.value || hasClearableIcon.value || props.showWordLimit || props.showPassword
        )
      })

      // 输入文本字数
      const currentValueLength = computed<number>(() => {
        const value = computedModelValue.value
        return String(value).length
      })

      // input输入事件
      const handleInput = (e: Event) => {
        let { value } = e.target as TargetElement

        // 过滤器
        if (props.formatter) {
          value = props.formatter(value)
        }

        if (props.maxlength) {
          value = value.slice(0, Number(props.maxlength))
        }

        emit('update:modelValue', value)
        emit('input', value)
        innerValue.value = value
        ;(e.target as TargetElement).value = value
      }

      // input change事件
      const handleChange = (e: Event) => {
        emit('change', (e.target as TargetElement).value)
      }

      const handleFocus = (e?: Event) => {
        isFocus.value = true
        emit('focus', e)
      }

      const handleBlur = (e: Event) => {
        isFocus.value = false
        emit('blur', e)
        // 表单验证关联-失去焦点触发
        if (props.validateEvent) {
          formItem?.validate?.('blur').catch(NOOP)
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
        emit('update:modelValue', '')
        emit('clear', '')
        innerValue.value = ''
        inputRef.value?.focus()
      }

      // 手动触发input focus事件
      const manualInputFocus = async (e?: MouseEvent) => {
        e && e.preventDefault()
        await nextTick()
        inputRef.value?.focus()
      }

      // textarea
      const textareaRef = shallowRef<HTMLTextAreaElement>()
      const textareaCalcStyle = shallowRef({})
      const textareaStyle = computed(() => [textareaCalcStyle.value, { resize: props.resize }])

      const resizeTextarea = () => {
        const { type, autosize } = props

        if (!isClient || type !== 'textarea' || !textareaRef.value) return

        if (autosize) {
          const minRows = isObject(autosize) ? autosize.minRows : undefined
          const maxRows = isObject(autosize) ? autosize.maxRows : undefined
          const textareaStyle = calcTextareaHeight(textareaRef.value, minRows, maxRows)
          textareaCalcStyle.value = {
            overflowY: 'hidden',
            ...textareaStyle
          }
          nextTick(() => {
            textareaRef.value!.offsetHeight
            textareaCalcStyle.value = textareaStyle
          })
        } else {
          textareaCalcStyle.value = {
            minHeight: calcTextareaHeight(textareaRef.value).minHeight
          }
        }
      }

      onMounted(() => {
        nextTick(resizeTextarea)
      })

      watch(
        () => props.type,
        async () => {
          await nextTick()
          resizeTextarea()
        }
      )

      watch(
        () => computedModelValue.value,
        () => {
          nextTick(() => resizeTextarea())

          if (props.validateEvent) {
            formItem?.validate?.('change').catch(NOOP)
          }
        }
      )

      return {
        containerCls,
        containerStyle,
        inputNs,
        textareaNs,
        inputWrapperCls,
        eyeStatus,
        computedModelValue,
        inputType,
        inputRef,
        textareaStyle,
        textareaRef,
        mergeDisable,
        currentValueLength,
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
        manualInputFocus
      }
    }
  })
</script>

<template>
  <div
    :class="containerCls"
    :style="containerStyle"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    @mousedown="manualInputFocus"
  >
    <!-- input -->
    <template v-if="type === 'text'">
      <div :class="inputWrapperCls">
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
          :value="computedModelValue"
          :readonly="readonly"
          :autocomplete="autocomplete"
          :form="form"
          @input="handleInput"
          @change="handleChange"
          @focus="handleFocus"
          @blur="handleBlur"
        />

        <span v-if="showInputInnerSuffixArea" :class="[`${inputNs}__suffix`]">
          <span
            v-if="hasPasswordIcon"
            :class="[`${inputNs}__icon`, `${inputNs}__eye`]"
            @click.stop="handleEye"
          >
            <EyeOpenIcon v-if="eyeStatus" />
            <EyeCloseIcon v-else />
          </span>
          <span
            v-if="hasClearableIcon"
            :class="[`${inputNs}__icon`, `${inputNs}__clearable`]"
            @click.stop="handleClear"
          >
            <ClearableIcon color="#d9dbe2" />
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
    </template>

    <!-- textarea -->
    <template v-if="type === 'textarea'">
      <textarea
        ref="inputRef"
        :class="[`${textareaNs}__inner`]"
        :disabled="mergeDisable"
        :style="textareaStyle"
        :placeholder="placeholder"
        :value="computedModelValue"
        :readonly="readonly"
        :form="form"
        @input="handleInput"
        @change="handleChange"
        @focus="handleFocus"
        @blur="handleBlur"
      />

      <span v-if="showWordLimit" :class="[`${textareaNs}__count`]">
        {{ currentValueLength }} / {{ maxlength }}
      </span>
    </template>
  </div>
</template>
