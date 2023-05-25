import {
  defineComponent,
  render,
  createVNode,
  ref,
  computed,
  nextTick,
  watch,
  onUnmounted,
  onMounted
} from 'vue'
import type { RenderFunction, VNode, CSSProperties } from 'vue'

import { getComponentNamespace } from '../../../utils/global-config'
import { mergeFirstChild, getFirstElement } from '../../../utils/vue-utils'
import Popover from './popup.vue'
import { tooltipProps } from './props'
import { getPopupStyle, getElementScrollRect, getArrowStyle } from '../../trigger/src/utils'
import { getPopupTranslateByPosition, getPopupPositionByEmpty } from './utils'
import usePopupManager from '../../../hooks/use-popup-manager'
import { Position } from './types'
import { getElement } from '../../../utils/dom'
import { useResizeObserver } from '../../../hooks/use-resize-observer'



export default defineComponent({
  name: getComponentNamespace('Tooltip'),
  props: tooltipProps,
  emits: ['update:modelValue', 'change'],
  setup(props, { slots, emit }) {

    const innerVisible = ref(false)

    const visible = computed(() => {
      return props.modelValue ?? innerVisible.value
    })

    const popoverSlot: Record<string, RenderFunction> = {}
    if (slots.content) {
      popoverSlot.content = slots.content
    }

    let defaultSlot: VNode[] = slots.default?.() ?? []
    let timer = 0
    let popupTarget: HTMLElement | null = null
    let vm: VNode | null


    const translate = getPopupTranslateByPosition()
    const renderTo = getElement(props.renderTo || document.documentElement as HTMLElement)

    const { zIndex } = usePopupManager('popup', { visible });

    const container = document.createElement('div')

    const changeVisible = (visible: boolean) => {
      vm && (vm.component?.proxy as any).changeVisible(visible)
    }

    const computedPosition = computed(() => {
      if (!slots['content'] && !props.content.trim().length) {
        return getPopupPositionByEmpty(props.position) as Position
      }
      return props.position as Position
    })


    const updatePopupStyle = () => {
      if(!popupTarget) return
      const triggerTarget = getFirstElement(defaultSlot) as HTMLElement
      const containerRect = renderTo!.getBoundingClientRect()
      const triggerScrollRect = getElementScrollRect(triggerTarget, containerRect)
      const getPopupScrollRect = () => getElementScrollRect(popupTarget as HTMLElement, containerRect)
      const { style, position } = getPopupStyle(computedPosition.value, containerRect, triggerScrollRect, getPopupScrollRect(), {
        translate: translate as any,
        autoFitPosition: true
      })
      const _popupTarget = popupTarget as HTMLElement
      const needStyles: CSSProperties = { ...style, position: 'absolute', 'z-index': zIndex.value }
      Object.keys(needStyles).forEach(key => {
        // @ts-ignore
        (_popupTarget.style as any)[key] = needStyles[key]
      })
      const arrowStyle = getArrowStyle(position, triggerScrollRect, getPopupScrollRect(), {
        customStyle: {
          position: 'absolute',
          "border-width": '8px',
          "border-style": "solid",
          zIndex: 0,
        },
      })

      const arrowNode = popupTarget?.querySelector('.bn-tooltip__arrow')!

      Object.keys(arrowStyle).forEach(key => {
        // @ts-ignore
        arrowNode.style[key] = arrowStyle[key]
      })


    }

    // 创建tooltip
    const createTooltip = async () => {
      if (popupTarget) return
      emit('change', true)

      vm = createVNode(Popover, {
        content: props.content,
        effect: props.effect,
        backgroundColor: props.backgroundColor,
        position: props.position,
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
        Object.keys(popoverSlot).length ? popoverSlot : null
      )
      render(vm, container)
      // 必须等待popup组件创建完毕后才能放入容器中。
      await nextTick()
      popupTarget = container.firstChild! as HTMLElement
      renderTo!.appendChild(popupTarget)
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
      elementRef: ref(renderTo),
      onResize: handleResize,
    });

    // 监听器控制tooltip显示
    watch(() => visible.value, (val) => {
      if (val && !props.disabled) {
        nextTick(createTooltip)
      }
      
      if(!val) {
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
      mergeFirstChild(defaultSlot, {
        onMouseenter: handleMouseEnter,
        onMouseleave: beforeClose,
        style: {
          cursor: 'pointer'
        }
      })
      return <>
        {defaultSlot}
      </>
    }
  }
})