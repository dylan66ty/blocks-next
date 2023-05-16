import {
  computed,
  defineComponent,
  Teleport,
  ref,
  Transition,
  nextTick,
  onMounted,
  watch,
  onBeforeUnmount,
  inject,
  provide,
  reactive,
} from 'vue';
import type { StyleValue, CSSProperties, Ref } from 'vue';
import { getComponentNamespace, getNamespace } from '../../../utils/global-config';

import usePopupManager from '../../../hooks/use-popup-manager';
import { useFirstElement } from '../../../hooks/use-first-element';
import { mergeFirstChild } from '../../../utils/vue-utils';
import { on, off } from '../../../utils/dom';

import { triggerProps } from './_trigger';
import type { TriggerEvent } from './_trigger';

import { triggerInjectionKey } from './constant';

import {
  getArrowStyle,
  getPopupStyle,
  getElementScrollRect,
  getTransformOrigin,
} from './utils';

export default defineComponent({
  name: getComponentNamespace('Trigger'),
  props: triggerProps,
  emits: ['update:popupVisible', 'popupVisibleChange', 'show', 'hide'],
  setup(props, { emit, slots, attrs }) {
    const ns = getNamespace('trigger');

    const teleportContainer = computed(() => props.popupContainer || 'body');
    const containerRef = ref<HTMLElement>();

    onMounted(() => (containerRef.value = document.documentElement));

    // 用于多个trigger嵌套时，保持打开状态
    const childrenRefs = new Set<Ref<HTMLElement>>();
    const triggerCtx = inject(triggerInjectionKey, undefined);

    // trigger相关变量
    const { children, firstElement } = useFirstElement();

    // popup相关变量
    const popupRef = ref<HTMLElement>();
    const popupVisible = ref(props.defaultPopupVisible);
    const popupPosition = ref(props.position);
    const popupStyle = ref<CSSProperties>({});
    const transformStyle = ref<CSSProperties>({});
    const arrowStyle = ref<CSSProperties>({});
    const computedVisible = computed(() => props.popupVisible ?? popupVisible.value);

    // cls
    const cls = computed(() => {
      const cls: StyleValue = [`${ns}-popup`];
      return cls;
    });

    const triggerCls = computed(() => {
      return computedVisible.value ? props.openedClass : undefined;
    });

    // 鼠标相关变量
    const arrowRef = ref<HTMLElement>();
    const mousePosition = ref({
      top: 0,
      left: 0,
    });

    const { zIndex } = usePopupManager('popup', { visible: computedVisible });

    let delayTimer = 0;
    let outsideListener = false;

    const cleanDelayTimer = () => {
      if (delayTimer) {
        window.clearTimeout(delayTimer);
        delayTimer = 0;
      }
    };

    const updateMousePosition = (e: MouseEvent) => {
      if (props.alignPoint) {
        const { pageX, pageY } = e;
        mousePosition.value = {
          top: pageY,
          left: pageX,
        };
      }
    };

    const updatePopupStyle = () => {
      if (!firstElement.value || !popupRef.value || !containerRef.value) {
        return;
      }

      const containerRect = containerRef.value.getBoundingClientRect();
      const triggerRect = props.alignPoint
        ? {
            top: mousePosition.value.top,
            bottom: mousePosition.value.top,
            left: mousePosition.value.left,
            right: mousePosition.value.left,
            scrollTop: mousePosition.value.top,
            scrollBottom: mousePosition.value.top,
            scrollLeft: mousePosition.value.left,
            scrollRight: mousePosition.value.left,
            width: 0,
            height: 0,
          }
        : getElementScrollRect(firstElement.value, containerRect);
      const getPopupRect = () =>
        // @ts-expect-error
        getElementScrollRect(popupRef.value, containerRect);
      const popupRect = getPopupRect();

      const { style, position } = getPopupStyle(
        props.position,
        containerRect,
        triggerRect,
        popupRect,
        {
          offset: props.popupOffset,
          translate: props.popupTranslate,
          customStyle: props.popupStyle,
          autoFitPosition: props.autoFitPosition,
        },
      );
      if (props.autoFitTransformOrigin) {
        transformStyle.value = {
          transformOrigin: getTransformOrigin(position),
        };
      }
      if (props.autoFitPopupMinWidth) {
        style.minWidth = `${triggerRect.width}px`;
      } else if (props.autoFitPopupWidth) {
        style.width = `${triggerRect.width}px`;
      }

      if (popupPosition.value !== position) {
        popupPosition.value = position;
      }
      popupStyle.value = style;
      if (props.showArrow) {
        nextTick(() => {
          arrowStyle.value = getArrowStyle(position, triggerRect, getPopupRect(), {
            customStyle: props.arrowStyle,
          });
        });
      }
    };

    const changeVisible = (visible: boolean, delay?: number) => {
      if (visible === computedVisible.value && delayTimer === 0) {
        return;
      }
      const update = () => {
        popupVisible.value = visible;
        emit('update:popupVisible', visible);
        emit('popupVisibleChange', visible);
        if (visible) {
          nextTick(() => {
            updatePopupStyle();
          });
        }
      };

      if (delay) {
        cleanDelayTimer();
        if (visible !== computedVisible.value) {
          delayTimer = window.setTimeout(update, delay);
        }
      } else {
        update();
      }
    };

    const triggerMethods = computed(() => ([] as Array<TriggerEvent>).concat(props.trigger));

    const handleOutsideClick = (e: MouseEvent) => {
      if (
        firstElement.value?.contains(e.target as HTMLElement) ||
        popupRef.value?.contains(e.target as HTMLElement)
      ) {
        return;
      }

      // 查找其它trigger
      for (const item of childrenRefs) {
        if (item.value?.contains(e.target as HTMLElement)) {
          return;
        }
      }

      removeOutsideListener();
      changeVisible(false);
    };

    // 当popup显示状态改变时，修改外部点击事件
    watch(computedVisible, (value) => {
      if (props.clickOutsideToClose) {
        if (!value && outsideListener) {
          removeOutsideListener();
        } else if (value && !outsideListener) {
          on(document.documentElement, 'mousedown', handleOutsideClick);
          outsideListener = true;
        }
      }
      if (value) {
        mounted.value = true;
      }
    });

    const removeOutsideListener = () => {
      off(document.documentElement, 'mousedown', handleOutsideClick);
      outsideListener = false;
    };

    triggerCtx?.addChildRef(popupRef);

    // 影响popup显示的参数变化时，更新popup样式
    watch(
      () => [props.autoFitPopupWidth, props.autoFitPopupMinWidth],
      () => {
        if (computedVisible.value) {
          updatePopupStyle();
        }
      },
    );

    onMounted(() => {
      //默认显示时，更新popup位置
      if (props.clickOutsideToClose && !outsideListener) {
        on(document.documentElement, 'mousedown', handleOutsideClick);
        outsideListener = true;
      }
    });

    onBeforeUnmount(() => {
      triggerCtx?.removeChildRef(popupRef);
      if (outsideListener) {
        removeOutsideListener();
      }
    });

    // 触发器相关
    // click
    const handleClick = (e: MouseEvent) => {
      // (attrs as any).onClick?.(e);
      if (props.disabled || (computedVisible.value && !props.clickToClose)) {
        return;
      }
      if (triggerMethods.value.includes('click')) {
        updateMousePosition(e);
        changeVisible(!computedVisible.value);
      } else if (triggerMethods.value.includes('contextMenu') && computedVisible.value) {
        changeVisible(false);
      }
    };
    // hover
    const handleMouseEnter = (e: MouseEvent) => {
      // (attrs as any).onMouseenter?.(e);
      if (props.disabled || !triggerMethods.value.includes('hover')) {
        return;
      }
      updateMousePosition(e);
      changeVisible(true, props.mouseEnterDelay);
    };

    const handleMouseEnterWithContext = (e: MouseEvent) => {
      triggerCtx?.onMouseenter(e);
      handleMouseEnter(e);
    };

    // @typescript-eslint/no-unused-vars
    const handleMouseLeave = (e: MouseEvent) => {
      // (attrs as any).onMouseleave?.(e);
      if (props.disabled || !triggerMethods.value.includes('hover')) {
        return;
      }
      changeVisible(false, props.mouseLeaveDelay);
    };

    const handleMouseLeaveWithContext = (e: MouseEvent) => {
      triggerCtx?.onMouseleave(e);
      handleMouseLeave(e);
    };

    // focus
    // @typescript-eslint/no-unused-vars
    const handleFocusin = (e: FocusEvent) => {
      // (attrs as any).onFocusin?.(e);
      if (props.disabled || !triggerMethods.value.includes('focus')) {
        return;
      }
      changeVisible(true, props.focusDelay);
    };

    const handleFocusout = (e: FocusEvent) => {
      (attrs as any).onFocusout?.(e);
      if (props.disabled || !triggerMethods.value.includes('focus')) {
        return;
      }
      if (!props.blurToClose) {
        return;
      }
      changeVisible(false);
    };

    // contextMenu
    const handleContextmenu = (e: MouseEvent) => {
      // (attrs as any).onContextmenu?.(e);
      if (
        props.disabled ||
        !triggerMethods.value.includes('contextMenu') ||
        (computedVisible.value && !props.clickToClose)
      ) {
        return;
      }
      updateMousePosition(e);
      changeVisible(!computedVisible.value);
      e.preventDefault();
    };

    const handlePopupMouseDown = (e: Event) => {
      if (props.preventFocus) {
        e.preventDefault();
      }
    };

    const addChildRef = (ref: any) => {
      childrenRefs.add(ref);
      triggerCtx?.addChildRef(ref);
    };
    const removeChildRef = (ref: any) => {
      childrenRefs.delete(ref);
      triggerCtx?.removeChildRef(ref);
    };

    // 添加triggerCtx，用于嵌套时保持状态
    provide(
      triggerInjectionKey,
      reactive({
        onMouseenter: handleMouseEnterWithContext,
        onMouseleave: handleMouseLeaveWithContext,
        addChildRef,
        removeChildRef,
      }),
    );

    // 动画相关
    const isAnimation = ref(false);
    const mounted = ref(computedVisible.value);

    const onAnimationStart = () => {
      isAnimation.value = true;
    };

    const handleShow = () => {
      isAnimation.value = false;
      if (computedVisible.value) {
        emit('show');
      }
    };

    const handleHide = () => {
      isAnimation.value = false;
      if (!computedVisible.value) {
        mounted.value = false;
        emit('hide');
      }
    };

    return () => {
      children.value = slots.default?.() ?? [];
      // 给第一个虚拟dom合并新的props
      mergeFirstChild(children.value, {
        class: triggerCls.value,
        onClick: handleClick,
        onMouseenter: handleMouseEnter,
        onMouseleave: handleMouseLeave,
        onFocusin: handleFocusin,
        onFocusout: handleFocusout,
        onContextmenu: handleContextmenu,
      });
      return (
        <>
          {children.value}
          <Teleport to={teleportContainer.value} disabled={!props.renderToBody}>
            {props.unmountOnClose && !computedVisible.value && !mounted.value ? null : (
              <div
                class={cls.value}
                ref={popupRef}
                style={{
                  ...popupStyle.value,
                  zIndex: zIndex.value,
                  pointerEvents: isAnimation.value ? 'none' : 'auto',
                  position: 'absolute',
                }}
                trigger-placement={popupPosition.value}
                onMouseenter={handleMouseEnterWithContext}
                onMouseleave={handleMouseLeaveWithContext}
                onMousedown={handlePopupMouseDown}
              >
                <Transition
                  name={props.animationName}
                  duration={props.duration}
                  appear
                  onBeforeEnter={onAnimationStart}
                  onAfterEnter={handleShow}
                  onBeforeLeave={onAnimationStart}
                  onAfterLeave={handleHide}
                >
                  <div
                    class={`${ns}-popup-wrapper`}
                    style={transformStyle.value}
                    v-show={computedVisible.value}
                  >
                    <div class={[`${ns}-content`, props.contentClass]} style={props.contentStyle}>
                      {slots.content?.()}
                    </div>
                    {props.showArrow && (
                      <div
                        ref={arrowRef}
                        class={[`${ns}-arrow`, props.arrowClass]}
                        style={{
                          position: 'absolute',
                          width: 'var(--bn-trigger-arrow-size)',
                          height: 'var(--bn-trigger-arrow-size)',
                          zIndex: -1,
                          'background-color': 'var(--bn-trigger-arrow-background-color)',
                          ...arrowStyle.value,
                        }}
                      />
                    )}
                  </div>
                </Transition>
              </div>
            )}
          </Teleport>
        </>
      );
    };
  },
});
