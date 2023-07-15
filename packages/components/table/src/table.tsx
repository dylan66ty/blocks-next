import type { ComponentPublicInstance, Ref, StyleValue } from 'vue'
import { computed, defineComponent, ref, watch, provide, reactive, toRef, Transition } from 'vue'
import { getComponentNamespace, getNamespace } from '../../../utils/global-config'
import Scrollbar from '../../scrollbar/src/scrollbar.vue'
import Empty from '../../empty/src/empty.vue'
import { isArray } from '../../../utils/is'
import { addUnit, compose } from '../../../shared/utils'
import { tableProps } from './table-props'

import type { TableDataWithRaw, TableData, TableColumnData } from './types'

import Tbody from './layout/table-tbody'
import Tr from './layout/table-tr'
import Td from './layout/table-td'
import Th from './layout/table-th'
import Thead from './layout/table-thead'
import ColGroup from './layout/table-col-group'
import SettingIcon from './layout/table-setting-icon'
import Loading from './layout/table-loading'

import {
  injectPrivatePropToTableColumnData,
  injectPrivatePropToTableData,
  splitColumns,
  genSortFn
} from './utils'
import { tableInjectionKey, tableColumnInjectionKey } from './context'

import { useSelection } from './hooks/use-selection'
import { useColumnResize } from './hooks/use-column-resize'
import { useScroll } from './hooks/use-scroll'
import { useSorter } from './hooks/use-sorter'

export default defineComponent({
  name: getComponentNamespace('Table'),
  props: tableProps,
  emits: ['update:selection', 'selection-change'],
  setup(props, { slots, emit }) {
    const ns = getNamespace('table')

    const flattenData = ref<TableData[]>([])
    const renderData = ref<TableData[]>([])

    // 拆解分组后的数据表头信息
    const dataColumns = ref<TableColumnData[]>([])
    // 二维数组
    const groupColumns = ref<TableColumnData[][]>([])

    const renderDataColumns = ref<TableColumnData[]>([])
    const renderGroupColumns = ref<TableColumnData[][]>([])

    // resize
    const thRefs = ref<Record<string, HTMLElement>>({})

    const { theadComRef, tbodyComRef, horScrollPosition, onTbodyScroll } =
      useScroll(renderDataColumns)

    // sortable
    const { activeProp, activeSort, isSortPopup, handleSortChange } = useSorter({
      sort: props.defaultSort.sort || '',
      prop: props.defaultSort.prop || '',
      popup: props.defaultSort.popup || false,
      callback: () => {
        updateRenderData()
      }
    })

    const updateRenderData = () => {
      renderData.value = compose((data: TableData[]) => {
        // 排序
        const prop = activeProp.value
        const sort = activeSort.value
        return genSortFn(prop, sort)!(data)
      })([...flattenData.value])
    }

    const updateRenderColumnsData = (columnPropSortArray?: string[]) => {
      const _renderDataColumns = compose(
        (columns: TableColumnData[]) => splitColumns(columns),
        (columns: TableColumnData[]) => {
          return columns.filter((column) => !column.hidden)
        },
        // 处理拖动排序column位置
        (columns: TableColumnData[]) => {
          const temp: TableColumnData[] = []
          if (isArray(columnPropSortArray)) {
            columnPropSortArray.forEach((prop) => {
              const index = columns.findIndex((column) => column.prop === prop)
              if (index >= -1) {
                const _column = columns.splice(index, 1)[0]
                temp.push(_column)
              }
            })

            const regroupColumns = [...columns, ...temp]
            // 覆盖
            dataColumns.value = regroupColumns

            return regroupColumns
          }
          return columns
        }
      )([...dataColumns.value])

      renderDataColumns.value = _renderDataColumns
      // TODO 多级表头
      renderGroupColumns.value = [_renderDataColumns]
    }

    watch(
      () => props.columns,
      (columns) => {
        const result = injectPrivatePropToTableColumnData(columns)
        dataColumns.value = result.dataColumns
        groupColumns.value = result.groupColumns
        updateRenderColumnsData()
      },
      { immediate: true, deep: true }
    )

    watch(
      () => props.data,
      () => {
        flattenData.value = injectPrivatePropToTableData(props.data)
        updateRenderData()
      },
      { immediate: true, deep: true }
    )

    const renderHeader = () => {
      const Component = Scrollbar
      return (
        <div class={[`${ns}__header`]}>
          <Component
            ref={theadComRef}
            class={[`${ns}__header-scroll`]}
            hide={true}
            disableVertical={true}
          >
            <table
              cellpadding={0}
              cellspacing={0}
              class={[`${ns}__element`]}
              style={{
                height: '100%',
                tableLayout: 'fixed'
              }}
            >
              {renderDataColumns.value.length !== 0 && (
                <ColGroup dataColumns={renderDataColumns.value} columnWidth={columnWidth} />
              )}
              <Thead>
                {renderGroupColumns.value.map((row, index) => {
                  return (
                    <Tr key={`header-row-${index}`}>
                      {row.map((column, index) => {
                        // 最后一个不添加可拖动区域
                        const resizable =
                          props.border &&
                          props.columnResizable &&
                          Boolean(column.prop) &&
                          index < row.length - 1

                        return (
                          <Th
                            key={`th-${index}`}
                            column={column}
                            dataColumns={row}
                            resizable={resizable}
                            ref={(ins: ComponentPublicInstance) => {
                              if (ins?.$el && column.prop) {
                                thRefs.value[column.prop] = ins.$el
                              }
                            }}
                          />
                        )
                      })}
                    </Tr>
                  )
                })}
              </Thead>
            </table>
          </Component>

          {props.config.setting && <SettingIcon></SettingIcon>}
        </div>
      )
    }

    // rows
    const renderRecord = (record: TableDataWithRaw, rowIndex: number) => {
      const currentKey = record.key

      return (
        <>
          <Tr key={currentKey} rowHeight={props.rowHeight}>
            {renderDataColumns.value.map((column, index) => {
              // const cellId = `${rowIndex}-${index}`
              const [rowspan, colspan] = [1, 1]
              return (
                <Td
                  key={`td-${index}`}
                  rowIndex={rowIndex}
                  record={record}
                  column={column}
                  dataColumns={renderDataColumns.value}
                  rowSpan={rowspan}
                  colSpan={colspan}
                />
              )
            })}
          </Tr>
        </>
      )
    }

    // table body height
    const tableBodyStyle = computed(() => {
      const style: StyleValue = {
        height: addUnit(props.height),
        maxHeight: addUnit(props.maxHeight)
      }
      return style
    })

    const renderEmpty = () => {
      return (
        <Tr>
          <Td colSpan={dataColumns.value.length} empty={true}>
            {slots.empty?.() ?? <Empty />}
          </Td>
        </Tr>
      )
    }

    // 水平滚动列时当表格没有数据 表头支持滚动
    const calcTableBodyMinWidth = computed(() => {
      const arr: any[] = []
      renderDataColumns.value.forEach((column) => {
        if (column.width) {
          arr.push(addUnit(column.width))
        } else if (column.minWidth) {
          arr.push(addUnit(column.minWidth))
        }
      })

      return `calc(${arr.join(' + ')})`
    })

    const renderBody = () => {
      const Component = Scrollbar
      return (
        <div class={[`${ns}__body`]}>
          <Component
            class={[`${ns}__body-scroll`]}
            onScroll={onTbodyScroll}
            style={{
              height: tableBodyStyle.value.height,
              maxHeight: tableBodyStyle.value.maxHeight
            }}
            ref={tbodyComRef}
          >
            <table
              cellpadding={0}
              cellspacing={0}
              class={[`${ns}__element`]}
              style={{
                maxHeight: tableBodyStyle.value.maxHeight,
                tableLayout: 'fixed',
                height: !renderData.value.length ? '100%' : '',
                minWidth: calcTableBodyMinWidth.value
              }}
            >
              {renderData.value.length !== 0 && (
                <ColGroup dataColumns={renderDataColumns.value} columnWidth={columnWidth} />
              )}

              <Tbody>
                {renderData.value.length > 0
                  ? renderData.value.map((record, index) => renderRecord(record, index))
                  : renderEmpty()}
              </Tbody>
            </table>
          </Component>
        </div>
      )
    }

    const renderFooter = () => {
      // return slots.footer && (
      //   <div class={`${ns}__footer`}>{slots.footer()}</div>
      // )
    }

    const allEnabledSelectionRows = computed(() => {
      const rows: TableData[] = []
      const travel = (data: TableDataWithRaw[]) => {
        for (const record of data) {
          if (!record.disabled) {
            rows.push(record.raw!)
          }
          if (record.children) {
            travel(record.children)
          }
        }
      }
      travel(renderData.value)
      return rows
    })

    // hooks

    const { toggleSelectAll, toggleSelect, selectionRows } = useSelection({
      selection: toRef(props, 'selection') as Ref<TableData[]>,
      allEnabledSelectionRows,
      emit
    })

    const { resizingProp, columnWidth, handleThMouseDown } = useColumnResize(thRefs)

    // tableContext
    provide(
      tableInjectionKey,
      reactive({
        slots,
        scroll: {
          horScrollPosition
        },
        sortStore: {
          activeProp,
          activeSort,
          isSortPopup,
          handleSortChange
        },
        opsStore: {
          selectionRows,
          allEnabledSelectionRows,
          toggleSelectAll,
          toggleSelect
        },
        resizeStore: {
          handleThMouseDown,
          prop: resizingProp
        }
      })
    )

    // tableColumnContext
    provide(
      tableColumnInjectionKey,
      reactive({
        groupColumns: dataColumns,
        handleUpdateColumn: updateRenderColumnsData
      })
    )

    const renderTable = () => {
      return (
        <>
          {renderHeader()}
          {renderBody()}
          {renderFooter()}
        </>
      )
    }

    return () => {
      return (
        <div
          class={[
            ns,
            props.border && 'is-border',
            props.hover && 'is-hover',
            props.stripe && 'is-stripe'
          ]}
        >
          {renderTable()}
          {slots.footer && <div class={[`${ns}__external-footer`]}>{slots.footer()}</div>}

          {
            <>
              <Transition name="bn-fade-in">{props.loading && <Loading />}</Transition>
            </>
          }
        </div>
      )
    }
  }
})
