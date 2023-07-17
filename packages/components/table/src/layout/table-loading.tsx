import { defineComponent } from 'vue'
import { BnIconLoading } from '../../../icon'

export default defineComponent({
  name: 'Loading',
  setup() {
    return () => {
      return (
        <div class={['bn-table__loading']}>
          <BnIconLoading />
        </div>
      )
    }
  }
})
