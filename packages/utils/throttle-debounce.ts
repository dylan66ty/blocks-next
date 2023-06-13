export const debounce = (callback: (e: any) => void, delay: number): any => {
  let timer = 0
  return (...args:any) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      callback.apply(null,args)
    }, delay);
  }

};



export const throttle = (callback: (e: any) => void, delay = 0): any => {
  let prev = 0;
  return (...args: any) => {
    const now: number = Date.now();
    if (now - prev > delay) {
      callback.apply(null, args);
      prev = now;
    }
  };
};
