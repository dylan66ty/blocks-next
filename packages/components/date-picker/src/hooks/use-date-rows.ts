import { computed } from 'vue'
import type { Ref } from 'vue'
import type { DateCell } from '../types'
import { genMatrix } from '../../../../shared/utils'

import {
  daysOfMonth,
  diffOfMonth,
  firstDateIsWeekOfMonth,
  genCell,
  getYMD,
  isSameDate,
  dateHasInRange
} from '../utils'

const WEEKS = [
  { label: '日', value: 0 },
  { label: '一', value: 1 },
  { label: '二', value: 2 },
  { label: '三', value: 3 },
  { label: '四', value: 4 },
  { label: '五', value: 5 },
  { label: '六', value: 6 }
]

export const useDateRows = ({
  dayStartOfWeek,
  date,
  dateModel,
  dateRange,
  disabledDate,
  dateRangeOfWeek
}: {
  dayStartOfWeek: Ref<number>
  date: Ref<Date | undefined>
  dateModel: Ref<Date[]>
  dateRange?: Ref<Date[]>
  disabledDate?: Ref<Function | undefined>
  dateRangeOfWeek?: Ref<Date[]>
}) => {
  const weeks = computed(() => {
    const weeksCopy = WEEKS.slice()
    const index = WEEKS.findIndex((week) => week.value === dayStartOfWeek.value)
    if (index > -1) {
      const move = weeksCopy.slice(0, index)
      const reset = weeksCopy.slice(index)
      reset.push(...move)
      return reset
    }

    return weeksCopy
  })

  const rows = computed(() => {
    // 7 * 6
    const COL = 6
    const ROW = 7
    const cells: DateCell[] = new Array(ROW * COL)
    const days = daysOfMonth(date.value)
    const firstDateIsWeek = firstDateIsWeekOfMonth(date.value)
    const startIndex = weeks.value.findIndex((week) => week.value === firstDateIsWeek)
    // 当前
    const [cur_y, cur_m] = getYMD(date.value)
    for (let i = 0; i < days; i++) {
      const day = i + 1
      const dateEffect = new Date(cur_y, cur_m, day)
      cells[startIndex + i] = genCell({
        label: day,
        value: day,
        date: new Date(cur_y, cur_m, day),
        isCur: true,
        isNow: isSameDate(new Date(), dateEffect),
        isRange: dateRange?.value?.length
          ? dateHasInRange(dateRange!.value, dateEffect, 'range')
          : false,
        isSelect: dateModel.value.some((d) => isSameDate(d, dateEffect)),
        isRangeStart: dateRange?.value?.length
          ? dateHasInRange(dateRange!.value, dateEffect, 'start')
          : false,
        isRangeEnd: dateRange?.value?.length
          ? dateHasInRange(dateRange!.value, dateEffect, 'end')
          : false,
        isDisabled: disabledDate?.value?.(new Date(dateEffect))
      })
    }
    // 补齐前一个月
    const prevDate = diffOfMonth(date.value!, -1)
    const prevDays = daysOfMonth(prevDate)
    const [prev_y, prev_m] = getYMD(prevDate)
    for (let i = 0; i < startIndex; i++) {
      const day = prevDays - i
      const dateEffect = new Date(prev_y, prev_m, day)
      cells[startIndex - i - 1] = genCell({
        label: day,
        value: day,
        date: dateEffect,
        isPrev: true,
        isDisabled: disabledDate?.value?.(new Date(dateEffect)),
        isRange: dateRangeOfWeek?.value?.length
          ? dateHasInRange(dateRangeOfWeek!.value, dateEffect, 'range')
          : false,
        isRangeStart: dateRangeOfWeek?.value?.length
          ? dateHasInRange(dateRangeOfWeek!.value, dateEffect, 'start')
          : false,
        isRangeEnd: dateRangeOfWeek?.value?.length
          ? dateHasInRange(dateRangeOfWeek!.value, dateEffect, 'end')
          : false
      })
    }
    // 补齐后一个月
    const nextDate = diffOfMonth(date.value!, 1)
    const [next_y, next_m] = getYMD(nextDate)
    for (let i = startIndex + days, j = 0; i < ROW * COL; i++) {
      const day = ++j
      const dateEffect = new Date(next_y, next_m, day)
      cells[i] = genCell({
        label: day,
        value: day,
        date: dateEffect,
        isNext: true,
        isDisabled: disabledDate?.value?.(new Date(dateEffect)),
        isRange: dateRangeOfWeek?.value?.length
          ? dateHasInRange(dateRangeOfWeek!.value, dateEffect, 'range')
          : false,
        isRangeStart: dateRangeOfWeek?.value?.length
          ? dateHasInRange(dateRangeOfWeek!.value, dateEffect, 'start')
          : false,
        isRangeEnd: dateRangeOfWeek?.value?.length
          ? dateHasInRange(dateRangeOfWeek!.value, dateEffect, 'end')
          : false
      })
    }

    return genMatrix(cells, ROW)
  })

  return {
    weeks,
    rows
  }
}
