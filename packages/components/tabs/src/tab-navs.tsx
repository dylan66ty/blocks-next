import type { PropType, CSSProperties } from 'vue'
import { computed, defineComponent, ref, watch, nextTick, onMounted, onUnmounted } from 'vue'
import { getComponentNamespace, getNamespace } from '../../../utils/global-config'
import { BnIconCaret } from '../../icon'
import { useResizeObserver } from '../../../hooks/use-resize-observer'
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
    const navsCls = computed(() => [`${ns}__navs`, `is-${props.type}`])
    const itemCls = computed(() => [`${ns}__navs-item`, `is-${props.type}`])
    const navInkStyle = ref<CSSProperties>({})
    const navsStyle = ref<CSSProperties>({})

    const navItemRefs = ref<Record<string, HTMLElement>>({})
    const wrapperRef = ref<HTMLElement>()
    const viewportRef = ref<HTMLElement>()
    const panesRef = ref<HTMLElement>()

    const scrollWidth = ref<number>(0)
    const wrapperWidth = ref<number>(0)
    const viewportWidth = ref<number>(0)
    const translateX = ref<number>(0)

    const showSlideIcon = computed(() => {
      // 注意像素小数点偏差
      return Math.ceil(scrollWidth.value) > Math.ceil(wrapperWidth.value)
    })
    const prevDisabled = computed(() => translateX.value <= 0)
    const nextDisabled = computed(() => translateX.value >= scrollWidth.value - viewportWidth.value)

    const updateSlideIconStatus = () => {
      scrollWidth.value = panesRef.value?.scrollWidth as number
      wrapperWidth.value = wrapperRef.value?.getBoundingClientRect().width as number
    }

    const onResize = () => {
      updateSlideIconStatus()
      updateNavViewportPosition()
    }

    const { createResizeObserver, destroyResizeObserver } = useResizeObserver({
      elementRef: ref(document.body),
      onResize
    })

    onMounted(() => createResizeObserver())
    onUnmounted(() => destroyResizeObserver())

    const getViewportRect = (key: keyof DOMRect | undefined) => {
      const rect = viewportRef.value?.getBoundingClientRect()
      if (!key) return rect
      return rect && (rect[key] as number)
    }

    // 更新nav视口的偏移位置
    const updateNavViewportPosition = () => {
      const ele = navItemRefs.value[props.activeKey!]
      if (!ele) return
      viewportWidth.value = getViewportRect('width') as number
      scrollWidth.value = panesRef.value!.scrollWidth!
      const offsetLeft = ele.offsetLeft
      const { width } = ele.getBoundingClientRect()
      let _translateX = offsetLeft - viewportWidth.value / 2 + width / 2
      if (_translateX < 0) {
        _translateX = 0
      }
      if (_translateX > scrollWidth.value - viewportWidth.value) {
        _translateX = scrollWidth.value - viewportWidth.value
      }

      translateX.value = _translateX
    }

    const handleSlide = (direction: 'prev' | 'next') => {
      let x = 0
      if (direction === 'next') {
        x = translateX.value + viewportWidth.value
      }
      if (direction === 'prev') {
        x = translateX.value - viewportWidth.value
      }
      if (x < 0) {
        x = 0
      }
      if (x > scrollWidth.value - viewportWidth.value) {
        x = scrollWidth.value - viewportWidth.value
      }

      translateX.value = x
    }

    // translateX
    watch(
      () => translateX.value,
      (x: number) => {
        navsStyle.value.transform = `translate(${-x}px,0)`
      }
    )

    // 更新线的偏移位置
    const updateNavInkPosition = (ele: HTMLElement) => {
      if (!ele) return
      const { width } = ele.getBoundingClientRect()
      const offsetLeft = ele.offsetLeft
      // const offsetTop = ele.offsetTop

      // 暂时只考虑水平
      navInkStyle.value.left = offsetLeft + 'px'
      navInkStyle.value.width = width + 'px'
      navInkStyle.value.height = '1px'
      navInkStyle.value.bottom = 0
    }

    const handleNavItem = (key: string | number) => {
      props.changeActiveKey?.(key)
    }

    // const activeIndex = computed(() => props.tabs.findIndex(tab => tab.key === props.activeKey))

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

    watch(
      () => props.tabs,
      (newTabs) => {
        if (newTabs.length === 0) return
        nextTick(() => {
          updateSlideIconStatus()
          setTimeout(() => {
            // 在下一帧更新偏移量
            updateNavViewportPosition()
            updateNavInkPosition(navItemRefs.value[props.activeKey!])
          }, 16)
        })
      },
      { immediate: true }
    )

    watch(
      () => props.activeKey,
      (activeKey: string | number) => {
        nextTick(() => {
          updateNavViewportPosition()
          updateNavInkPosition(navItemRefs.value[activeKey])
        })
      }
    )

    return () => {
      return (
        <div class={[`${ns}__navs-wrapper`]} ref={wrapperRef} onMouseleave={handleMouseleave}>
          {showSlideIcon.value && (
            <BnIconCaret
              class={[
                `${ns}__icon-prev`,
                {
                  'is-disabled': prevDisabled.value
                }
              ]}
              rotate={90}
              // @ts-ignore: click
              onClick={() => handleSlide('prev')}
            />
          )}
          <div class={[`${ns}__navs-viewport`]} ref={viewportRef}>
            <div class={navsCls.value} ref={panesRef} style={navsStyle.value}>
              {props.tabs.map((item) => (
                <div
                  class={[
                    ...itemCls.value,
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
          {showSlideIcon.value && (
            <BnIconCaret
              class={[
                `${ns}__icon-next`,
                {
                  'is-disabled': nextDisabled.value
                }
              ]}
              rotate={-90}
              // @ts-ignore: click
              onClick={() => handleSlide('next')}
            />
          )}
        </div>
      )
    }
  }
})
