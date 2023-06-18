import { defineComponent } from 'vue'
import type { PropType } from 'vue'
import type { TableColumnData } from '../types'
import { addUnit } from '../../../../shared/utils'

export default defineComponent({
  name: 'ColGroup',
  props: {
    dataColumns: {
      type: Array as PropType<TableColumnData[]>,
      default: () => []
    },
    columnWidth: {
      type: Object as PropType<Record<string, number>>,
      default: () => ({})
    }
  },
  setup(props) {
    return () => {
      const getStyle = (column: TableColumnData) => {
        const width = (props.columnWidth && column.prop && props.columnWidth[column.prop]) || column.width
        if (width) {
          return {
            width: addUnit(width),
            minWidth: addUnit(column.minWidth)
          }
        }
        return undefined
      }
      return (
        <colgroup>
          {props.dataColumns?.map((column) => (
            <col key={`col-${column.prop}`} style={getStyle(column)} />
          ))}
        </colgroup>
      )
    }
  }
})
