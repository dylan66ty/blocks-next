import { defineComponent } from 'vue'
import LoadingIcon from '../../../icon/src/base/loading.vue'

export default defineComponent({
  name: 'Spin',
  setup() {
    return () => {
      return (
        <div class={['bn-table__loading']}>
          <LoadingIcon/>
        </div>
      )
    }
  }
})