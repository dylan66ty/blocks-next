<template>
  <grid-item :class="cns">
    <label class="bn-field-label">{{ label }}</label>
    <slot :onInput="onInput" :value="modelValue" :placeholder="placeholder" :valid="state.valid" :type="type" :size="size"
      :disabled="disabled"></slot>
    <div class="bn-field-tip" v-if="!state.valid">{{ state.tip }}</div>
  </grid-item>
</template>
<script lang="ts">
import { PropType, inject, onMounted, onBeforeUnmount, reactive, computed, defineComponent } from 'vue'
import { IValidOption, IValidator } from './types'
import { rand } from '../../../utils'
import GridItem from '../../grid/src/grid-item.vue'

export default defineComponent({
  name: 'FiledLabel',
  props: {
    modelValue: {
      type: [String, Number, Boolean, Array] as PropType<any>
    },
    type: {
      type: String as PropType<'text' | 'icon' | 'normal'>
    },
    size: String as PropType<'small' | 'large' | 'normal'>,
    label: String,
    flow: { type: String as PropType<'hr' | 'vt' | 'auto'>, default: 'auto' }, //内容水平或者垂直排列
    disabled: Boolean,
    placeholder: String,
    validators: Array as PropType<Array<IValidOption>>
  },
  emits: ['update:modelValue', 'input'],
  setup(props, { emit }) {
    const $validator = inject<IValidator | null>('validator')
    const fid = rand()

    const state = reactive({
      tip: '',
      valid: true
    })
    const isRequired = computed(() => {
      if (!props.validators) return false
      return props.validators.some(item => {
        if (typeof item === 'string' && item === 'required') return true
        else return (item as { name: string }).name === 'required'
      })
    })
    const cns = computed(() => {
      return {
        'bn-field': true,
        'bn-field-required': isRequired.value,
        'bn-field-hr': props.flow === 'hr',
        'bn-field-vt': props.flow === 'vt',
        'bn-field-auto': props.flow === 'auto'
      }
    })
    const validSelf = (value: unknown, validMeta: Array<IValidOption>) => {
      return ($validator as IValidator)
        .validField(value, validMeta)
        .then(res => {
          state.valid = true
          state.tip = ''
          return Promise.resolve(true)
        })
        .catch(res => {
          state.valid = false
          state.tip = res?.tip
          return Promise.reject(res)
        })
    }
    const onInput = (v: unknown) => {
      emit('update:modelValue', v)
      emit('input', v)
      //validator to go
      if (!props.validators) return
      if (!$validator) return
      validSelf(v, props.validators)
    }
    onMounted(() => {
      if (!props.validators) return
      if ($validator) {
        $validator.registerField(fid, () => {
          return validSelf(props.modelValue, props.validators as Array<IValidOption>)
        })
      }
    })
    onBeforeUnmount(() => {
      if (!props.validators) return
      if ($validator) {
        $validator.ungisterField(fid)
      }
    })

    return {
      state,
      onInput,
      cns
    }
  }

})


</script>