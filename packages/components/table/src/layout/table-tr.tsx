import type { StyleValue } from 'vue';
import { computed, defineComponent, createVNode } from 'vue';
import { getNamespace } from '../../../../utils/global-config';
import { addUnit } from '../../../../shared/utils';

export default defineComponent({
  name: 'Tr',
  props: {
    rowHeight: {
      type: [Number, String],
      default: undefined,
    },
  },
  setup(props, { slots }) {
    const ns = getNamespace('tr');

    const cls = computed(() => [`${ns}`]);

    const style = computed(() => {
      const _style: StyleValue = {};
      if (props.rowHeight) {
        _style.height = addUnit(props.rowHeight);
      }
      return _style;
    });

    return () => {
      return createVNode(
        'tr',
        {
          class: cls.value,
          style: { ...style.value },
        },
        {
          default: slots.default,
        },
      );
    };
  },
});
