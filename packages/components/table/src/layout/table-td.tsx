import type { PropType } from 'vue'
import { computed, createVNode, defineComponent, inject, toRefs } from 'vue'
import { getNamespace } from '../../../../utils/global-config'
import { getProp } from '../../../../shared/utils'

import type { TableDataWithRaw, TableColumnData } from '../types'
import { tableColumnTypes } from '../types'
import { isFunction } from '../../../../utils/is'
import type { TableContext } from '../context'
import { tableInjectionKey } from '../context'

import Checkbox from '../../../checkbox/src/checkbox.vue'

import { useColumnFixed } from '../hooks/use-column-fixed'

export default defineComponent({
  name: 'Td',
  props: {
    rowIndex: {
      type: Number,
      default: 0
    },
    record: {
      type: Object as PropType<TableDataWithRaw>,
      default: () => ({})
    },
    column: {
      type: Object as PropType<TableColumnData>,
      default: () => ({})
    },
    dataColumns: {
      type: Array as PropType<TableColumnData[]>,
      default: () => []
    },
    colSpan: {
      type: Number,
      default: 1
    },
    rowSpan: {
      type: Number,
      default: 1
    },
    showExpandBtn: {
      type: Boolean,
      default: false
    },
    indentSize: {
      type: Number,
      default: 0
    },
    empty: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { slots }) {
    const ns = getNamespace('td')
    const { dataColumns, column } = toRefs(props)
    const { fixedStyle, isLeftFixedLast, isRightFixedFirst } = useColumnFixed(dataColumns, column)
    const tableContext = inject<TableContext>(tableInjectionKey)

    // 当前的prop是否在resizing
    const propHasResizing = computed(
      () => tableContext?.resizeStore?.prop === props.column.prop && props.column.prop
    )
    // 表格水平滚动位置。左 中 右
    const horScrollPosition = computed(() => tableContext?.scroll?.horScrollPosition)

    const cls = computed(() => [
      ns,
      !props.empty && `is-align-${props.column.align || 'left'}`,
      props.column.fixed && `is-fixed-${props.column.fixed}`,
      isLeftFixedLast.value && `is-fixed-left-last`,
      isRightFixedFirst.value && `is-fixed-right-first`,
      horScrollPosition.value && `is-scroll-position-${horScrollPosition.value}`,
      propHasResizing.value && 'is-resize'
    ])

    const isOpsType = computed(() => tableColumnTypes.includes(props.column.type!))

    // 优先级 renderCell > slotName >  getProp
    const renderContent = () => {
      let content: any = getProp(props.record?.raw, props.column.prop) ?? ''
      const tableCellSlot = tableContext?.slots?.[props.column.slotName!]
      if (tableCellSlot) {
        content = tableCellSlot({
          row: props.record?.raw,
          column: props.column,
          rowIndex: props.rowIndex as number
        })
      }

      if (isFunction(props.column.renderCell)) {
        content = props.column.renderCell({
          row: props.record.raw!,
          column: props.column,
          rowIndex: props.rowIndex as number
        })
      }

      return content
    }

    const renderOpsMap: Record<string, any> = {
      checkbox() {
        if (props.record.isLeaf) {
          return (
            <Checkbox
              modelValue={tableContext?.opsStore?.selectionRows?.includes(props.record.raw!)}
              onChange={(checked: boolean) =>
                tableContext?.opsStore?.toggleSelect!(props.record.raw!, checked)
              }
              disabled={Boolean(props.record.disabled)}
              validateEvent={false}
              // @ts-ignore: click
              onClick={(ev: Event) => ev.stopPropagation()}
            />
          )
        }
        // 有children TODO
      },
      index() {
        return props.column.renderIndex
          ? props.column.renderIndex({ column: props.column, index: props.rowIndex! })
          : props.rowIndex! + 1
      }
    }

    const renderOps = () => {
      return renderOpsMap[props.column.type!]()
    }

    const renderCell = () => {
      if (slots.default) {
        return slots.default()
      }
      return (
        <span class={['bn-table__cell']}>{isOpsType.value ? renderOps() : renderContent()}</span>
      )
    }

    return () => {
      return createVNode(
        'td',
        {
          class: cls.value,
          style: {
            ...fixedStyle.value
          },
          colspan: props.colSpan > 1 ? props.colSpan : undefined
        },
        {
          default: () => [renderCell()]
        }
      )
    }
  }
})
