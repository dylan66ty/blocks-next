// @eslint-disabled
export const getProp = (target: any, path: any, defVal?: any) => {
  let result
  try {
    path = path.replace(/\[(\w+)\]/g, '.$1')
    result = path
      .split('.')
      .filter((f: string) => f !== '')
      .reduce((a: any, v: string) => {
        return a[v]
      }, target)
    if (result === undefined) {
      result = defVal
    }
  } catch (e) {
    result = defVal
  }
  return result
}

export const setProp = (target: any, path: any, value: any) => {
  if (!path) return path
  path = path.replace(/\[(\w+)\]/g, `.$1`)
  const paths = path.split('.')
  paths.reduce((a: any, v: any, i: number) => {
    if (!a[v]) {
      a[v] = {}
    }
    if (i === paths.length - 1) {
      a[v] = value
    }
    return a[v]
  }, target)
  return target
}

export const deepClone = (obj: any, set?: any) => {
  if (!obj) return obj
  if (typeof obj !== 'object' || obj === null) return obj
  set = set || new Set()
  if (set.has(obj)) {
    return obj
  }
  set.add(obj)
  const Ctor = obj.constructor
  const newObj = new Ctor()
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      newObj[key] = obj[key] instanceof Object ? deepClone(obj[key], set) : obj[key]
    }
  }
  return newObj
}

export const NOOP = () => {}

const unitArr = ['px', '%', 'vh', 'vw', 'calc']

export const addUnit = (value: string | number | undefined, unit = 'px'): string => {
  if (value === void 0) return ''
  const str = String(value)
  if (unitArr.some((u) => str.includes(u))) {
    return str
  }
  return str + unit
}

export const upperFirstChar = (text: string) => {
  text = text.trim()
  if (!text) return
  return text.slice(0, 1).toUpperCase() + text.slice(1)
}

export const compose = <T>(...fns: ((...v: T[]) => T)[]) => {
  return fns.reduce(
    (a, v) =>
      (...args: any[]) =>
        a(v(...args))
  )
}

export const pipe = <T>(...fns: ((...v: T[]) => T)[]) => {
  return fns.reduceRight(
    (a, v) =>
      (...args: any[]) =>
        a(v(...args))
  )
}

export const findLastIndex = (
  arr = [],
  callback: (item: any, i: number, origin: any[]) => boolean
) => {
  let lastIndex = -1
  for (let i = arr.length - 1; i >= 0; i--) {
    if (callback(arr[i], i, arr)) {
      lastIndex = i
      break
    }
  }
  return lastIndex
}

const getRandom = (start = 0, end = 1) => {
  return Math.floor(Math.random() * (end - start)) + start
}

export const getUniqueId = (size = 6) => {
  const code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  let ret = ''
  for (let i = 1; i <= size; i++) {
    ret += code[getRandom(0, 25)]
  }
  return ret
}

export const genMatrix = (list: any[], row: number) => {
  if (!row) return list
  let offset = 0
  const rows: any[][] = []
  while (offset < list.length - 1) {
    rows.push(list.slice(offset, (offset = offset + row)))
  }
  return rows
}

export const sleep = (delay = 0) => new Promise((resolve) => setTimeout(resolve, delay))
