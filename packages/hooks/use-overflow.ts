import type { Ref } from 'vue';
import { getScrollBarWidth, isScroll } from '../utils/dom';

export const useOverflow = (elementRef: Ref<HTMLElement | undefined>) => {
  let isSetOverflow = false;
  const originStyle = {
    overflow: '',
    width: '',
    boxSizing: '',
  };

  const setOverflowHidden = () => {
    if (elementRef.value) {
      const element = elementRef.value;
      if (!isSetOverflow && element.style.overflow !== 'hidden') {
        const scrollBarWidth = getScrollBarWidth(element);
        if (scrollBarWidth > 0 || isScroll(element)) {
          originStyle.overflow = element.style.overflow;
          originStyle.width = element.style.width;
          originStyle.boxSizing = element.style.boxSizing;
          element.style.overflow = 'hidden';
          // element.style.width = `${element.offsetWidth - scrollBarWidth}px`;
          element.style.width = `100%`;
          element.style.boxSizing = 'border-box';

          isSetOverflow = true;
        }
      }
    }
  };

  const resetOverflow = () => {
    if (elementRef.value && isSetOverflow) {
      const element = elementRef.value;
      element.style.overflow = originStyle.overflow;
      element.style.width = originStyle.width;
      element.style.boxSizing = originStyle.boxSizing;

      isSetOverflow = false;
    }
  };

  return {
    setOverflowHidden,
    resetOverflow,
  };
};
