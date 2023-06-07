import type { ObjectDirective, DirectiveBinding } from 'vue'
import { LoadingOptions , LoadingInstance} from './type'
import { createLoadingComponent } from './loading'

const LOADING_KEY = Symbol('loading')



export type LoadingEl = HTMLElement & {
  [LOADING_KEY]?: {
    instance?: LoadingInstance
    options: LoadingOptions
  }
}

export type LoadingBinding = boolean | LoadingOptions



const createInstance = (el: LoadingEl, binding: DirectiveBinding<LoadingBinding>) => {

  const getAttributeValue = <K extends keyof LoadingOptions>(key: K) => {
    return el.getAttribute(`bn-loading-${key}`) || ''
  }

  const getBindingValue = <K extends keyof LoadingOptions>(key: K) => {
    return binding.modifiers[key]
  }


  const options: LoadingOptions = {
    background: getAttributeValue('background'),
    text: getAttributeValue('text'),
    color: getAttributeValue('color'),
    customClass: getAttributeValue('customClass'),
    renderTo: el,
    iconSize: Number(getAttributeValue('iconSize')),
    fullScreen: getBindingValue('fullScreen')
  }

  const instance = createLoadingComponent(options)
  instance?.appendLoading()

  el[LOADING_KEY] = {
    options,
    instance
  }
}

export const vLoading: ObjectDirective = {
  mounted(el, binding) {
    if (binding.value) {
      createInstance(el, binding)
    }
  },
  updated(el, binding) {
    const instance = el[LOADING_KEY]
    if (binding.oldValue !== binding.value) {
      if (binding.value && !binding.oldValue) {
        createInstance(el, binding)
      } else if (binding.value && binding.oldValue) {
        console.log('update option');
      } else {
        instance?.instance.cancelLoading()
      }
    }
  },
  unmounted(el){
    el[LOADING_KEY]?.instance.cancelLoading()
  }
}