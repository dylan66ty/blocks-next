import type { ExtractPropTypes , PropType} from 'vue';
import { definePropType } from '../../../utils/vue-utils';
import { isArray, isBoolean, isString } from '../../../utils/is';
import type { FormItemProp } from './form-item';
import type { FormRules } from './types';

export const formProps = {
  model: {
    type: Object,
  },
  rules: {
    type: definePropType<FormRules>(Object),
  },
  labelPosition: {
    type: String as PropType<'left' | 'right' | 'top'>,
    default: 'right',
  },
  requireAsteriskPosition: {
    type: String,
    default: 'left',
  },
  labelWidth: {
    type: [String, Number],
    default: '',
  },
  showMessage: {
    type: Boolean,
    default: true,
  },
  validateOnRuleChange: {
    type: Boolean,
    default: true,
  },
  // 行内表单
  inline: {
    type: Boolean,
    default: false
  }
};

export type FormProps = ExtractPropTypes<typeof formProps>;

export const formEmits = {
  validate: (prop: FormItemProp, isValid: boolean, message: string) =>
    (isArray(prop) || isString(prop)) && isBoolean(isValid) && isString(message),
};

export type FormEmits = typeof formEmits;
