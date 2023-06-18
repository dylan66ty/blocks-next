import type { PropType, ExtractPropTypes } from 'vue'
import type { Direction, ThumbData } from './types'

export const thumbProps = {
  data: {
    type: Object as PropType<ThumbData>
  },
  direction: {
    type: String as PropType<Direction>,
    default: 'horizontal'
  },
  alwaysShow: {
    type: Boolean,
    default: false
  },
  both: {
    type: Boolean,
    default: false
  }
}

export type ThumbProps = ExtractPropTypes<typeof thumbProps>
