import type { LoadingOptions, LoadingOpen } from './type'
import { createLoadingComponent } from './loading'

let instance: LoadingOpen | undefined

export const open = (options: LoadingOptions): LoadingOpen | undefined => {
  if (instance) return instance
  const _instance = createLoadingComponent({ ...options, fullScreen: true })
  if (!_instance) return
  _instance.appendLoading()
  instance = {
    close: () => {
      _instance.cancelLoading()
      instance = undefined
    },
    updateText: _instance.updateText!
  }
  return instance
}
