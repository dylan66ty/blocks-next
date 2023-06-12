import type { ExtractPropTypes, PropType} from 'vue'
import type { Position } from './types'
export const tooltipProps = {
  modelValue: {
    type: Boolean,
    default: undefined
  },
  content: {
    type:String,
    default: ''
  },
  position: {
    type:String as PropType<Position> ,
    default: 'tl'
  },
  backgroundColor: {
    type: String,
    default: undefined
  },
  renderTo: {
    type: [String,Object] as PropType<string | HTMLElement>,
    default: 'body'
  },
  disabled: {
    type:Boolean,
    default: false
  },
  effect: {
    type:String as PropType<'dark' | 'light'>,
    default: 'dark'
  },
  popupClass: {
    type:String
  },
  size: {
    type: String as PropType<'mini'>,
    default: undefined
  }
}


export type TooltipProps = ExtractPropTypes<typeof tooltipProps>


