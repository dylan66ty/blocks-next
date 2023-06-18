import type { ObjectDirective } from 'vue'

interface ElementState {
  __state__: Record<string, any> | null
}

const updateEleState = (el: HTMLElement & ElementState) => {
  const width = el.getBoundingClientRect().width
  const state = el.__state__ ? el.__state__ : (el.__state__ = {})
  state.initWidth = el.style.width || getComputedStyle(el).width
  state.from = width
  state.transitionend = (e: TransitionEvent) => {
    if (e.propertyName === 'width') {
      el.style.width = 'auto'
    }
  }
  return state
}

export const transitionWidth: ObjectDirective = {
  mounted(el: HTMLElement & ElementState) {
    // 父元素过度动画时间
    setTimeout(() => {
      const state = updateEleState(el)
      el.addEventListener('transitionend', state.transitionend)
    }, 300)
  },
  updated(el: HTMLElement & ElementState) {
    el.style.width = 'auto'
    const to = el.getBoundingClientRect().width
    if (!to) return
    const state = el.__state__
    if (!state) return
    el.style.width = state.from + 'px'
    state.from = to
    requestAnimationFrame(() => {
      el.style.width = to + 'px'
    })
  },
  unmounted(el: HTMLElement & ElementState) {
    const state = el.__state__
    if (state) {
      el.removeEventListener('transitionend', state.transitionend)
    }
    el.__state__ = null
  }
}
