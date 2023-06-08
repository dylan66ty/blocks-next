import type { PropType } from 'vue'
import type {ProgressType, ProgressSize,ProgressStatus} from './type'

export const progressProps = {
  type: {
    type: String as PropType<ProgressType>,
    default: 'line',
  },
  size: {
    type: String as PropType<ProgressSize>,
  },
  percent: {
    type: Number,
    default: 0,
  },
  steps: {
    type: Number,
    default: 0,
  },
  animation: {
    type: Boolean,
    default: false,
  },
  strokeWidth: {
    type: Number,
  },
  width: {
    type: [Number, String],
  },
  color: {
    type: [String, Function],
  },
  trackColor: String,
  showText: {
    type: Boolean,
    default: true,
  },
  status: {
    type: String as PropType<ProgressStatus>,
    default: 'primary'
  },
  formatText:{
    type:Function
  }
}