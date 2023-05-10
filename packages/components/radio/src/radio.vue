<template>
  <label :class="cls">
    <span class="bn-radio__input" :class="{
      'is-checked': isChecked
    }" >
      <span class="bn-radio__inner"></span>
      <input 
         class="bn-radio__origin" 
         type="radio"
         v-model="model"
         :value="label"
         @change="handleChange"
         />
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
    disabled:{
      type:Boolean,
      default:false
    }
  },
  emits: ['update:modelValue','change'],
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
      return model.value === props.label
    })  

    const handleChange = () => {
      emit('change', props.modelValue)
    }
    const cls = computed(() => [
        ns,
        isChecked.value && 'is-checked',
        props.disabled && 'is-disabled',
    ])
    
    return {
      cls,
      model,
      handleChange,
      isChecked
    }
  }


})

</script>