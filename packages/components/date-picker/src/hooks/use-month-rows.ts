import type { Ref } from 'vue'
import { computed } from 'vue'
import { genCell, getYMD, isSameDate, dateHasInRange } from '../utils'
import { genMatrix } from '../../../../shared/utils'

const MONTHS = [
  '一月',
  '二月',
  '三月',
  '四月',
  '五月',
  '六月',
  '七月',
  '八月',
  '九月',
  '十月',
  '十一月',
  '十二月'
]

export const useMonthRows = ({
  date,
  dateModel,
  dateRange,
  disabledDate
}: {
  date: Ref<Date | undefined>
  dateModel: Ref<Date[]>
  dateRange?: Ref<Date[]>
  disabledDate?: Ref<Function | undefined>
}) => {
  const rows = computed(() => {
    const cells = []
    const ROW = 4
    const [y] = getYMD(date.value)
    for (let i = 0; i < 12; i++) {
      const dateEffect = new Date(y, i, 1)
      const cell = genCell({
        value: i,
        label: MONTHS[i],
        date: dateEffect,
        isCur: true,
        isNow: isSameDate(new Date(), dateEffect),
        isSelect: dateModel.value.some((d) => isSameDate(d, dateEffect)),
        isDisabled: disabledDate?.value?.(new Date(dateEffect)),
        isRange: dateRange?.value.length
          ? dateHasInRange(dateRange!.value, dateEffect, 'range')
          : false,
        isRangeStart: dateRange?.value.length
          ? dateHasInRange(dateRange!.value, dateEffect, 'start')
          : false,
        isRangeEnd: dateRange?.value.length
          ? dateHasInRange(dateRange!.value, dateEffect, 'end')
          : false
      })
      cells.push(cell)
    }

    return genMatrix(cells, ROW)
  })

  return {
    rows
  }
}
