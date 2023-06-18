import { createVNode, defineComponent } from 'vue'
import { getNamespace } from '../../../../utils/global-config'

export default defineComponent({
  name: 'Tbody',
  setup(_, { slots }) {
    const ns = getNamespace('tbody')
    return () => {
      return createVNode(
        'tbody',
        {
          class: [ns]
        },
        {
          default: slots.default
        }
      )
    }
  }
})
