export const debounce = (callback: (e: any) => void, delay: number, immediate = false): any => {
  let timer = 0
  let start = true
  return (...args: any[]) => {
    if (timer) clearTimeout(timer)
    if (start && immediate) {
      // eslint-disable-next-line prefer-spread
      callback.apply(null, args)
      start = false
      timer = setTimeout(() => {
        start = true
      }, delay)
      return
    }
    timer = setTimeout(() => {
      timer = 0
      // eslint-disable-next-line prefer-spread
      callback.apply(null, args)
      if (immediate) {
        start = true
      }
    }, delay)
  }
}

export const throttle = (callback: (e: any) => void, delay = 0): any => {
  let prev = 0
  return (...args: any[]) => {
    const now: number = Date.now()
    if (now - prev > delay) {
      // eslint-disable-next-line prefer-spread
      callback.apply(null, args)
      prev = now
    }
  }
}
