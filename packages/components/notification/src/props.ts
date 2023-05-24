import type { ExtractPropTypes , PropType, RenderFunction } from 'vue'
import { NotificationPosition , NotificationType} from './types'


export const notificationProps = {
  position: {
    type: String as PropType<NotificationPosition>,
    default: 'top-right',
  },
  offset: {
    type: Number,
    default: 0,
  },
  title: {
    type: String,
    default: '',
  },
  type: {
    type: String as PropType<NotificationType>,
    default: 'info',
  },
  message: {
    type: String,
    default: '',
  },
  duration: {
    type: Number,
    default: 3000,
  },
  showClose: {
    type:Boolean,
    default: true
  },
  onClose: {
    type: Function as PropType<() => void>,
    default: () => {},
  },
  renderToBody: {
    type:Boolean, 
    default:false
  } 
}

export type NotificationProps = ExtractPropTypes<typeof notificationProps>