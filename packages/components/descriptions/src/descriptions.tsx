import { computed, defineComponent, provide, reactive, toRefs } from 'vue'
import type { VNode, PropType } from 'vue'
import { getComponentNamespace, getNamespace } from '../../../utils/global-config'
import { getAllElements, isComponent } from '../../../utils/vue-utils'
import { descriptionsInjectionKey } from './context'

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
    }
  },
  setup(props, { slots }) {
    const ns = getNamespace('descriptions')
    const cls = computed(() => [ns])

    const addItemSpan = (vn: VNode, span: number) => {
      if (!vn.props) {
        vn.props = { span: 1 }
      }
      vn.props.span = span * 2 - 1
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
        const span = vn.props!.span || 1
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
    const { size, border, cellHeight } = toRefs(props)
    provide(
      descriptionsInjectionKey,
      reactive({
        size,
        border,
        cellHeight
      })
    )

    return () => {
      const children = getAllElements(slots.default?.()).filter(
        (vn: VNode) => isComponent(vn, vn.type) && vn.type.name === 'BnDescriptionsItem'
      )
      const rows = generateRows(children)
      return (
        <div class={cls.value}>
          <table class={[`${ns}__table`]}>
            <tbody>
              {rows.map((row, rowIndex) => (
                <tr key={rowIndex}>{row.map((itemVNode) => itemVNode)}</tr>
              ))}
            </tbody>
          </table>
        </div>
      )
    }
  }
})
