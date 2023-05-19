import { Ref, ref } from 'vue';
import { getScrollBarWidth, isScroll , getElement} from '../utils/dom';
import { isString } from '../utils/is';

export const useOverflow = (elementRef: HTMLElement | string | undefined) => {

  const _elementRef:Ref<HTMLElement | undefined> = ref(isString(elementRef) ? getElement(elementRef) : elementRef)

  const isSetOverflow = ref(false);

  const originStyle = {
    overflow: '',
    width: '',
    boxSizing: '',
  };

  const setOverflowHidden = () => {
    if (_elementRef.value) {
      const element = _elementRef.value;
      if (!isSetOverflow.value && element.style.overflow !== 'hidden') {
        const scrollBarWidth = getScrollBarWidth(element);
        if (scrollBarWidth > 0 || isScroll(element)) {
          originStyle.overflow = element.style.overflow;
          originStyle.width = element.style.width;
          originStyle.boxSizing = element.style.boxSizing;
          element.style.overflow = 'hidden';
          element.style.width = `${element.offsetWidth - scrollBarWidth}px`;
          element.style.boxSizing = 'border-box';

          isSetOverflow.value = true;
        }
      }
    }
  };

  const resetOverflow = () => {
    if (_elementRef.value && isSetOverflow.value) {
      const element = _elementRef.value;
      element.style.overflow = originStyle.overflow;
      element.style.width = originStyle.width;
      element.style.boxSizing = originStyle.boxSizing;

      isSetOverflow.value = false;
    }
  };

  return {
    setOverflowHidden,
    resetOverflow,
  };
};
