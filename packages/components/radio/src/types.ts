import type { ComputedRef } from 'vue';

export interface RadioGroupContext {
  changeEvent?: (val: unknown) => void;
  modelValue?: ComputedRef;
}
