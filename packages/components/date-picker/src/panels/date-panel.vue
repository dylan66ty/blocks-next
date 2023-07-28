<script lang="ts">
  import { computed, defineComponent } from 'vue'
  import { getNamespace } from '../../../../utils/global-config'
  import { daysOfMonth, firstDateIsWeekOfMonth, diffOfMonth, genCell, getYMD } from '../utils'
  import type { DateCell } from '../types'
  import PanelBody from './layout/body.vue'
  import PanelHeader from './layout/header.vue'
  import PanelWeek from './layout/week.vue'

  export default defineComponent({
    name: 'DatePanel',
    components: {
      PanelHeader,
      PanelBody,
      PanelWeek
    },
    setup() {
      const ns = getNamespace('date-picker')
      const defaultDate = new Date()
      const COL = 6
      const WEEKS = [
        { label: '一', value: 1 },
        { label: '二', value: 2 },
        { label: '三', value: 3 },
        { label: '四', value: 4 },
        { label: '五', value: 5 },
        { label: '六', value: 6 },
        { label: '日', value: 0 }
      ]
      const ROW = WEEKS.length

      const rows = computed(() => {
        // 7 * 6
        const cells: DateCell[] = new Array(ROW * COL)
        const days = daysOfMonth(defaultDate)
        const firstDateIsWeek = firstDateIsWeekOfMonth(defaultDate)
        const startIndex = WEEKS.findIndex((week) => week.value === firstDateIsWeek)
        // 当前
        const [cur_y, cur_m] = getYMD(defaultDate)
        for (let i = 0; i < days; i++) {
          const day = i + 1
          cells[startIndex + i] = genCell({
            label: day,
            value: day,
            date: new Date(cur_y, cur_m, day),
            isCur: true
          })
        }
        // 补齐前一个月
        const prevDate = diffOfMonth(defaultDate, -1)
        const prevDays = daysOfMonth(prevDate)
        const [prev_y, prev_m] = getYMD(defaultDate)
        for (let i = 0; i < startIndex; i++) {
          const day = prevDays - i
          cells[startIndex - i - 1] = genCell({
            label: day,
            value: day,
            date: new Date(prev_y, prev_m, day),
            isPrev: true
          })
        }
        // 补齐后一个月
        const nextDate = diffOfMonth(defaultDate, 1)
        const [next_y, next_m] = getYMD(nextDate)
        for (let i = startIndex + days, j = 0; i < ROW * COL; i++) {
          const day = ++j
          cells[i] = genCell({
            label: day,
            value: day,
            date: new Date(next_y, next_m, day),
            isNext: true
          })
        }

        let offset = 0
        let cellRows: DateCell[][] = []
        while (offset < cells.length - 1) {
          cellRows.push(cells.slice(offset, (offset = offset + ROW)))
        }

        return cellRows
      })

      return {
        ns,
        WEEKS,
        rows
      }
    }
  })
</script>

<template>
  <PanelHeader />
  <PanelWeek :weeks="WEEKS" />
  <PanelBody :rows="rows" />
</template>
