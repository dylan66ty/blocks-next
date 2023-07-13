import { computed, defineComponent, inject } from 'vue'
import type { PropType, CSSProperties, VNodeChild } from 'vue'
import { getComponentNamespace, getNamespace } from '../../../utils/global-config'
import { isFunction, isUndefined } from '../../../utils/is'
import { addUnit } from '../../../shared/utils'
import { descriptionsInjectionKey } from './context'

export default defineComponent({
  name: getComponentNamespace('DescriptionsItem'),
  props: {
    label: {
      type: [String, Number],
      default: ''
    },
    value: {
      type: [String, Number],
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
    },
    renderTag: {
      type: String as PropType<'th' | 'td'>,
      default: 'td'
    },
    renderValue: {
      type: Function as PropType<(data: Record<'value', any>) => VNodeChild>,
      default: undefined
    },
    renderLabel: {
      type: Function as PropType<(data: Record<'label', any>) => VNodeChild>,
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
      let value: string | VNodeChild = props.value
      if (isFunction(props.renderValue)) {
        value = props.renderValue({ value: props.value })
      } else if (isFunction(slots.default)) {
        value = slots.default({ value: props.value })
      }
      return value
    }

    const renderLabel = () => {
      let label: string | VNodeChild = props.label
      if (isFunction(props.renderLabel)) {
        label = props.renderLabel({ label: props.label })
      } else if (isFunction(slots.label)) {
        label = slots.label({ label: props.label })
      }
      return label
    }

    const renderContent = () => {
      if (descriptionsContext?.border) {
        if (descriptionsContext?.direction === 'horizontal') {
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

        if (props.renderTag === 'th') {
          // 表头
          return (
            <th
              style={cellStyle.value}
              class={[...cls.value, `${ns}__label`, labelAlginCls.value, props.labelClassName]}
              colspan={props.span}
            >
              {renderLabel()}
            </th>
          )
        }

        return (
          <td
            style={cellStyle.value}
            class={[...cls.value, `${ns}__value`, valueAlginCls.value, props.valueClassName]}
            colspan={props.span}
          >
            {renderValue()}
          </td>
        )
      }

      if (descriptionsContext?.direction === 'horizontal') {
        return (
          <td class={cls.value} colspan={props.span}>
            <span class={[`${ns}__label`, props.labelClassName]}>{renderLabel()}</span>
            <span class={[`${ns}__value`, props.valueClassName]}>{renderValue()}</span>
          </td>
        )
      }

      if (props.renderTag === 'th') {
        return (
          <th
            class={[...cls.value, `${ns}__label`, labelAlginCls.value, props.labelClassName]}
            colspan={props.span}
          >
            {renderLabel()}
          </th>
        )
      }

      return (
        <td
          class={[...cls.value, `${ns}__value`, valueAlginCls.value, props.valueClassName]}
          colspan={props.span}
        >
          {renderValue()}
        </td>
      )
    }

    return () => {
      return renderContent()
    }
  }
})
