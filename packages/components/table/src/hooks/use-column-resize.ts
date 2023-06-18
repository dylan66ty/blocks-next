import type { Ref } from 'vue'
import { reactive, ref } from 'vue'
import { off, on } from '../../../../utils/dom'

export const useColumnResize = (thRefs: Ref<Record<string, HTMLElement>>) => {
  const resizingProp = ref('')
  const columnWidth = reactive<Record<string, number>>({})

  const handleThMouseDown = (prop: string, ev: MouseEvent) => {
    ev.preventDefault()

    resizingProp.value = prop
    on(window, 'mousemove', handleThMouseMoving)
    on(window, 'mouseup', handleThMouseUp)
    on(window, 'contextmenu', handleThMouseUp)
  }

  const handleThMouseUp = () => {
    resizingProp.value = ''
    off(window, 'mousemove', handleThMouseMoving)
    off(window, 'mouseup', handleThMouseUp)
    off(window, 'contextmenu', handleThMouseUp)
  }

  const handleThMouseMoving = (ev: MouseEvent) => {
    const element = thRefs.value[resizingProp.value]
    if (element) {
      const { clientX } = ev
      const { x } = element.getBoundingClientRect()
      let width = Math.ceil(clientX - x)
      if (width < 40) {
        width = 40
      }
      columnWidth[resizingProp.value] = width
    }
  }

  return {
    resizingProp,
    columnWidth,
    handleThMouseDown,
    handleThMouseUp
  }
}
