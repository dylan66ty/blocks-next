import { defineComponent, onBeforeUnmount, watch } from 'vue';
import ResizeObserver from 'resize-observer-polyfill';
import { useFirstElement } from '../hooks/use-first-element';

export default defineComponent({
  name: 'ResizeObserver',
  emits: ['resize' ],
  setup(props, { emit, slots }) {
    const { children, firstElement } = useFirstElement();
    let resizeObserver: ResizeObserver | null;

    const createResizeObserver = (target: HTMLElement) => {
      resizeObserver = new ResizeObserver((entries: ResizeObserverEntry[]) => {
        const entry = entries[0];
        emit('resize', entry);
      });
      resizeObserver.observe(target);
    };

    const destroyResizeObserver = () => {
      if (resizeObserver) {
        resizeObserver.disconnect();
        resizeObserver = null;
      }
    };

    watch(firstElement, (element) => {
      if (resizeObserver) destroyResizeObserver();
      if (element) {
        createResizeObserver(element);
      }
    });

    onBeforeUnmount(() => {
      if (resizeObserver) destroyResizeObserver();
    });

    return () => {
      children.value = slots.default?.();
      return children.value;
    };
  },
});
