import { isClient} from '@vueuse/core'

export const isFirefox = (): boolean =>
  isClient && /firefox/i.test(window.navigator.userAgent)

  
const isH5:boolean  = isClient ? 'ontouchstart' in window : false
 

export { isClient, isH5 }