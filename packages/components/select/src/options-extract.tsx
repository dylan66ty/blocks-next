import { createCommentVNode, defineComponent } from 'vue'
import { getAllElements, isComponent } from '../../../utils/vue-utils'
import { isSameArray } from '../../../utils/is'

export default defineComponent({
  name: 'OptionsExtract',
  emits: ['update-options'],
  setup(props, { slots, emit }) {
    let cacheValues: any[] = []
    return () => {
      const optionsVns = getAllElements(slots.default?.()).filter(
        (vn) => isComponent(vn, vn.type) && vn.type.name === 'BnOption'
      )
      const values = optionsVns.map((vn) => {
        const value = vn.props?.value
        const label = vn.props?.label ?? ''
        return `value:${value}_label:${label}`
      })
      if (!isSameArray(cacheValues, values)) {
        emit('update-options', optionsVns)
        cacheValues = values
      }
      return createCommentVNode('options extract')
    }
  }
})
