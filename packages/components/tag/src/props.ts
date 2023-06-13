import { PropType } from "vue";

export const tagProps = {
  type: {
    type: String as PropType<'primary' | 'success' | 'waning' | 'strong' | 'danger' >,
    default: undefined
  },
  closeable:{
    type: Boolean,
    default: false
  },
  size: {
    type: String as PropType<'small' | 'large' | 'normal'>,
    default: undefined
  },
  effect: {
    type:String as PropType<'dark' | 'plain' | 'light'>,
    default: undefined
  },
  round: {
    type:Boolean,
    default:false
  },
  icon: {
    type:String,
    default: undefined
  }

}