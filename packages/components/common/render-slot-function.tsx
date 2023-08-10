import type { PropType, VNodeTypes } from 'vue'
import { defineComponent } from 'vue'

export type RenderFunc = (props: Record<string, unknown>) => VNodeTypes

export default defineComponent({
  name: 'RenderRootSlot',
  props: {
    slotFn: {
      type: Function as PropType<RenderFunc>,
      default: undefined
    }
  },
  render() {
    return this.slotFn ? this.slotFn(this.$attrs) : this.$slots.default?.(this.$attrs)
  }
})
