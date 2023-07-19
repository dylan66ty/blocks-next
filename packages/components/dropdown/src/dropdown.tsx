import {
  computed,
  defineComponent,
  getCurrentInstance,
  nextTick,
  provide,
  reactive,
  ref,
  toRefs,
  watch
} from 'vue'
import type { PropType } from 'vue'
import { getComponentNamespace, getNamespace } from '../../../utils/global-config'
import Trigger from '../../trigger'
import { isUndefined } from '../../../utils/is'
import { getAllElements, isComponent } from '../../../utils/vue-utils'
import { dropdownContextKey } from './context'
import type { DropdownItemProxyData } from './types'

export default defineComponent({
  name: getComponentNamespace('Dropdown'),
  props: {
    command: {
      type: [String, Number],
      default: undefined
    },
    trigger: {
      type: String as PropType<'click' | 'hover'>,
      default: 'click'
    },
    showArrow: {
      type: Boolean,
      default: false
    },
    contentClass: {
      type: String,
      default: undefined
    },
    offset: {
      type: Number,
      default: undefined
    },
    disabled: {
      type: Boolean,
      default: false
    },
    size: {
      type: String as PropType<'small' | 'default'>,
      default: 'default'
    },
    hideOnClick: {
      type: Boolean,
      default: true
    },
    placement: {
      type: String as PropType<'top' | 'tl' | 'tr' | 'bottom' | 'bl' | 'br'>,
      default: 'bl'
    }
  },
  emits: ['show', 'hide', 'command', 'update:command'],
  setup(props, { emit, slots }) {
    const ns = getNamespace('dropdown')
    const cacheDropdownItemMap = ref<Map<any, DropdownItemProxyData>>(new Map())
    const popupVisible = ref<boolean>(false)
    const computedCommand = computed<number | string | undefined>(() => props.command)

    const contentCls = computed(() => [
      `${ns}__content`,
      props.contentClass,
      `${ns}--${props.size}`
    ])
    const arrowStyle = computed(() => {
      const style: Record<string, string> = {
        '--bn-trigger-arrow-background-color': '#fff'
      }
      return style
    })

    const computedOffset = computed(() => {
      if (isUndefined(props.offset) && props.showArrow) return 12
      if (isUndefined(props.offset)) return 6
      return props.offset
    })

    const onPopupVisibleChange = (value: boolean) => {
      popupVisible.value = value
    }

    const instance = getCurrentInstance()

    const isModelCommand = computed(() => instance?.vnode?.props?.['onUpdate:command'])

    const currentDropdownItemData = ref({})

    const updateCurrentDropdownItemData = async () => {
      await nextTick()
      const proxy = cacheDropdownItemMap.value.get(props.command)
      currentDropdownItemData.value = {
        label: proxy?.label,
        command: proxy?.command
      }
    }

    const handleDropdownItem = (proxy: DropdownItemProxyData) => {
      if (proxy.disabled) return
      if (props.hideOnClick) {
        popupVisible.value = false
      }
      const { command } = proxy
      emit('command', command)
      if (isUndefined(command)) return
      if (isModelCommand.value) {
        emit('update:command', command)
      }
    }

    const dropdownItemCreate = (proxy: DropdownItemProxyData) => {
      cacheDropdownItemMap.value.set(proxy.command, proxy)
    }

    const dropdownItemDestroy = (proxy: DropdownItemProxyData) => {
      if (cacheDropdownItemMap.value.get(proxy.command)) {
        cacheDropdownItemMap.value.delete(proxy.command)
      }
    }

    const { size } = toRefs(props)

    provide(
      dropdownContextKey,
      reactive({
        handleDropdownItem,
        dropdownItemCreate,
        dropdownItemDestroy,
        command: computedCommand,
        size
      })
    )

    watch(
      () => props.command,
      (newCommand) => {
        if (isUndefined(newCommand)) return
        updateCurrentDropdownItemData()
      },
      { immediate: true }
    )

    watch(
      () => slots.dropdown?.(),
      () => {
        updateCurrentDropdownItemData()
      }
    )

    return () => {
      const dropdownChildren = getAllElements(slots.dropdown?.())
        .filter((vn) => isComponent(vn, vn.type) && vn.type.name === 'BnDropdownItem')
        .map((vn) => {
          if (!isUndefined(vn.props?.divided)) {
            return [<div class={`${ns}-item__divided`} />, vn]
          }
          return vn
        })
      return (
        <Trigger
          popupVisible={popupVisible.value}
          unmount-on-close={false}
          trigger={props.trigger}
          position={props.placement}
          show-arrow={props.showArrow}
          popup-offset={computedOffset.value}
          arrow-style={arrowStyle.value}
          disabled={props.disabled}
          onShow={() => emit('show')}
          onHide={() => emit('hide')}
          onPopupVisibleChange={onPopupVisibleChange}
          v-slots={{
            default: () =>
              slots.trigger?.({ show: popupVisible.value, data: currentDropdownItemData.value }),
            content: () => <div class={contentCls.value}>{dropdownChildren}</div>
          }}
        ></Trigger>
      )
    }
  }
})
