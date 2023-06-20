import type { PropType } from 'vue'
import { computed, createVNode, defineComponent, inject, ref, toRefs } from 'vue'

import type { TableColumnData } from '../types'
import { tableColumnTypes } from '../types'

import Trigger from '../../../trigger/src/trigger'

import { getNamespace } from '../../../../utils/global-config'
import { isFunction } from '../../../../utils/is'
import type { TableContext } from '../context'
import { tableInjectionKey } from '../context'

import Checkbox from '../../../checkbox/src/checkbox.vue'

import CaretArrow from '../../../icon/src/base/caret-fill.vue'
import { useColumnFixed } from '../hooks/use-column-fixed'
import SorterPopup from './table-sorter-popup'

export default defineComponent({
  name: 'Th',
  props: {
    column: {
      type: Object as PropType<TableColumnData>,
      default: () => ({})
    },
    dataColumns: {
      type: Array as PropType<TableColumnData[]>,
      default: () => []
    },
    resizable: {
      type: Boolean
    }
  },
  setup(props) {
    const ns = getNamespace('th')

    const tableContext = inject<TableContext>(tableInjectionKey)

    const isOpsType = computed(() => tableColumnTypes.includes(props.column.type!))

    const checkboxStatus = computed(() => {
      let checked = false
      let indeterminate = false
      let disabled = false

      // 去除disabled row
      const unDisabledSelection = tableContext?.opsStore?.selectionRows?.filter((row) => !row.disabled)
      const selectionNumber = unDisabledSelection?.length ?? 0
      const allEnabledSelectionNumber = tableContext?.opsStore?.allEnabledSelectionRows?.length ?? 0

      if (selectionNumber > 0) {
        if (selectionNumber >= allEnabledSelectionNumber) {
          checked = true
        } else {
          indeterminate = true
        }
      }

      if (allEnabledSelectionNumber === 0) {
        disabled = true
      }

      return {
        checked,
        indeterminate,
        disabled
      }
    })

    const renderOpsMap: Record<string, any> = {
      checkbox() {
        if (props.column.hiddenCheckboxAll) {
          return
        }
        return (
          <Checkbox
            label={props.column.title ?? undefined}
            modelValue={checkboxStatus.value.checked}
            indeterminate={checkboxStatus.value.indeterminate}
            disabled={checkboxStatus.value.disabled}
            validateEvent={false}
            onChange={tableContext?.opsStore?.toggleSelectAll}
            // @ts-ignore: click
            onClick={(ev: Event) => ev.stopPropagation()}
          />
        )
      },
      index() {
        return props.column.title || '#'
      }
    }

    const renderOps = () => {
      return renderOpsMap[props.column.type!]()
    }

    // sort
    const activeSort = computed(() => tableContext?.sortStore?.activeSort)
    const hitColumnProp = computed(() => tableContext?.sortStore?.activeProp === props.column.prop)
    const isSortPopup = computed(() => tableContext?.sortStore?.isSortPopup)

    const handlerSort = (direction: 'ascend' | 'descend' | '') => {
      tableContext?.sortStore?.handleSortChange?.(props.column, direction)
    }

    // 渲染sorter
    const renderSortIcon = () => {
      const defColor = '#88909b'
      const activeColor = '#2355f5'
      const popupDefColor = '#242934'

      const _render = () => {
        if (!isSortPopup.value) {
          return (
            <span class={['bn-table__sort']}>
              <CaretArrow
                color={hitColumnProp.value && activeSort.value === 'ascend' ? activeColor : defColor}
                class={['bn-table__sort-ascend']}
                rotate={180}
                size={12}
                // @ts-ignore: click
                onClick={() => handlerSort('ascend')}
              ></CaretArrow>
              <CaretArrow
                color={hitColumnProp.value && activeSort.value === 'descend' ? activeColor : defColor}
                class={['bn-table__sort-descend']}
                size={12}
                // @ts-ignore: click
                onClick={() => handlerSort('descend')}
              ></CaretArrow>
            </span>
          )
        }

        if (hitColumnProp.value && activeSort.value === 'ascend') {
          return (
            <span class={['bn-table__sort']}>
              <CaretArrow class={['bn-table__sort-arrow-center']} color={popupDefColor} rotate={180} size={12} />
            </span>
          )
        }

        if (hitColumnProp.value && activeSort.value === 'descend') {
          return (
            <span class={['bn-table__sort']}>
              <CaretArrow class={['bn-table__sort-arrow-center']} color={popupDefColor} size={12}></CaretArrow>
            </span>
          )
        }
      }

      return _render()
    }

    const popupVisible = ref(false)

    const onPopupVisibleChange = (visible: boolean) => {
      popupVisible.value = visible
    }

    const handleSortChangeInPopup = (direction: 'ascend' | 'descend' | '') => {
      handlerSort(direction)
    }

    // 优先级 renderHeader > headerSlotName > title
    const renderTitle = () => {
      let title: unknown = props.column?.title
      const tableHeaderSlot = tableContext?.slots?.[props.column.headerSlotName!]
      if (tableHeaderSlot) {
        title = tableHeaderSlot({ column: props.column })
      }

      if (isFunction(props.column.renderHeader)) {
        title = props.column.renderHeader({ column: props.column })
      }

      const _render = () => {
        if (!props.column.sortable) {
          return <span class={[`bn-table__header-title`]}>{title}</span>
        }

        if (!isSortPopup.value) {
          return (
            <span class={[`bn-table__header-title`]} onClick={() => props.column.sortable && handlerSort('')}>
              {title}
            </span>
          )
        }

        return (
          <Trigger
            popupVisible={popupVisible.value}
            trigger="hover"
            position="bottom"
            popupOffset={10}
            v-slots={{
              content: () => (
                <SorterPopup sortChange={handleSortChangeInPopup} activeSort={activeSort.value} hitColumnProp={hitColumnProp.value}></SorterPopup>
              )
            }}
            onPopupVisibleChange={onPopupVisibleChange}
          >
            <span
              class={[
                `bn-table__header-title`,
                {
                  'is-sort-active': hitColumnProp.value && activeSort.value
                }
              ]}
              onClick={() => handlerSort('')}
            >
              {title}
            </span>
          </Trigger>
        )
      }

      return _render()
    }

    const renderCell = () => {
      return <span class={[`bn-table__cell`]}>{isOpsType.value ? renderOps() : [renderTitle(), props.column.sortable && renderSortIcon()]}</span>
    }

    const handleMouseDown = (e: MouseEvent) => {
      if (props.column?.prop) {
        tableContext?.resizeStore?.handleThMouseDown?.(props.column?.prop, e)
      }
    }

    const { dataColumns, column } = toRefs(props)
    const { fixedStyle, isLeftFixedLast, isRightFixedFirst } = useColumnFixed(dataColumns, column)

    // 当前的prop是否在resizing
    const propHasResizing = computed(() => tableContext?.resizeStore?.prop === props.column.prop && props.column.prop)
    // 表格水平滚动位置。左 中 右
    const horScrollPosition = computed(() => tableContext?.scroll?.horScrollPosition)

    const cls = computed(() => {
      const _cls = [
        `${ns}`,
        `is-align-${props.column.align || 'left'}`,
        props.column.fixed && `is-fixed-${props.column.fixed}`,
        isLeftFixedLast.value && `is-fixed-left-last`,
        isRightFixedFirst.value && `is-fixed-right-first`,
        horScrollPosition.value && `is-scroll-position-${horScrollPosition.value}`,
        propHasResizing.value && 'is-resize'
      ]
      return _cls
    })

    return () => {
      const colSpan = props.column.colSpan ?? 1
      const rowSpan = props.column.rowSpan ?? 1

      return createVNode(
        'th',
        {
          class: cls.value,
          style: {
            ...fixedStyle.value
          },
          colspan: colSpan > 1 ? colSpan : undefined,
          rowspan: rowSpan > 1 ? rowSpan : undefined
        },
        {
          default: () => [renderCell(), props.resizable && <span class={`${ns}__handler`} onMousedown={handleMouseDown} />]
        }
      )
    }
  }
})
