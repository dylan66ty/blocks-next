import type { Ref } from 'vue';
import { getScrollBarWidth, isScroll } from '../utils/dom';

export const useOverflow = (elementRef: Ref<HTMLElement | undefined>) => {
  let isSetOverflow = false;

  const originStyle = {
    overflow: '',
    width: ''
  };
  const setOverflowHidden = () => {
    if (elementRef.value) {
      const element = elementRef.value;
      if (!isSetOverflow && element.style.overflow !== 'hidden') {
        const scrollBarWidth = getScrollBarWidth(element);
        if (scrollBarWidth > 0 || isScroll(element)) {
          originStyle.overflow = element.style.overflow;
          originStyle.width = element.style.width;
          element.style.overflow = 'hidden';
          element.style.width = `calc(100% - ${scrollBarWidth}px)`;
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
      isSetOverflow = false;
    }
  };

  

  return {
    setOverflowHidden,
    resetOverflow,
  };
};
