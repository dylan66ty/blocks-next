import type { ComponentPublicInstance, VNodeNormalizedChildren, VNode } from 'vue'

const opt = Object.prototype.toString

export function isArray(obj: any): obj is any[] {
  return opt.call(obj) === '[object Array]'
}

export function isNull(obj: any): obj is null {
  return opt.call(obj) === '[object Null]'
}

export function isBoolean(obj: unknown): obj is boolean {
  return opt.call(obj) === '[object Boolean]'
}

export function isObject(obj: any): obj is Record<string, unknown> {
  return opt.call(obj) === '[object Object]'
}

export const isPromise = <T>(obj: unknown): obj is Promise<T> => {
  return opt.call(obj) === '[object Promise]'
}

export function isString(obj: any): obj is string {
  return opt.call(obj) === '[object String]'
}

export function isNumber(obj: any): obj is number {
  return opt.call(obj) === '[object Number]' && obj === obj
}

export function isRegExp(obj: any) {
  return opt.call(obj) === '[object RegExp]'
}

export function isDate(obj: any) {
  return opt.call(obj) === '[object Date]'
}

function isHex(color: any) {
  return /^#[a-fA-F0-9]{3}$|#[a-fA-F0-9]{6}$/.test(color)
}

function isRgb(color: any) {
  return /^rgb\((\s*\d+\s*,?){3}\)$/.test(color)
}

function isRgba(color: any) {
  return /^rgba\((\s*\d+\s*,\s*){3}\s*\d(\.\d+)?\s*\)$/.test(color)
}

export function isColor(color: any): boolean {
  return isHex(color) || isRgb(color) || isRgba(color)
}

export function isUndefined(obj: any): obj is undefined {
  return obj === undefined
}

export function isFunction(obj: any): obj is (...args: any[]) => any {
  return typeof obj === 'function'
}

export function isEmptyObject(obj: any): boolean {
  return isObject(obj) && Object.keys(obj).length === 0
}

export function isExist(obj: any): boolean {
  return obj || obj === 0
}

export function isWindow(el: any): el is Window {
  return el === window
}

export const isComponentInstance = (value: any): value is ComponentPublicInstance => {
  return value?.$ !== undefined
}

export const isArrayChildren = (children: VNodeNormalizedChildren): children is VNode[] => {
  return isArray(children)
}
