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
    default:'#000'
  },
  renderTo: {
    type: [String,Object] as PropType<string | HTMLElement>,
    default: 'body'
  },
  disabled: {
    type:Boolean,
    default: false
  }
}


export type TooltipProps = ExtractPropTypes<typeof tooltipProps>


