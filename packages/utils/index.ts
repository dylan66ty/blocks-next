export const debounce = (callback: Function, delay: number | string): any => {
  if (typeof callback === 'function') {
      let timer: number | unknown
      if (timer) {
          return
      }
      return new Promise((resolve) => {
          timer = setTimeout(() => {
              clearTimeout(timer as number)
              resolve(callback)
          }, Number(delay) as number)
      })
  }
}
