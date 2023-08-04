import { isNumber, isSameArray } from '../../../utils/is'
import type { DateCell } from './types'

// ymd => 不做任何处理 纯获取
export const getYMD = (date?: Date): number[] => {
  if (!date) return []
  const _date = new Date(date)
  const y = _date.getFullYear()
  const m = _date.getMonth()
  const d = _date.getDate()
  return [y, m, d]
}

// 获取当前月有多少天
export const daysOfMonth = (date?: Date) => {
  const [y, m] = getYMD(date)
  return new Date(y, m + 1, 0).getDate()
}
// 当前日期在本年是第几天
export const daysOfYear = (date?: Date) => {
  const [y, m, d] = getYMD(date)
  let day = d
  for (let i = 0; i < m; i++) {
    day += daysOfMonth(new Date(y, i, 1))
  }
  return day
}

// 获取当前月的第一天是星期几
export const firstDateIsWeekOfMonth = (date?: Date) => {
  const [y, m] = getYMD(date)
  return new Date(y, m, 1).getDay()
}

// date的加减计算
export const diffOfDate = (date: Date, diff?: number) => {
  const [oldYear, oldMonth, oldDate] = getYMD(date)
  const _date = new Date(oldYear, oldMonth, oldDate)
  _date.setDate(oldDate + (diff ? diff : 0))
  return _date
}

// 月份的加减计算
export const diffOfMonth = (date: Date, diff?: number) => {
  const [oldYear, oldMonth] = getYMD(date)
  const _date = new Date(oldYear, oldMonth, 1)
  _date.setMonth(oldMonth + (diff ? diff : 0))
  return _date
}

// 年份的加减计算
export const diffOfYear = (date: Date, diff?: number) => {
  const [oldYear, oldMonth] = getYMD(date)
  const _date = new Date(oldYear, oldMonth, 1)
  _date.setFullYear(oldYear + (diff ? diff : 0))
  return _date
}

export const isSameDate = (a: Date | undefined, b: Date | undefined) => {
  return isSameArray(getYMD(a), getYMD(b))
}

export const isSameMonth = (a: Date | undefined, b: Date | undefined) => {
  return isSameArray(getYMD(a).slice(0, 2), getYMD(b).slice(0, 2))
}

export const isSameYear = (a: Date | undefined, b: Date | undefined) => {
  return isSameArray(getYMD(a).slice(0, 1), getYMD(b).slice(0, 1))
}

export const getDateRangeOfWeek = (date: Date, weeks: Array<{ label: string; value: number }>) => {
  const dayOfWeek = date.getDay()
  const index = weeks.findIndex((week) => week.value === dayOfWeek)
  const range: Date[] = [date]
  for (let i = 1; i <= index; i++) {
    range.unshift(diffOfDate(date, -i))
  }
  for (let i = 1; i < 7 - index; i++) {
    range.push(diffOfDate(date, i))
  }
  return range
}

export const parseWeek2DateRange = (
  year: number,
  week: number,
  weeks: Array<{ label: string; value: number }>
) => {
  const firstDay = new Date(year, 0, 1)
  const index = weeks.findIndex((w) => w.value === firstDay.getDay())
  const range = getDateRangeOfWeek(firstDay, weeks)
  const start = range[0]
  const end = range[range.length - 1]
  const std = index > 3 ? diffOfDate(end, 1) : start
  const s = diffOfDate(std, (week - 1) * 7)
  const e = diffOfDate(std, week * 7 - 1)
  return [s, e]
}

export const weekOfYear = (
  date: Date,
  weeks: Array<{ label: string; value: number }>
): { year: number; week: number } => {
  const range = getDateRangeOfWeek(date, weeks)
  const [prevYear] = getYMD(range[0])
  const [nextYear] = getYMD(range[range.length - 1])
  let stdYear = range[0].getFullYear()
  if (prevYear !== nextYear) {
    const prevDates = range.filter((d) => d.getFullYear() === prevYear)
    const nextDates = range.filter((d) => d.getFullYear() === nextYear)
    if (prevDates.length < nextDates.length) {
      stdYear = range[range.length - 1].getFullYear()
    }
  }
  const yearStartDate = new Date(stdYear, 0, 1)
  const index = weeks.findIndex((week) => week.value === yearStartDate.getDay())
  const start = index > 3 ? diffOfDate(yearStartDate, 6 - index) : diffOfDate(yearStartDate, -index)
  const weekCounter = Math.floor((date.getTime() - start.getTime()) / (24 * 60 * 60 * 1000) / 7) + 1
  return {
    year: stdYear,
    week: weekCounter
  }
}

// format:yyyy-MM-dd hh:mm:ss
export const dateFormat = (date: any, format?: string) => {
  if (!format) return date
  if (typeof date === 'string') {
    const mts = date.match(/(\/Date\((\d+)\)\/)/)
    if (mts && mts.length >= 3) {
      date = parseInt(mts[2])
    }
  }
  date = new Date(date)
  if (!date || date.toUTCString() == 'Invalid Date') {
    return ''
  }
  const map: Record<string, any> = {
    M: date.getMonth() + 1, //月份
    d: date.getDate(), // 日
    h: date.getHours(), //小时
    m: date.getMinutes(), //分
    s: date.getSeconds(), //秒
    q: Math.floor((date.getMonth() + 3) / 3), //季度
    S: date.getMilliseconds() //毫秒
  }
  format = format.replace(/([yMdhmsqS])+/g, (all, t) => {
    let v = map[t]
    if (v !== undefined) {
      if (all.length > 1) {
        v = '0' + v
        v = v.substr(v.length - 2)
      }
      return v
    } else if (t === 'y') {
      return (date.getFullYear() + '').slice(4 - all.length)
    }
    return all
  })
  return format
}

export const genCell = (cell: Partial<DateCell>) => {
  const _cell: DateCell = {
    value: '',
    label: '',
    date: new Date(),
    isCur: false,
    isPrev: false,
    isNext: false,
    isRange: false,
    isSelect: false,
    isNow: false,
    isRangeStart: false,
    isRangeEnd: false,
    isDisabled: false
  }
  return Object.assign({}, _cell, cell)
}

export const compareMonth = (newDate: Date | undefined, oldDate: Date | undefined) => {
  const [newYear, newMonth] = getYMD(newDate)
  const [, oldMonth] = getYMD(oldDate)
  if (newMonth !== oldMonth && isNumber(newMonth)) {
    return new Date(newYear, newMonth, 1)
  }
}

export const compareYear = (newDate: Date | undefined, oldDate: Date | undefined) => {
  const [newYear] = getYMD(newDate)
  const [oldYear] = getYMD(oldDate)
  if (newYear !== oldYear && isNumber(newYear)) {
    return new Date(newYear, 1, 1)
  }
}

export const transToStartTimestampOfDay = (date: Date) => {
  const [y, m, d] = getYMD(date)
  const _date = new Date(y, m, d) // 转化成 2023-08-01 00:00:00 格式
  return _date.getTime()
}

export const dateHasInRange = (dateRange: Date[], date: Date, type: 'range' | 'start' | 'end') => {
  const time = transToStartTimestampOfDay(date)
  const times = dateRange.map((d) => transToStartTimestampOfDay(d))
  const max = Math.max(...times)
  const min = Math.min(...times)
  let ret = false
  switch (type) {
    case 'range':
      ret = time >= min && time <= max
      break
    case 'start':
      ret = time === min
      break
    case 'end':
      ret = time === max
      break
  }
  return ret
}
