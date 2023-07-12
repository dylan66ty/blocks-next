import type { VNode, CSSProperties } from 'vue'
import { NOOP } from '../shared/utils'
import { isObject, isString } from './is'
import { isClient } from './browser'
import { toCamelCase } from './convert-case'

export const on = (() => {
  if (!isClient) {
    return NOOP
  }
  return <K extends keyof HTMLElementEventMap>(
    element: HTMLElement | Window,
    event: K,
    handler: (ev: HTMLElementEventMap[K]) => void,
    options: boolean | AddEventListenerOptions = false
  ) => {
    element.addEventListener(event, handler as EventListenerOrEventListenerObject, options)
  }
})()

export const off = (() => {
  if (!isClient) {
    return NOOP
  }
  return <K extends keyof HTMLElementEventMap>(
    element: HTMLElement | Window,
    type: K,
    handler: (ev: HTMLElementEventMap[K]) => void,
    options: boolean | EventListenerOptions = false
  ) => {
    element.removeEventListener(type, handler as EventListenerOrEventListenerObject, options)
  }
})()

export const findDomNode = (vnode: VNode) => {
  let node = vnode.el
  while (node && !node.tagName) {
    node = node.nextSibling
  }
  return node as HTMLElement
}

export const contains = (root: Node | null | undefined, ele: Node | null) => {
  if (!root || !ele) {
    return false
  }
  let node: Node | null = ele
  while (node) {
    if (node === root) {
      return true
    }
    node = node.parentNode
  }
  return false
}

export const querySelector = (selectors: string, container?: Document | HTMLElement) => {
  if (!isClient) {
    return
  }
  return (container ?? document).querySelector<HTMLElement>(selectors) ?? undefined
}

export const getElement = (
  target: string | HTMLElement | undefined,
  container?: Document | HTMLElement
): HTMLElement | undefined => {
  if (isString(target)) {
    const selector = target[0] === '#' ? `[id='${target.slice(1)}']` : target
    return querySelector(selector, container)
  }
  return target
}

/**
 * Get the relative distance between two DOMs
 * @param target
 * @param relative
 */
export const getRelativeRect = (target: HTMLElement, relative: HTMLElement) => {
  const targetRect = target.getBoundingClientRect()
  const relativeRect = relative.getBoundingClientRect()

  return {
    top: targetRect.top - relativeRect.top,
    bottom: relativeRect.bottom - targetRect.bottom,
    left: targetRect.left - relativeRect.left,
    right: relativeRect.right - targetRect.right,
    width: targetRect.width,
    height: targetRect.height
  }
}

export const isScroll = (element: HTMLElement) => {
  return element.tagName === 'BODY'
    ? document.documentElement.scrollHeight > window.innerHeight
    : element.scrollHeight > element.offsetHeight
}

export const getScrollBarWidth = (element: HTMLElement) => {
  if (element.tagName === 'BODY') {
    return window.innerWidth - (document.documentElement.offsetWidth || document.body.offsetWidth)
  }
  const { borderLeftWidth, borderRightWidth } = window.getComputedStyle(element)
  const borderWidth =
    Number(borderLeftWidth.replace('px', '')) + Number(borderRightWidth.replace('px', ''))
  const scrollbarWidth = element.offsetWidth - (element.clientWidth + borderWidth)
  return scrollbarWidth
}

export const getStyle = (element: HTMLElement, styleName: keyof CSSProperties): string => {
  if (!isClient || !element || !styleName) return ''

  let key = toCamelCase(styleName)
  if (key === 'float') key = 'cssFloat'
  try {
    const style = (element.style as any)[key]
    if (style) return style
    const computed: any = document.defaultView?.getComputedStyle(element, '')
    return computed ? computed[key] : ''
  } catch {
    return (element.style as any)[key]
  }
}

export const setStyle = (
  element: HTMLElement,
  styleName: CSSProperties | keyof CSSProperties,
  value?: string | number
) => {
  if (!element || !styleName) return
  if (isObject(styleName)) {
    Object.entries(styleName).forEach(([prop, value]) =>
      setStyle(element, prop as any, value as string)
    )
  } else {
    const key: any = toCamelCase(styleName as keyof CSSProperties)
    element.style[key] = value as any
  }
}
