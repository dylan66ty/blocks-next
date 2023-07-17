import type { PropType, VNode } from 'vue'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'OptionsRender',
  props: {
    optionsVns: {
      type: Array as PropType<VNode[]>,
      default: () => []
    }
  },
  setup(props) {
    return () => {
      return props.optionsVns
    }
  }
})
