import { computed, defineComponent, inject } from 'vue'
import type { PropType, CSSProperties } from 'vue'
import { getComponentNamespace, getNamespace } from '../../../utils/global-config'
import { isUndefined } from '../../../utils/is'
import { addUnit } from '../../../shared/utils'
import { descriptionsInjectionKey } from './context'

export default defineComponent({
  name: getComponentNamespace('DescriptionsItem'),
  props: {
    label: {
      type: String,
      default: ''
    },
    value: {
      type: String,
      default: ''
    },
    span: {
      type: Number,
      default: 1
    },
    align: {
      type: String as PropType<'left' | 'center' | 'right'>,
      default: 'left'
    },
    labelAlign: {
      type: String as PropType<'left' | 'center' | 'right'>,
      default: 'left'
    },
    valueClassName: {
      type: String,
      default: undefined
    },
    labelClassName: {
      type: String,
      default: undefined
    }
  },
  setup(props, { slots }) {
    const descriptionsContext = inject(descriptionsInjectionKey)
    const ns = getNamespace('descriptions-item')
    const cls = computed(() => {
      return [
        ns,
        `${ns}__cell`,
        descriptionsContext?.border && 'is-border',
        `${ns}--${descriptionsContext?.size}`
      ]
    })

    const cellStyle = computed(() => {
      const style: CSSProperties = {}
      if (!isUndefined(descriptionsContext?.cellHeight)) {
        style.height = addUnit(descriptionsContext!.cellHeight)
      }
      return style
    })

    const valueAlginCls = computed(() => [`is-${props.align}`])
    const labelAlginCls = computed(() => [`is-${props.labelAlign}`])

    const renderValue = () => {
      const cellValue = slots.default?.() || props.value
      return cellValue
    }

    const renderLabel = () => {
      const cellValue = slots.label?.() || props.label
      return cellValue
    }

    const renderContent = () => {
      if (descriptionsContext?.border) {
        return (
          <>
            <td
              style={cellStyle.value}
              class={[...cls.value, `${ns}__label`, labelAlginCls.value, props.labelClassName]}
              colspan={1}
            >
              {renderLabel()}
            </td>
            <td
              style={cellStyle.value}
              class={[...cls.value, `${ns}__value`, valueAlginCls.value, props.valueClassName]}
              colspan={props.span}
            >
              {renderValue()}
            </td>
          </>
        )
      }
      return (
        <td class={cls.value} colspan={props.span}>
          <span class={[`${ns}__label`, props.labelClassName]}>{renderLabel()}</span>
          <span class={[`${ns}__value`, props.valueClassName]}>{renderValue()}</span>
        </td>
      )
    }

    return () => {
      return renderContent()
    }
  }
})
