import type { PropType, StyleValue, ExtractPropTypes } from 'vue'

export const scrollbarProps = {
  type: {
    type: String as PropType<'track' | 'embed'>,
    default: 'embed'
  },
  outerClass: [String, Object, Array],
  outerStyle: {
    type: [String, Object, Array] as PropType<StyleValue>
  },
  // private
  hide: {
    type: Boolean,
    default: false
  },
  disableHorizontal: {
    type: Boolean,
    default: false
  },
  disableVertical: {
    type: Boolean,
    default: false
  }
}

export type ScrollProps = ExtractPropTypes<typeof scrollbarProps>
