export type DateType = 'date' | 'daterange' | 'month' | 'monthrange' | 'week'

export interface DateCell {
  value: string | number
  label: string | number
  date: Date
  isNow: boolean
  isCur: boolean
  isPrev: boolean
  isNext: boolean
  isRange: boolean
  isSelect: boolean
  isRangeStart: boolean
  isRangeEnd: boolean
  isDisabled: boolean
  format: (date?: Date, formatter?: string) => string | undefined
}
