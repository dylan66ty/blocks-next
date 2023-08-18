import type { VNode, CSSProperties, StyleValue } from 'vue'
import {
  toRefs,
  createVNode,
  defineComponent,
  render,
  nextTick,
  onUnmounted,
  ref,
  watch,
  computed,
  onMounted
} from 'vue'
import { getComponentNamespace } from '../../../utils/global-config'
import { getFirstElement, mergeFirstChild } from '../../../utils/vue-utils'

import { getPopupStyle, getElementScrollRect, getArrowStyle } from '../../trigger/src/utils'

import { getElement, off, on, setStyle } from '../../../utils/dom'

import usePopupManager from '../../../hooks/use-popup-manager'

import { useResizeObserver } from '../../../hooks/use-resize-observer'
import Popup from './popup.vue'
import { popconfirmProps } from './props'

export default defineComponent({
  name: getComponentNamespace('Popconfirm'),
  props: popconfirmProps,
  emits: ['ok', 'cancel', 'change', 'update:modelValue'],
  setup(props, { slots, emit }) {
    const renderTo = getElement(props.renderTo || document.body)

    let defaultSlot: VNode[] | undefined
    let vm: VNode | null
    let popupTarget: HTMLElement | null

    const container = document.createElement('div')

    const innerVisible = ref(false)
    const computedVisible = computed(() => props.modelValue ?? innerVisible.value)

    const changeVisible = (visible: boolean) => {
      vm && (vm.component?.proxy as any).changeVisible(visible)
    }

    const onClose = () => {}

    const onDestroy = () => {
      if (container) {
        render(null, container)
        popupTarget = null
        vm = null

        // 内部状态
        innerVisible.value = false
        // 外部状态
        emit('update:modelValue', false)
        emit('change', false)
        removeClickOutside()
      }
    }

    const onCancel = (e: Event) => {
      changeVisible(false)
      emit('cancel', e)
    }

    const onOk = (e: Event) => {
      changeVisible(false)
      emit('ok', e)
    }

    const handleOutside = (e: Event) => {
      if (!popupTarget) return
      if ((popupTarget as HTMLElement).contains(e.target as HTMLElement)) {
        return
      }
      changeVisible(false)
    }

    const listenerClickOutside = () => {
      on(document.documentElement, 'click', handleOutside)
    }
    const removeClickOutside = () => {
      off(document.documentElement, 'click', handleOutside)
    }

    const { zIndex } = usePopupManager('popup', { visible: computedVisible })

    const updatePopupStyle = async () => {
      if (!popupTarget || !defaultSlot) return
      const triggerTarget = getFirstElement(defaultSlot) as HTMLElement
      const containerRect = renderTo!.getBoundingClientRect()
      const triggerScrollRect = getElementScrollRect(triggerTarget, containerRect)
      const getPopupScrollRect = () =>
        getElementScrollRect(popupTarget as HTMLElement, containerRect)
      const { style, position } = getPopupStyle(
        props.position,
        containerRect,
        triggerScrollRect,
        getPopupScrollRect(),
        {
          autoFitPosition: true,
          offset: 16
        }
      )

      const popupStyle: CSSProperties = { ...style, position: 'absolute', 'z-index': zIndex.value }
      setStyle(popupTarget, popupStyle)

      await nextTick()

      const arrowStyle = getArrowStyle(position, triggerScrollRect, getPopupScrollRect(), {
        customStyle: {
          position: 'absolute',
          'border-width': '6px',
          'border-style': 'solid',
          zIndex: 0
        }
      })
      const arrowNode = getElement('.arrow', popupTarget) as HTMLElement

      setStyle(arrowNode, arrowStyle)
    }

    const handleResize = () => {
      updatePopupStyle()
    }

    const { createResizeObserver, destroyResizeObserver } = useResizeObserver({
      elementRef: ref(renderTo),
      onResize: handleResize
    })

    onMounted(() => {
      createResizeObserver()
    })

    onUnmounted(() => {
      changeVisible(false)
      destroyResizeObserver()
    })

    const { content } = toRefs(props)
    const popupProps = {
      ...props,
      onClose,
      onDestroy,
      onCancel,
      onOk,
      content
    }

    const createPopup = () => {
      if (popupTarget) return
      vm = createVNode(Popup, popupProps, {
        content: slots.content
      })
      render(vm, container)

      popupTarget = container.firstChild! as HTMLElement
      renderTo!.appendChild(popupTarget)
      updatePopupStyle()

      setTimeout(() => {
        listenerClickOutside()
      }, 0)
    }

    const handleClick = () => {
      innerVisible.value = true
    }

    const addStyle = computed(() => {
      const style: StyleValue = {
        cursor: props.disabled ? 'not-allowed' : 'pointer',
        color: props.disabled
          ? 'var(--bn-text-color)'
          : computedVisible.value
          ? 'var(--bn-primary)'
          : 'var(--bn-text-color)',
        userSelect: 'none'
      }

      return style
    })

    // 监听器控制popup显示
    watch(
      () => computedVisible.value,
      (val) => {
        if (props.disabled) return
        if (val) {
          nextTick(createPopup)
          emit('change', true)
        } else {
          changeVisible(false)
        }
      },
      {
        immediate: true
      }
    )

    return () => {
      defaultSlot = slots.default?.()
      mergeFirstChild(defaultSlot, {
        onClick: handleClick,
        style: addStyle.value,
        disabled: props.disabled
      })
      return defaultSlot
    }
  }
})
