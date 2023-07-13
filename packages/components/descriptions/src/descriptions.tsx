import { cloneVNode, computed, defineComponent, provide, reactive, toRefs } from 'vue'
import type { VNode, PropType } from 'vue'
import { getComponentNamespace, getNamespace } from '../../../utils/global-config'
import { getAllElements, isComponent } from '../../../utils/vue-utils'
import { deepClone } from '../../../shared/utils'
import { isFunction } from '../../../utils/is'
import { descriptionsInjectionKey } from './context'
import type { DescriptionsData } from './types'
import DescriptionsItem from './descriptions-item'

export default defineComponent({
  name: getComponentNamespace('Descriptions'),
  props: {
    column: {
      type: Number,
      default: 2
    },
    direction: {
      type: String as PropType<'vertical' | 'horizontal'>,
      default: 'horizontal'
    },
    size: {
      type: String as PropType<'large' | 'default' | 'small'>,
      default: 'default'
    },
    border: {
      type: Boolean,
      default: false
    },
    cellHeight: {
      type: [String, Number],
      default: undefined
    },
    data: {
      type: Array as PropType<Partial<DescriptionsData>[]>,
      default: undefined
    }
  },
  setup(props, { slots }) {
    const ns = getNamespace('descriptions')
    const cls = computed(() => [ns])

    const addItemSpan = (vn: VNode, span: number) => {
      if (!vn.props) {
        vn.props = { span: 1 }
      }
      if (!props.border || props.direction === 'vertical') {
        vn.props.span = span
      } else {
        vn.props.span = span * 2 - 1
      }
    }

    // 根据column转成二维数组 [[vn,vn],[vn,vn]]
    // 当border存在时 一个vn要渲染2个tr => [[tr,tr,tr,tr], [tr,tr,tr,tr]]
    // 没有border => [[tr,tr], [tr,tr]]
    const generateRows = (vns: VNode[]) => {
      const rows: VNode[][] = []
      let count = 0
      let temp: VNode[] = []
      vns.forEach((vn, index) => {
        temp.push(vn)
        if (index === vns.length - 1) {
          // 最后一个vn添加处理过的span 为了能正确的合并表格td
          addItemSpan(vn, props.column - count)
          rows.push(temp)
          return
        }
        const span = vn.props?.span || 1
        const totalSpan = count + span
        count = totalSpan > props.column ? props.column : totalSpan
        // 当取余为0时，代表当前temp数组需要push到rows里面，组合成二维数组
        if (!(count % props.column)) {
          rows.push(temp)
          // 最后一个vn需要做边界判断。重置span数值,合并表格td
          addItemSpan(vn, span - (totalSpan - props.column))
          temp = []
          count = 0
        } else {
          // 给vn添加默认的span
          addItemSpan(vn, span)
        }
      })
      return rows
    }
    const { size, border, cellHeight, direction } = toRefs(props)
    provide(
      descriptionsInjectionKey,
      reactive({
        size,
        border,
        cellHeight,
        direction
      })
    )

    const getValueRender = (item: DescriptionsData) => {
      if (item.renderValue) {
        return (scoped: Record<'value', any>) => item.renderValue(scoped)
      }
      if (isFunction(slots[item.valueSlotName])) {
        return (scoped: Record<'value', any>) => slots[item.valueSlotName]!(scoped)
      }
    }

    const getLabelRender = (item: DescriptionsData) => {
      if (item.renderLabel) {
        return (scoped: Record<'label', any>) => item.renderLabel(scoped)
      }
      if (isFunction(slots[item.labelSlotName])) {
        return (scoped: Record<'label', any>) => slots[item.labelSlotName]!(scoped)
      }
    }

    const getChildren = () => {
      if (!props.data) {
        return getAllElements(slots.default?.()).filter(
          (vn: VNode) => isComponent(vn, vn.type) && vn.type.name === 'BnDescriptionsItem'
        )
      }

      return props.data.map((item: DescriptionsData) => (
        <DescriptionsItem
          value={item.value}
          label={item.label}
          span={item.span}
          align={item.align}
          labelAlign={item.labelAlign}
          labelClassName={item.labelClassName}
          valueClassName={item.valueClassName}
          v-slots={{
            default: getValueRender(item),
            label: getLabelRender(item)
          }}
        />
      ))
    }

    return () => {
      const rows = generateRows(getChildren())
      // 当排版为vertical时注入需要渲染的表格标签
      const addRenderTag = (vn: VNode, tag: string) => {
        vn = cloneVNode(vn)
        if (!vn.props) vn.props = {}
        vn.props = deepClone(vn.props)
        vn.props!.renderTag = tag
        return vn
      }

      const renderRows = () => {
        return rows.map((row, rowIndex) => {
          if (props.direction === 'vertical') {
            return (
              <>
                <tr key={`render-tag-th-${rowIndex}`}>
                  {row.map((itemVNode) => addRenderTag(itemVNode, 'th'))}
                </tr>
                <tr key={`render-tag-td-${rowIndex}`}>{row.map((itemVNode) => itemVNode)}</tr>
              </>
            )
          }
          return <tr key={rowIndex}>{row.map((itemVNode) => itemVNode)}</tr>
        })
      }

      return (
        <div class={cls.value}>
          <table class={[`${ns}__table`]}>
            <tbody>{renderRows()}</tbody>
          </table>
        </div>
      )
    }
  }
})
