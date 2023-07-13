import { defineComponent } from 'vue'
import { getComponentNamespace } from '../../../utils/global-config'
import { getAllElements, isComponent } from '../../../utils/vue-utils'

// 简单对比两个数组是否相同
function isSameOptions(a: any[], b: any[]) {
  if (a.length !== b.length) return false
  for (const [index] of a.entries()) {
    if (a[index] != b[index]) {
      return false
    }
  }
  return true
}

export default defineComponent({
  name: getComponentNamespace('Options'),
  emits: ['update-options'],
  setup(props, { slots, emit }) {
    let cachedOptionVns: any = []
    return () => {
      const optionVns = getAllElements(slots.default?.()).filter(
        (vn) => isComponent(vn, vn.type) && vn.type.name === 'BnOption'
      )
      if (!isSameOptions(optionVns, cachedOptionVns)) {
        cachedOptionVns = optionVns
        emit('update-options', optionVns)
      }
      return optionVns
    }
  }
})
