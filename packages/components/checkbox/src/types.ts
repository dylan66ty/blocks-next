import type { ComputedRef } from 'vue';

export interface CheckboxGroupContext {
  modelValue?: ComputedRef;
  changeEvent?: (val: unknown) => void;
  validateEvent?: boolean;
}
