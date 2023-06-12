import { defineComponent } from 'vue';
import LoadingIcon from '../../../icon/src/base/loading.vue';

export default defineComponent({
  name: 'Loading',
  setup() {
    return () => {
      return (
        <div class={['bn-table__loading']}>
          <LoadingIcon />
        </div>
      );
    };
  },
});
