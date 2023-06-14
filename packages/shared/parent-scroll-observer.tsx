import { defineComponent, onBeforeUnmount, watch } from 'vue';
import { useFirstElement } from '../hooks/use-first-element';
import { debounce } from '../utils/throttle-debounce';


const SCROLL_KEY = Symbol('scrollHandler')

export default defineComponent({
  name: 'ParentScrollObserver',
  emits: ['scroll'],
  setup(props, { emit, slots }) {
    const { children, firstElement } = useFirstElement();
    const targets: HTMLElement[] = []
    const createParentScrollObserver = (element: HTMLElement | null) => {
      while (element) {
        element = element.parentElement
        if (element) {
          if (element.tagName === 'BODY') break;
          if (element.scrollHeight > element.offsetHeight) {
            targets.push(element)
          }
        }
      }
      targets.forEach((target: any) => {
        const scrollHandler = (e: Event) => emit('scroll', e)
        target[SCROLL_KEY] = scrollHandler
        target.addEventListener('scroll', scrollHandler)
      })
    }

    const destroyResizeObserver = () => {
      targets.forEach((target: any) => {
        target.removeEventListener('scroll', target[SCROLL_KEY])
      })
      targets.length = 0
    };

    let observer:MutationObserver
    const createContainerSizeObserver = (element: HTMLElement | null) => {
      observer = new MutationObserver(debounce(() => {
        destroyResizeObserver()
        createParentScrollObserver(element)
      }, 300))
      observer.observe(document.body, {
        subtree: true,
        childList: true,
        attributes: true
      })
    }

    watch(firstElement, (element) => {
      destroyResizeObserver()
      if (element) {
        createContainerSizeObserver(element)
        createParentScrollObserver(element);
      }
    });



    onBeforeUnmount(() => {
      destroyResizeObserver()
      observer && observer.disconnect()
    });

    return () => {
      children.value = slots.default?.();
      return children.value;
    };
  },
});
