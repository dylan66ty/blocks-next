import { watch, type Ref } from 'vue';
import { getScrollBarWidth, getStyle, isScroll, setStyle } from '../utils/dom';

export const useOverflow = (containerRef: Ref<HTMLElement | undefined>,targetRef?: Ref<HTMLElement | undefined>) => {
  let isSetOverflow = false;

  const originStyle = {
    overflow: '',
    width: ''
  };
  
  const isBody = (element:HTMLElement) => element.tagName === 'BODY';

  const setOverflowHidden = () => {
    if (containerRef.value) {
      const element = containerRef.value;
      if (!isSetOverflow && element.style.overflow !== 'hidden') {
        const scrollBarWidth = getScrollBarWidth(element);
        if (scrollBarWidth > 0 || isScroll(element)) {
          originStyle.overflow = element.style.overflow;
          originStyle.width = element.style.width;
          let offsetX = 0
          // 在微前端子应用中使用
          if (isBody(element)) {
            offsetX = element.getBoundingClientRect().left || 0
          }
          setStyle(element, {
            width: `calc(100% - ${(Math.ceil(scrollBarWidth - offsetX))}px)`,
            overflow: 'hidden'
          })
          isSetOverflow = true;
        }
      }
    }
  };

  const resetOverflow = () => {
    if (containerRef.value && isSetOverflow) {
      const element = containerRef.value;
      setStyle(element, {
        overflow: originStyle.overflow,
        width: originStyle.width
      })
      isSetOverflow = false;
    }
  };

  // 添加position
  watch(() => targetRef?.value, (element) => {
    if(containerRef.value && !isBody(containerRef.value)) {
      element && setStyle(element, {
        position: 'absolute'
      })

      const position = getStyle(containerRef.value, 'position')
      if(position === 'static') {
        setStyle(containerRef.value, {position: 'relative'})
      }
    }

  })



  return {
    setOverflowHidden,
    resetOverflow,
  };
};
