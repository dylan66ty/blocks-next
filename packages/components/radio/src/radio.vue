<template>
  <!-- <InputWrap class="bn-radio-wrap">
    <template #default="scope">
      <div v-for="(item, idx) in options" :key="idx" :class="[
        'bn-radio',
        modelValue === item.value ? 'bn-ck-checked' : '',
        scope.disabled || item.disabled ? 'bn-ck-disabled' : '',
        item.selectText ? 'bn-ck-select-text' : ''
      ]" @click="onClick(item, scope.disabled || item.disabled)">
        <CirCleRadio v-if="modelValue === item.value" class="bn-ck-icon" type="primary" />
        <Circle v-else class="bn-ck-icon" />
        <span class="bn-ck-text">{{ item.text }}</span>
      </div>
    </template>
  </InputWrap> -->

  <label :class="cls">
    <span class="bn-radio__input">
      <input class="bn-radio__origin" type="radio" />
    </span>
    
    <span class="bn-radio__label">
      <slot>{{ label }}</slot>
    </span>

  </label>
</template>
<script lang="ts">
import { PropType, computed, defineComponent, inject } from 'vue'
import type { IRadioGroupProvide } from './types'

import Circle from '../../icon/src/radio-icon/circle.vue'
import CirCleRadio from '../../icon/src/radio-icon/radio.vue'

import InputWrap from '../../input/src/input-wrapper.vue'
import { getNamespaced } from '../../../utils/global-config'


export default defineComponent({
  name: 'Radio',
  components: {
    InputWrap,
    Circle,
    CirCleRadio
  },
  props: {
    modelValue: { 
      type: [Boolean, Number,String] as PropType<boolean | number | string>, 
      required: true  
    },
    label: { 
      type: [Boolean, Number,String] as PropType<boolean | number | string>, 
      required: true 
    },

    
  },
  emits: ['update:modelValue', 'input'],
  setup(props,{emit}) {
    const ns = getNamespaced('radio')

    const radioGroup = inject<IRadioGroupProvide | null>('BnRadioGroup', null)
    const isGroup = radioGroup?.name === 'BnRadioGroup' 

    const model = computed({
      get() {
        const store = radioGroup ? radioGroup.modelValue?.value : props.modelValue
        return isGroup ? store : props.modelValue
      },
      set(val) {
        if (isGroup) {
          radioGroup.changeEvent?.(val)
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
      return value === props.label
    })  


    const cls = computed(() => [
        ns,
        isChecked && 'is-checked',

    ])
    

    

    // const update = (v: string | number) => {
    //   emit('update:modelValue', v)
    //   emit('input', v)
    // }
    // const onClick = (item: IOption, disabled: boolean) => {
    //   if (disabled) return
    //   const checked = props.modelValue === item.value
    //   if (checked) update('')
    //   else update(item.value)
    // }

    return {
      // onClick
      cls
    }
  }


})

</script>