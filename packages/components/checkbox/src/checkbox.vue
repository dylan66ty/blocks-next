<template>
  <label :class="cls">
    <span v-if="indeterminate" class="bn-checkbox__icon bn-checkbox__icon--half"></span>
    <template v-else>
      <Check v-if="isChecked" class="bn-checkbox__icon bn-checkbox__icon--checked" />
      <Square v-else class="bn-checkbox__icon" />
    </template>
    <span class="bn-checkbox__input">
      <input class="bn-checkbox__origin" type="checkbox" v-model="model" :name="name" :disabled="disabled" :checked="isChecked"
        :indeterminate="indeterminate" :value="label" @change="handleChange" />
    </span>
    <span class="bn-checkbox__label">
      <slot>{{ label }}</slot>
    </span>
  </label>
</template>

<script lang="ts">
import { defineComponent, inject, computed, PropType } from 'vue'
import Check from '../../icon/src/checkbox-icon/check.vue'
import Square from '../../icon/src/checkbox-icon/square.vue'
import Half from '../../icon/src/checkbox-icon/half.vue'
import { ICheckboxGroupProvide } from './types'
import { getNamespaced } from '../../../utils/global-config'

export default defineComponent({
  name: 'Checkbox',
  components: {
    Check,
    Square,
    Half
  },
  props: {
    name: {
      type: String as PropType<string>
    },
    indeterminate: Boolean as PropType<boolean>,
    checked: Boolean as PropType<boolean>,
    disabled: Boolean as PropType<boolean>,
    label: {
      type: [String, Number, Boolean] as PropType<string | number | boolean>,
      default: ''
    },
    modelValue: [String, Number, Boolean] as PropType<string | number | boolean>
  },
  emits: ['update:modelValue', 'change'],
  setup(props, { emit }) {
    const ns = getNamespaced('checkbox')
    const checkboxGroup = inject<ICheckboxGroupProvide | null>('BnCheckboxGroup', null)
    const isGroup = checkboxGroup?.name === 'BnCheckboxGroup'

    const model = computed({
      get() {
        const groupValue = checkboxGroup ? checkboxGroup.modelValue?.value : props.modelValue
        return isGroup ? groupValue : props.checked ? props.checked : props.modelValue
      },
      set(val) {
        if (isGroup) {
          checkboxGroup.changeEvent?.(val)
        } else {
          emit('update:modelValue', val)
        }
      }
    })

    const isChecked = computed(() => {
      const value = model.value
      if (Array.isArray(value)) {
        return value.includes(props.label)
      }
      return value
    })  

    const cls = computed(() => {
      const cls = [ns]
      if (props.disabled) {
        cls.push('is-disabled')
      }
      if(isGroup) {
        isChecked.value && cls.push('is-checked')
      }else {
        props.modelValue && cls.push('is-checked')
      }
      if (props.indeterminate && !props.modelValue) {
        cls.push('is-indeterminate')
      }
      return cls
    })


    const handleChange = (e: InputEvent) => {
      const target = e.target as HTMLInputElement
      const changeValue = target.checked
      emit('change', changeValue)
    }

    return {
      cls,
      handleChange,
      model,
      isChecked
    }

  }

})
</script>