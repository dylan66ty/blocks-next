import {
  defineComponent,
  render,
  createVNode,
  ref,
  computed,
  nextTick,
  watch,
  onUnmounted,
  onMounted,
  toRefs
} from 'vue'
import type { VNode, CSSProperties } from 'vue'

import { getComponentNamespace } from '../../../utils/global-config'
import { mergeFirstChild, getFirstElement } from '../../../utils/vue-utils'
import { getPopupStyle, getElementScrollRect, getArrowStyle } from '../../trigger/src/utils'
import usePopupManager from '../../../hooks/use-popup-manager'
import { getElement, setStyle } from '../../../utils/dom'
import { useResizeObserver } from '../../../hooks/use-resize-observer'
import Popup from './popup.vue'
import { tooltipProps } from './props'

export default defineComponent({
  name: getComponentNamespace('Tooltip'),
  props: tooltipProps,
  emits: ['update:modelValue', 'change'],
  setup(props, { slots, emit }) {
    const innerVisible = ref(false)

    const visible = computed(() => {
      return props.modelValue ?? innerVisible.value
    })

    let defaultSlot: VNode[] | undefined
    let timer: any = -1
    let popupTarget: HTMLElement | null
    let vm: VNode | null

    const renderTo = computed(() => getElement(props.renderTo || document.body))

    const { zIndex } = usePopupManager('popup', { visible })

    const container = document.createElement('div')

    const changeVisible = (visible: boolean) => {
      vm && (vm.component?.proxy as any).changeVisible(visible)
    }

    const updatePopupStyle = async () => {
      if (!popupTarget || !defaultSlot) return
      const triggerTarget = getFirstElement(defaultSlot) as HTMLElement
      const containerRect = renderTo.value!.getBoundingClientRect()
      const triggerScrollRect = getElementScrollRect(triggerTarget, containerRect)
      const getPopupScrollRect = () =>
        getElementScrollRect(popupTarget as HTMLElement, containerRect)
      const { style, position } = getPopupStyle(
        props.position,
        containerRect,
        triggerScrollRect,
        getPopupScrollRect(),
        {
          translate: [0, 0],
          autoFitPosition: true,
          offset: {
            mini: 7,
            default: 10
          }[props.size ?? 'default']
        }
      )
      const popupTargetStyle: CSSProperties = {
        ...style,
        position: 'absolute',
        'z-index': zIndex.value
      }
      // 设置弹出层样式
      setStyle(popupTarget, popupTargetStyle)

      // 把弹出层放入body中，等弹出层更新完样式后才可以更新arrow样式。
      await nextTick()
      const arrowStyle = getArrowStyle(position, triggerScrollRect, getPopupScrollRect(), {
        customStyle: {
          position: 'absolute',
          'border-width': {
            mini: '4px',
            default: '6px'
          }[props.size ?? 'default'],
          'border-style': 'solid',
          zIndex: 0
        }
      })
      const arrowNode = getElement('.arrow', popupTarget) as HTMLElement
      // 设置弹出层箭头样式
      setStyle(arrowNode, arrowStyle)
    }

    // 为了确保这些属性是响应式
    const { content, effect, backgroundColor, popupClass, position, size } = toRefs(props)

    // 创建tooltip
    const createTooltip = () => {
      if (popupTarget) return
      emit('change', true)
      vm = createVNode(
        Popup,
        {
          content,
          effect,
          backgroundColor,
          position,
          popupClass,
          size,
          onMouseenter: () => clearTimeout(timer),
          onMouseleave: () => beforeClose(),
          onClose: () => {
            // Trap!!! 不能在这里更改状态。因为动画有延迟时间，如果在这个时机恰好多次创建tooltip的话就会有bug，状态就会锁死。只能在动画执行结束后才能更改状态。
            // 状态统一用状态控制器来控制。不论是受控状态还是非受控状态。
          },
          onDestroy: () => {
            destroyTooltip()
          }
        },
        {
          content: slots.content ?? null
        }
      )
      render(vm, container)

      popupTarget = container.firstChild! as HTMLElement
      renderTo.value!.appendChild(popupTarget)
      updatePopupStyle()
    }

    // 销毁tooltip
    const destroyTooltip = () => {
      if (container) {
        render(null, container)
        popupTarget = null
        vm = null

        // 内部状态
        innerVisible.value = false
        // 外部状态
        emit('update:modelValue', false)
        emit('change', false)
      }
    }

    const handleMouseEnter = () => {
      if (timer) clearTimeout(timer)
      innerVisible.value = true
      emit('update:modelValue', true)
    }

    const beforeClose = () => {
      if (timer) clearTimeout(timer)
      timer = setTimeout(() => {
        changeVisible(false)
      }, 100)
    }

    const handleResize = () => {
      updatePopupStyle()
    }

    const { createResizeObserver, destroyResizeObserver } = useResizeObserver({
      elementRef: renderTo,
      onResize: handleResize
    })

    // 监听器控制tooltip显示
    watch(
      () => visible.value,
      (val) => {
        if (props.disabled) return
        if (val) {
          nextTick(createTooltip)
        } else {
          changeVisible(false)
        }
      },
      {
        immediate: true
      }
    )

    onMounted(() => {
      createResizeObserver()
    })

    onUnmounted(() => {
      changeVisible(false)
      destroyResizeObserver()
    })

    return () => {
      defaultSlot = slots.default?.()
      mergeFirstChild(defaultSlot, {
        onMouseenter: handleMouseEnter,
        onMouseleave: beforeClose,
        style: {
          cursor: props.disabled ? 'not-allowed' : 'pointer'
        },
        disabled: props.disabled
      })
      return defaultSlot
    }
  }
})
