<script lang="ts">
  import type { PropType } from 'vue';
  import { defineComponent, computed, provide, watch } from 'vue';
  import { getNamespace, getComponentNamespace } from '../../../utils/global-config';
  import { useFormItem } from '../../form/src/hooks/use-form-item';
  import { NOOP } from '../../../shared/utils';
  import { radioGroupKey } from './constant';

  export default defineComponent({
    name: getComponentNamespace('RadioGroup'),
    props: {
      modelValue: [Number, String] as PropType<number | string>,
      validateEvent: {
        type: Boolean,
        default: true,
      },
    },
    emits: ['change', 'update:modelValue'],
    setup(props, ctx) {
      const modelValue = computed(() => props.modelValue);
      const changeEvent = (val: any) => {
        ctx.emit('change', val);
        ctx.emit('update:modelValue', val);
      };

      const ns = getNamespace('radio-group');

      const cls = computed(() => {
        return [ns];
      });

      const { formItem } = useFormItem();

      watch(
        () => props.modelValue,
        () => {
          if (props.validateEvent) {
            formItem?.validate('change').catch(NOOP);
          }
        },
      );

      provide(radioGroupKey, {
        modelValue,
        changeEvent,
      });

      return {
        cls,
      };
    },
  });
</script>

<template>
  <div :class="cls">
    <slot></slot>
  </div>
</template>
