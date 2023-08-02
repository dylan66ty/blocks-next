<script lang="ts">
  import { defineComponent } from 'vue'
  import type { PropType } from 'vue'
  import { getNamespace } from '../../../../../utils/global-config'
  import type { DateCell } from '../../types'
  export default defineComponent({
    name: 'PanelBody',
    props: {
      rows: {
        type: Array as PropType<DateCell[][]>,
        default: () => []
      }
    },
    emits: ['onCellClick', 'onCellRowClick', 'onCellMouseenter', 'onCellRowMouseenter'],
    setup(props, { emit }) {
      const ns = getNamespace('date-picker')
      const handleCell = (cell: DateCell) => {
        if (cell.isDisabled) return
        emit('onCellClick', cell)
      }

      const handleCellRowClick = (row: DateCell[]) => {
        if (isRowDisabled(row)) return
        emit('onCellRowClick', row)
      }

      const handleCellMouseenter = (cell: DateCell) => {
        if (cell.isDisabled) return
        emit('onCellMouseenter', cell)
      }

      const handleCellRowMouseenter = (row: DateCell[]) => {
        if (isRowDisabled(row)) return
        emit('onCellRowMouseenter', row)
      }

      const isRowDisabled = (row: DateCell[]) => {
        const exist = row.some((cell) => cell.isDisabled)
        if (exist) {
          return 'is-disabled'
        }
      }

      return {
        ns,
        handleCell,
        handleCellRowClick,
        handleCellMouseenter,
        handleCellRowMouseenter,
        isRowDisabled
      }
    }
  })
</script>

<template>
  <div :class="[`${ns}__body`]">
    <div
      v-for="(row, rowIndex) in rows"
      :key="rowIndex"
      :class="[`${ns}__cell-row`, isRowDisabled(row)]"
      @mouseenter="handleCellRowMouseenter(row)"
      @click="handleCellRowClick(row)"
    >
      <div
        v-for="cell in row"
        :key="cell.value"
        :class="[
          `${ns}__cell`,
          {
            'is-cur': cell.isCur,
            'is-prev': cell.isPrev,
            'is-next': cell.isNext,
            'is-select': cell.isSelect,
            'is-now': cell.isNow,
            'is-range': cell.isRange,
            'is-range-start': cell.isRangeStart,
            'is-range-end': cell.isRangeEnd,
            'is-disabled': cell.isDisabled
          }
        ]"
        @click="handleCell(cell)"
        @mouseenter="handleCellMouseenter(cell)"
      >
        <slot name="cell" v-bind="{ cell }">
          <span :class="[`${ns}__cell-text`]">
            {{ cell.label }}
          </span>
        </slot>
      </div>
    </div>
  </div>
</template>
