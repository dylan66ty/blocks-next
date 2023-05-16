export const debounce = (callback: Function, delay: number): any => {
  if (typeof callback === 'function') {
    let timer: number | unknown;
    if (timer) {
      return;
    }
    return new Promise((resolve) => {
      timer = setTimeout(() => {
        clearTimeout(timer as number);
        resolve(callback);
      }, Number(delay) as number);
    });
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
