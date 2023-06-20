import type { PropType } from 'vue'
import { defineComponent, inject, watch, ref, reactive, computed } from 'vue'
import type { TableColumnContext } from '../context'
import { tableColumnInjectionKey } from '../context'
import Checkbox from '../../../checkbox/src/checkbox.vue'
import Space from '../../../space/src/space.vue'
import Button from '../../../button/src/button.vue'
import { getNamespace } from '../../../../utils/global-config'
import type { TableColumnData } from '../types'

export default defineComponent({
  name: 'SettingPopup',
  props: {
    // eslint-disable-next-line vue/require-default-prop
    close: Function as PropType<(cb?: () => void) => void>,
    popupVisible: Boolean
  },
  setup(props) {
    const tableColumnContext = inject<TableColumnContext>(tableColumnInjectionKey)
    const ns = getNamespace('table-setting')
    // 排除column操作类型
    const groupColumns = computed(() => tableColumnContext?.groupColumns?.filter((column) => !column.type))

    const initMap = new Map()
    const columnsList = ref<TableColumnData[]>([])

    const handleCheckboxChange = (column: TableColumnData, status: boolean) => {
      column.hidden = !status
      column.checked = status
    }

    const handleCancel = () => {
      props.close?.(() => {
        // 恢复到初始状态
        groupColumns.value!.forEach((column) => {
          Object.assign(column, initMap.get(column.prop))
        })
        columnsList.value = []
        initMap.clear()
      })
    }

    const handleConfirm = () => {
      const columnProps: string[] = columnsList.value.map((column) => column.prop!)
      tableColumnContext?.handleUpdateColumn?.(columnProps)
      props.close?.()
    }

    watch(
      () => props.popupVisible,
      (val) => {
        if (val) {
          const _columns: TableColumnData[] = []
          groupColumns.value!.forEach((column) => {
            initMap.set(column.prop, {
              disabled: column.disabled,
              checked: column.checked,
              hidden: column.hidden
            })
            _columns.push(column)
          })
          columnsList.value = _columns
        }
      }
    )

    const updateColumnsList = (sourceIndex: number, targetIndex: number, item: TableColumnData) => {
      columnsList.value.splice(sourceIndex, 1)
      columnsList.value.splice(targetIndex, 0, item)
    }

    // drag相关
    const dragState = reactive({
      dragging: false,
      data: {},
      // 开始位置
      sourceIndex: -1 as number,
      // 拖动到哪里
      targetIndex: 0 as number
    })

    const clearDragState = () => {
      dragState.dragging = false
      dragState.data = {}
      dragState.sourceIndex = -1
      dragState.targetIndex = 0
    }

    // 拖动哪个元素
    const dragSourceEvent = {
      draggable: true,
      onDragstart: (e: DragEvent, column: TableColumnData, index: number) => {
        if (e.dataTransfer) {
          e.dataTransfer.effectAllowed = 'move'
          if (e.target && (e.target as HTMLElement).className.includes('drag-icon')) {
            const { parentElement } = e.target as HTMLElement
            if (parentElement && parentElement.className.includes('list-item')) {
              e.dataTransfer.setDragImage(parentElement, parentElement.clientWidth - 20, parentElement.clientHeight - 20)
            }
          }
        }
        dragState.dragging = true
        dragState.data = column
        dragState.sourceIndex = index
      },
      onDragend: (e: DragEvent) => {
        if (e.dataTransfer?.dropEffect === 'none') {
          clearDragState()
        }
      }
    }

    // 拖动元素经过的元素
    const dragTargetEvent = {
      onDragenter: (e: DragEvent, column: TableColumnData, index: number) => {
        if (e.dataTransfer) {
          e.dataTransfer.dropEffect = 'move'
        }

        if (dragState.targetIndex !== index && index !== dragState.sourceIndex && dragState.dragging) {
          updateColumnsList(dragState.sourceIndex, index, dragState.data)
        }
        dragState.targetIndex = index
        dragState.sourceIndex = index
        e.preventDefault()
        e.stopPropagation()
      },
      onDragover: (e: DragEvent) => {
        if (e.dataTransfer) {
          e.dataTransfer.dropEffect = 'move'
        }
        // 必须要阻止默认行为 不然不会触发 drag事件
        e.preventDefault()
        e.stopPropagation()
      },
      onDrop: (e: DragEvent) => {
        clearDragState()
        e.preventDefault()
      }
    }

    return () => {
      return (
        <div class={[`${ns}__popup`]}>
          <ul class={[`${ns}__list`]}>
            {columnsList.value.map((column, index) => (
              <li
                key={column.prop}
                class={[
                  `${ns}__list-item`,
                  {
                    'is-disabled': column.disabled
                  }
                ]}
                {...(!column.disabled
                  ? {
                      onDragenter(e) {
                        dragTargetEvent.onDragenter(e, column, index)
                      },
                      onDragover(e) {
                        dragTargetEvent.onDragover(e)
                      },
                      onDrop(e) {
                        dragTargetEvent.onDrop(e)
                      }
                    }
                  : {})}
                onClick={() => handleCheckboxChange(column, !column.checked)}
              >
                <div class={[`${ns}__list-item-left`]}>
                  <Checkbox
                    modelValue={column.checked}
                    disabled={column.disabled}
                    onChange={(status: boolean) => handleCheckboxChange(column, status)}
                    // @ts-ignore: click
                    onClick={(e: Event) => e.stopPropagation()}
                  />
                  <span class={[`${ns}__list-item-title`]}>{column.title}</span>
                </div>

                {!column.disabled && (
                  <div
                    class={[`${ns}__drag-icon`]}
                    draggable
                    onDragstart={(e) => dragSourceEvent.onDragstart(e, column, index)}
                    onDragend={(e) => dragSourceEvent.onDragend(e)}
                    onClick={(e: Event) => e.stopPropagation()}
                  >
                    <div class="line"></div>
                    <div class="line"></div>
                    <div class="line"></div>
                  </div>
                )}
              </li>
            ))}
          </ul>
          <div class={[`${ns}__footer`]}>
            <Space size={12}>
              <Button onClick={handleCancel}>取消</Button>
              <Button type="primary" onClick={handleConfirm}>
                确认
              </Button>
            </Space>
          </div>
        </div>
      )
    }
  }
})
