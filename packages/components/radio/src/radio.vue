<script lang="ts">
  import { computed, defineComponent, inject, nextTick, ref, shallowRef } from 'vue'
  import type { PropType } from 'vue'
  import { getNamespace, getComponentNamespace } from '../../../utils/global-config'
  import { radioGroupKey } from './constant'

  import type { RadioGroupContext } from './types'

  export default defineComponent({
    name: getComponentNamespace('Radio'),
    props: {
      modelValue: {
        type: [Boolean, Number, String] as PropType<boolean | number | string>,
        default: ''
      },
      label: {
        type: [Boolean, Number, String] as PropType<boolean | number | string>,
        default: ''
      },
      disabled: {
        type: Boolean,
        default: false
      },
      // native
      name: {
        type: String,
        default: ''
      }
    },
    emits: ['update:modelValue', 'change', 'focus', 'blur'],
    setup(props, { emit }) {
      const ns = getNamespace('radio')
      const radioGroup = inject<RadioGroupContext | null>(radioGroupKey, null)
      const isGroup = computed(() => !!radioGroup)

      const radioRef = shallowRef<HTMLInputElement>()
      const model = computed({
        get() {
          const store = radioGroup ? radioGroup.modelValue?.value : props.modelValue
          return isGroup.value ? store : props.modelValue
        },
        set(val) {
          if (isGroup.value) {
            radioGroup?.changeEvent?.(val)
          } else {
            emit('update:modelValue', val)
          }
          // 同步原生radio input checked的状态
          radioRef.value!.checked = props.modelValue === props.label
        }
      })

      const isChecked = computed(() => {
        return model.value === props.label
      })

      const isFocused = ref(false)

      const cls = computed(() => [ns, isChecked.value && 'is-checked', props.disabled && 'is-disabled', isFocused.value && 'is-focus'])

      // evt
      const handleChange = () => {
        nextTick(() => emit('change', model.value))
      }

      return {
        cls,
        model,
        handleChange,
        isChecked,
        isFocused,
        radioRef
      }
    }
  })
</script>

<template>
  <label :class="cls">
    <span
      class="bn-radio__input"
      :class="{
        'is-checked': isChecked,
        'is-disabled': disabled
      }"
    >
      <slot name="icon" :checked="isChecked" :disabled="disabled">
        <span class="bn-radio__inner"></span>
      </slot>
      <input
        ref="radioRef"
        v-model="model"
        class="bn-radio__origin"
        type="radio"
        :name="name"
        :value="label"
        :disabled="disabled"
        @change="handleChange"
        @focus="isFocused = true"
        @blur="isFocused = false"
      />
    </span>
    <span class="bn-radio__label">
      <slot>{{ label }}</slot>
    </span>
  </label>
</template>
