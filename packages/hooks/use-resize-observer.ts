import type { Ref } from 'vue'
import ResizeObserver from 'resize-observer-polyfill'
import { isFunction } from '../utils/is'

export const useResizeObserver = ({
  elementRef,
  onResize
}: {
  elementRef: Ref<HTMLElement | undefined>
  onResize: (args: ResizeObserverEntry) => void
}) => {
  let resizeObserver: ResizeObserver | null

  const createResizeObserver = () => {
    if (!elementRef.value) return
    resizeObserver = new ResizeObserver((entries: ResizeObserverEntry[]) => {
      const entry: ResizeObserverEntry = entries[0]

      isFunction(onResize) && onResize(entry)
    })
    resizeObserver.observe(elementRef.value)
  }

  const destroyResizeObserver = () => {
    if (resizeObserver) {
      resizeObserver.disconnect()
      resizeObserver = null
    }
  }

  return {
    createResizeObserver,
    destroyResizeObserver
  }
}
