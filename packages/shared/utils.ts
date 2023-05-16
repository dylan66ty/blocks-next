// @eslint-disabled
export const getProp = (target: any, path: any, defVal?: any) => {
  let result;
  try {
    path = path.replace(/\[(\w+)\]/g, '.$1');
    result = path
      .split('.')
      .filter((f: string) => f !== '')
      .reduce((a: any, v: string) => {
        return a[v];
      }, target);
    if (!result) {
      result = defVal;
    }
  } catch (e) {
    result = defVal;
  }
  return result;
};

export const setProp = (target: any, path: any, value: any) => {
  if (!path) return path;
  path = path.replace(/\[(\w+)\]/g, `.$1`);
  const paths = path.split('.');
  paths.reduce((a: any, v: any, i: number) => {
    if (!a[v]) {
      a[v] = {};
    }
    if (i === paths.length - 1) {
      a[v] = value;
    }
    return a[v];
  }, target);
  return target;
};

export const deepClone = (obj: any, set?: any) => {
  if (!obj) return obj;
  if (typeof obj !== 'object' || obj === null) return obj;
  set = set || new Set();
  if (set.has(obj)) {
    return obj;
  }
  set.add(obj);
  const Ctor = obj.constructor;
  const newObj = new Ctor();
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      newObj[key] = obj[key] instanceof Object ? deepClone(obj[key], set) : obj[key];
    }
  }
  return newObj;
};

export const NOOP = () => {};

export const addUnit = (value: string | number | undefined, unit = 'px'): string => {
  if (value === undefined) return '';
  value = String(value);
  if (value.endsWith(unit)) {
    return value;
  }
  return value + unit;
};
