<template>
  <div :class="cns">
    <div class="bn-ipw-addonl" v-if="$slots.left">
      <slot name="left" :type="type"></slot>
    </div>
    <slot :valid="valid" :size="size" :type="type" :disabled="disabled" :placeholder="placeholder" v-bind="$attrs"></slot>
    <div class="bn-ipw-addonr" v-if="$slots.right" :hover="!disabled" :type="type">
      <slot :hover="true" :disabled="disabled" name="right"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue'
export default defineComponent({
  name: 'InputWrapper',
  props: {
    valid: { type: Boolean, default: true },
    size: String as PropType<'small' | 'large' | 'normal'>,
    type: String,
    disabled: Boolean,
    placeholder: String,
  },
  setup(props,{slots}) {
    const cns = computed(() => {
      return {
        'bn-input-wrap': true,
        'bn-ip-invalid': !props.valid,
        'bn-ip-disabled': props.disabled,
        'bn-ip-small': props.size === 'small',
        'bn-ip-large': props.size === 'large',
        'bn-ip-hasradd': slots.right,
        'bn-ip-hasladd': slots.left
      }
    })
    return {
      cns
    }
  }
})
</script>