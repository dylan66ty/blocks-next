<template>
  <div :class="cls">
    <template v-if="$slots['prefix-icon']"></template>
    <span class="bn-input__prefix  bn-input__icon">
      <slot name="prefix-icon"></slot>
    </span>
    <input class="bn-input__inner" :placeholder="placeholder" :disabled="disabled" :type="inputType" :value="modelValue"
      @input.stop="onInput" />

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

  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, PropType } from 'vue'
import EyeOpen from '../../icon/src/eye-open.vue'
import EyeClose from '../../icon/src/eye-close.vue'
import { getNamespaced } from '../../../utils/global-config'


export default defineComponent({
  name: 'Input',
  components: {
    EyeOpen,
    EyeClose
  },
  props: {
    modelValue: [String, Number] as PropType<string | number>,
    type: {
      type: String as PropType<'text' | string>,
      default: 'text'
    },
    placeholder: String as PropType<string>,
    disabled: Boolean as PropType<boolean>,
    error: Boolean as PropType<boolean>,
    size: String as PropType<string>,
    showPassword: Boolean as PropType<boolean>
  },
  emits: ['update:modelValue', 'input' , 'change'],
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

    const onInput = (e: Event) => {
      const t = e.target as HTMLInputElement
      const v = t.value
      emit('update:modelValue', v)
      emit('input', v)
      emit('change', v)
    }

    return {
      onInput,
      eyeStatus,
      cls,
      inputType,
      handleEye
    }
  }
})
</script>