<script lang="ts">
  import { computed, defineComponent } from 'vue'
  import type { PropType } from 'vue'
  import { getNamespace } from '../../../../../utils/global-config'
  import type { DateCell } from '../../types'
  export default defineComponent({
    name: 'PanelBody',
    props: {
      rows: {
        type: Array as PropType<DateCell[][]>,
        default: () => []
      },
      type: {
        type: String,
        default: undefined
      }
    },
    emits: ['onCellClick', 'onCellMouseenter'],
    setup(props, { emit }) {
      const ns = getNamespace('date-picker')
      const handleCell = (cell: DateCell) => {
        if (cell.isDisabled) return
        emit('onCellClick', cell)
      }
      const handleMouseenter = (cell: DateCell) => {
        if (cell.isDisabled) return
        emit('onCellMouseenter', cell)
      }

      const typeCls = computed(() => props.type && `is-${props.type}`)

      return {
        ns,
        typeCls,
        handleCell,
        handleMouseenter
      }
    }
  })
</script>

<template>
  <div :class="[`${ns}__body`]">
    <div v-for="(row, rowIndex) in rows" :key="rowIndex" :class="[`${ns}__cell-row`, typeCls]">
      <div
        v-for="cell in row"
        :key="cell.value"
        :class="[
          `${ns}__cell`,
          typeCls,
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
        @mouseenter="handleMouseenter(cell)"
      >
        <slot name="cell" v-bind="{ cell }">
          <span :class="[`${ns}__cell-text`, typeCls]">
            {{ cell.label }}
          </span>
        </slot>
      </div>
    </div>
  </div>
</template>
