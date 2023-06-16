import { PropType } from "vue";
import type {CascaderData} from './type'

export const cascaderProps = {
  data: {
    type:Array as PropType<CascaderData>,
    default: () => []
  },
  modelValue: {
    type:[Array] as PropType<string[] | string[][]>,
    default: undefined
  },
  multiple: {
    type:Boolean,
    default:false
  },
  checkStrictly:{
    type:Boolean,
    default:false
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
  // 输入框格式化函数
  inputLabelFormat: {
    type:Function as PropType<((labels: string[]) => string)>,
    default:undefined
  },
  separator:{
    type:String,
    default: '/'
  },
  showFooter: Boolean
  
}