<template>
  <div :class="cls">
    <!-- input -->
    <template v-if="type !== 'textarea'">
      <template v-if="$slots['prefix-icon']">
        <span class="bn-input__prefix bn-input__icon">
          <slot name="prefix-icon"></slot>
        </span>
      </template>

      <input class="bn-input__inner" v-bind="$attrs" :placeholder="placeholder" :disabled="disabled" :type="inputType"
        :value="modelValue" :autocomplete="autocomplete" :form="form" @input="handleInput" @change="handleChange" @focus="handleFocus" @blur="handleBlur"/>

        
      <template v-if="$slots['suffix-icon'] && !showPassword">
        <span class="bn-input__suffix bn-input__icon">
          <slot name="suffix-icon"></slot>
        </span>
      </template>

      <template v-if="showPassword">
        <span class="bn-input__suffix bn-input__icon bn-input__eye" @click="handleEye">
          <EyeOpen v-if="!eyeStatus" />
          <EyeClose v-else />
        </span>
      </template>

    </template>
    <!-- textarea -->
    <template v-else>
      <textarea ref="textarea" class="bn-textarea__inner" v-bind="$attrs" :disabled="disabled"
        :autocomplete="autocomplete" :style="textareaStyle" :placeholder="placeholder" :form="form"
        @input="handleInput"  @change="handleChange" @focus="handleFocus" @blur="handleBlur"/>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, shallowRef, nextTick, onMounted, watch } from 'vue'
import type { PropType } from 'vue'
import EyeOpen from '../../icon/src/eye-open.vue'
import EyeClose from '../../icon/src/eye-close.vue'
import { getNamespaced } from '../../../utils/global-config'
import { isClient } from '../../../utils/browser'
import { isObject } from '../../../utils/is'
import { calcTextareaHeight } from './utils'

type TargetElement = HTMLInputElement | HTMLTextAreaElement

export default defineComponent({
  name: 'Input',
  components: {
    EyeOpen,
    EyeClose
  },
  props: {
    modelValue: [String, Number] as PropType<string | number>,
    type: {
      type: String as PropType<'text' | 'textarea' | string>,
      default: 'text'
    },
    placeholder: String as PropType<string>,
    disabled: Boolean as PropType<boolean>,
    error: Boolean as PropType<boolean>,
    size: String as PropType<string>,
    showPassword: Boolean as PropType<boolean>,
    resize: Boolean,
    autosize: {
      type: [Object, Boolean] as PropType<{ minRows: number, maxRows: number } | boolean>,
      default: false,
    },
    autocomplete: {
      type: String,
      default: 'off',
    },
    form: {
      type: String,
    },
  },
  emits: ['update:modelValue', 'input', 'change', 'focus', 'blur'],
  setup(props, { slots, emit }) {
    const ns = getNamespaced('input')
    const cls = computed(() => [
      ns,
      props.disabled && 'is-disabled',
      props.error && 'is-error',
      props.size && `${ns}--${props.size}`,
      slots['suffix-icon'] && `${ns}--suffix`,
      slots['prefix-icon'] && `${ns}--prefix`,
      props.showPassword && `${ns}--suffix`
    ])
    const eyeStatus = ref(false)
    const inputType = computed(() => {
      if (props.showPassword) {
        return eyeStatus.value ? 'text' : 'password'
      }
      return props.type
    })
    const handleEye = () => {
      eyeStatus.value = !eyeStatus.value
    }
    const handleInput = (e: Event) => {
      const t = e.target as HTMLInputElement
      const v = t.value
      emit('update:modelValue', v)
      emit('input', v)
      emit('change', v)
    }

    // event 
    const handleChange = (event: Event) => {
      emit('change', (event.target as TargetElement).value)
    }

    const handleFocus = (event: Event) => {
      emit('focus', event)
    }

    const handleBlur = (event: Event) => {
      emit('blur', event)
    }

    // textarea 
    const textarea = shallowRef<HTMLTextAreaElement>()
    const textareaCalcStyle = shallowRef({})
    const textareaStyle = computed(() => [
      textareaCalcStyle.value,
      { resize: props.resize },
    ])


    const resizeTextarea = () => {
      const { type, autosize } = props

      if (!isClient || type !== 'textarea' || !textarea.value) return

      if (autosize) {
        const minRows = isObject(autosize) ? autosize.minRows : undefined
        const maxRows = isObject(autosize) ? autosize.maxRows : undefined
        const textareaStyle = calcTextareaHeight(textarea.value, minRows, maxRows)
        textareaCalcStyle.value = {
          overflowY: 'hidden',
          ...textareaStyle,
        }
        nextTick(() => {
          textarea.value!.offsetHeight
          textareaCalcStyle.value = textareaStyle
        })
      } else {
        textareaCalcStyle.value = {
          minHeight: calcTextareaHeight(textarea.value).minHeight,
        }
      }
    }

    onMounted(() => {
      resizeTextarea()
    })

    watch(
      () => props.type,
      async () => {
        await nextTick()
        resizeTextarea()
      }
    )

    return {
      eyeStatus,
      cls,
      inputType,
      handleEye,
      textareaStyle,
      textarea,
      // event
      handleInput,
      handleChange,
      handleFocus,
      handleBlur
    }
  }
})
</script>