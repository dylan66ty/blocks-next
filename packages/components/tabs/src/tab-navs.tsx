import type { PropType, CSSProperties } from 'vue'
import { computed, defineComponent, ref, watch, onMounted, onUnmounted, nextTick } from 'vue'
import { getComponentNamespace, getNamespace } from '../../../utils/global-config'
import { BnIconArrowLeft, BnIconArrowRight } from '../../icon'
import { useResizeObserver } from '../../../hooks/use-resize-observer'
import { getStyle } from '../../../utils/dom'
import { sleep } from '../../../shared/utils'
import type { TabPaneData, TabsType } from './types'

export default defineComponent({
  name: getComponentNamespace('TabNavsLine'),
  props: {
    tabs: {
      type: Array as PropType<TabPaneData[]>,
      default: () => []
    },
    type: {
      type: String as PropType<TabsType>,
      default: 'line'
    },
    size: {
      type: String,
      default: 'small'
    },
    activeKey: {
      type: [String, Number],
      default: undefined
    },
    changeActiveKey: {
      type: Function,
      default: () => {}
    },
    animation: {
      type: Boolean
    }
  },
  setup(props) {
    const ns = getNamespace('tabs')

    const navInkStyle = ref<CSSProperties>({})
    const arrangeStyle = ref<CSSProperties>({})

    const navItemRefs = ref<Record<string, HTMLElement>>({})
    const viewportRef = ref<HTMLElement>()
    const arrangeRef = ref<HTMLElement>()

    const translateX = ref(0)
    const controller = ref(false)

    const prevDisabled = computed(() => translateX.value === 0)

    const nextDisabled = computed(() => {
      const viewportWidth = viewportRef.value!.getBoundingClientRect().width
      const arrangeWidth = arrangeRef.value!.getBoundingClientRect().width
      return translateX.value > arrangeWidth - viewportWidth
    })

    const updateController = async () => {
      await nextTick()
      const viewportWidth = viewportRef.value!.getBoundingClientRect().width
      const arrangeWidth = arrangeRef.value!.getBoundingClientRect().width
      // 放大误差
      controller.value = Math.floor(arrangeWidth - viewportWidth) > 1
    }

    // 边界判断
    const boundaryProcessing = (x: number, viewportWidth: number, scrollWidth: number) => {
      if (x <= 0) {
        x = 0
      }
      if (x >= scrollWidth - viewportWidth) {
        x = scrollWidth - viewportWidth
      }
      return x
    }

    const updateCenterPosition = async () => {
      await sleep(16)
      if (!controller.value) return
      const navEl = navItemRefs.value[props.activeKey!] as HTMLElement
      if (!navEl) return
      const arrangeWidth = arrangeRef.value!.getBoundingClientRect().width
      const tagWidth = navEl.getBoundingClientRect().width
      const offsetLeft = navEl.offsetLeft
      const viewportWidth = viewportRef.value!.getBoundingClientRect().width
      const x = boundaryProcessing(
        offsetLeft - viewportWidth / 2 + tagWidth / 2,
        viewportWidth,
        arrangeWidth
      )
      translateX.value = x
    }
    const updateNavInkPosition = async (el?: HTMLElement) => {
      await nextTick()
      el = el ?? navItemRefs.value[props.activeKey!]
      if (!el) {
        // 清空下划线
        navInkStyle.value = {}
        return
      }
      const { width } = el.getBoundingClientRect()
      const offsetLeft = el.offsetLeft

      // 暂时只考虑水平
      navInkStyle.value.left = offsetLeft + 'px'
      navInkStyle.value.width = width + 'px'
      navInkStyle.value.height = '1px'
      navInkStyle.value.bottom = 0
    }

    const handleSlide = (direction: number) => {
      const viewportWidth = viewportRef.value!.getBoundingClientRect().width
      const arrangeNode = arrangeRef.value!
      const scrollWidth = arrangeNode.scrollWidth
      const offset = Math.ceil(viewportWidth / 2)
      const transform = getStyle(arrangeNode, 'transform')
      const matcher = transform.match(/translateX\((.*?)px\)/)
      if (!matcher) return
      const x = boundaryProcessing(
        Math.abs(+matcher[1]) + direction * offset,
        viewportWidth,
        scrollWidth
      )
      translateX.value = x
    }

    const handleNavItem = (key: string | number) => {
      props.changeActiveKey?.(key)
    }

    const handleMouseenter = (e: Event) => {
      e.stopPropagation()
      if (props.type === 'line') {
        updateNavInkPosition(e.currentTarget as HTMLElement)
      }
    }

    const handleMouseleave = () => {
      updateNavInkPosition(navItemRefs.value[props.activeKey!])
    }

    const showNavInk = computed(() => {
      return ['line'].includes(props.type!)
    })

    const { createResizeObserver, destroyResizeObserver } = useResizeObserver({
      elementRef: viewportRef,
      onResize: () => {
        updateController()
        updateCenterPosition()
      }
    })

    onMounted(() => {
      createResizeObserver()
    })
    onUnmounted(() => {
      destroyResizeObserver()
    })

    // translateX
    watch(
      () => translateX.value,
      (x: number) => {
        arrangeStyle.value.transform = `translateX(${-x}px)`
      }
    )

    watch(
      () => props.tabs,
      () => {
        updateController()
        updateCenterPosition()
        updateNavInkPosition()
      },
      { immediate: true }
    )

    watch(
      () => props.activeKey,
      () => {
        updateCenterPosition()
        updateNavInkPosition()
      }
    )

    return () => {
      return (
        <div class={[`${ns}__navs-wrapper`, `is-${props.size}`]} onMouseleave={handleMouseleave}>
          {controller.value && (
            <BnIconArrowLeft
              class={[
                `${ns}__icon-prev`,
                {
                  'is-disabled': prevDisabled.value
                }
              ]}
              // @ts-ignore: click
              onClick={() => handleSlide(-1)}
            />
          )}
          <div class={[`${ns}__navs-viewport`]} ref={viewportRef}>
            <div
              class={[`${ns}__navs`, `is-${props.type}`]}
              ref={arrangeRef}
              style={arrangeStyle.value}
            >
              {props.tabs.map((item) => (
                <div
                  class={[
                    `${ns}__navs-item`,
                    `is-${props.type}`,
                    {
                      'is-active': item.key === props.activeKey,
                      'is-disabled': item.disabled
                    }
                  ]}
                  key={`${props.type!}__${item.key}`}
                  onClick={() => handleNavItem(item.key)}
                  onMouseenter={(e) => handleMouseenter(e)}
                  ref={(el: HTMLElement) => {
                    navItemRefs.value[item.key] = el
                  }}
                >
                  {item.paneSlots?.title ? item.paneSlots?.title() : item.title}
                </div>
              ))}

              {showNavInk.value && <div class={[`${ns}__nav-ink`]} style={navInkStyle.value}></div>}
            </div>
          </div>
          {controller.value && (
            <BnIconArrowRight
              class={[
                `${ns}__icon-next`,
                {
                  'is-disabled': nextDisabled.value
                }
              ]}
              // @ts-ignore: click
              onClick={() => handleSlide(1)}
            />
          )}
        </div>
      )
    }
  }
})
