export type DateType = 'date' | 'week' | 'year' | 'month'

export interface DateCell {
  value: string | number
  label: string | number
  date: Date
  isCur: boolean
  isPrev: boolean
  isNext: boolean
  isRange: boolean
  isSelect: boolean
}
