import { computed, defineComponent } from 'vue'
import type { PropType } from 'vue'
import { getComponentNamespace, getNamespace } from '../../../utils/global-config'
import Trigger from '../../trigger'
import { isUndefined } from '../../../utils/is'

export default defineComponent({
  name: getComponentNamespace('Dropdown'),
  props: {
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
      type: String as PropType<'small' | 'default' | 'large'>,
      default: 'default'
    }
  },
  emits: ['show', 'hide'],
  setup(props, { emit, slots }) {
    const ns = getNamespace('dropdown')

    const contentCls = computed(() => [`${ns}__content`, props.contentClass])

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

    const show = () => {
      emit('show')
    }

    const hide = () => {
      emit('hide')
    }

    return () => {
      return (
        <Trigger
          trigger={props.trigger}
          position="bottom"
          show-arrow={props.showArrow}
          popup-offset={computedOffset.value}
          arrow-style={arrowStyle.value}
          disabled={props.disabled}
          onShow={show}
          onHide={hide}
          v-slots={{
            default: () => slots.trigger?.(),
            content: () => <div class={contentCls.value}>{slots.dropdown?.()}</div>
          }}
        ></Trigger>
      )
    }
  }
})
