import type { DateCell } from './types'

// ymd => 不做任何处理 纯获取
export const getYMD = (date?: Date): number[] => {
  const _date = new Date(date ? date : new Date())
  const y = _date.getFullYear()
  const m = _date.getMonth()
  const d = _date.getDate()
  return [y, m, d]
}

// 获取当前月有多少天。（闰年、平年系统已经计算好了）
export const daysOfMonth = (date?: Date) => {
  const [y, m] = getYMD(date)
  return new Date(y, m + 1, 0).getDate()
}

// 获取当前月的第一天是星期几
export const firstDateIsWeekOfMonth = (date?: Date) => {
  const [y, m] = getYMD(date)
  return new Date(y, m, 1).getDay()
}

// date的加减计算
export const diffOfDate = (date: Date, diff?: number) => {
  const [, , d] = getYMD(date)
  date.setDate(d + (diff ? diff : 0))
  return date
}

// 月份的加减计算
export const diffOfMonth = (date: Date, diff?: number) => {
  const [, m] = getYMD(date)
  date.setMonth(m + (diff ? diff : 0))
  return date
}

// 年份的加减计算
export const diffOfYear = (date: Date, diff?: number) => {
  const [y] = getYMD(date)
  date.setFullYear(y + (diff ? diff : 0))
  return date
}

export const dateFormat = (date: any, format = 'yyyy-MM-dd hh:mm:ss') => {
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
    isSelect: false
  }
  return Object.assign({}, _cell, cell)
}
