import type { PropType } from 'vue'

export const badgeProps = {
  value: {
    type: [String, Number]
  },
  effect: {
    type: String as PropType<'dark' | 'light'>,
    default: 'dark'
  },
  type: {
    type: String as PropType<'primary' | 'success' | 'warning' | 'strong' | 'danger'>,
    default: 'danger'
  },
  isDot: Boolean,
  max: {
    type: Number,
    default: 99
  },
  hidden: Boolean
}
