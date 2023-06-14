import { PropType } from "vue";
import type {CascaderData} from './type'

export const cascaderProps = {
  data: {
    type:Array as PropType<CascaderData>,
    default: () => []
  },
  modelValue: {
    type:Array,
    default: () => []
  },
  placeholder: {
    type:String,
    default: '请选择'
  },
  size: {
    type:String as PropType<'small' | 'normal' | 'large'>,
    default: 'normal'
  },
  clearable:Boolean,
  disabled:Boolean,
}