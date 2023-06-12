import { createVNode, defineComponent } from 'vue';
import { getNamespace } from '../../../../utils/global-config';

export default defineComponent({
  name: 'Thead',
  setup(_, { slots }) {
    const ns = getNamespace('thead');
    return () => {
      return createVNode(
        'thead',
        { class: [ns] },
        {
          default: slots.default,
        },
      );
    };
  },
});
