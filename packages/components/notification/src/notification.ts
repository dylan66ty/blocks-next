import { createVNode, isVNode, render } from 'vue'
import type { VNode } from 'vue'
import { getElement } from '../../../utils/dom'
import { isFunction } from '../../../utils/is'
import type { NotificationOptions } from './types'
import _Notification from './notification.vue'

const domMap = new WeakMap()

const Notification = (options: NotificationOptions) => {
  const renderTo = getElement(options.renderTo || 'body') as HTMLElement
  const container = document.createElement('div')

  if (!domMap.get(renderTo)) {
    domMap.set(renderTo, {})
  }

  if (!domMap.get(renderTo)[options.position!]) {
    domMap.get(renderTo)[options.position!] = []
  }
  const instances: VNode[] = domMap.get(renderTo)[options.position!]

  let offset = options.offset || 20
  instances.forEach((vm: VNode) => {
    offset += vm.el?.offsetHeight + 20
  })

  const renderToBody = renderTo.tagName === 'BODY'

  if (!renderToBody) {
    renderTo.style.position = 'relative'
    renderTo.style.overflowX = 'hidden'
  }

  const userClose = options.onClose

  const onClose = () => {
    const index = instances.findIndex((_vm: VNode) => _vm === vm)
    if (index < 0) return
    const closingInstanceOffset = vm.el?.offsetHeight + 20
    instances.slice(index + 1).forEach((_vm: VNode) => {
      const top = _vm.component?.props.offset as number
      _vm.component!.props.offset = top - closingInstanceOffset
    })
    instances.splice(index, 1)

    userClose && userClose(vm)
  }

  const onDestroy = () => {
    render(null, container)
  }

  const vm = createVNode(
    _Notification,
    {
      message: options.message,
      title: options.title,
      type: options.type,
      offset,
      renderToBody,
      position: options.position,
      duration: options.duration ?? 3000,
      showClose: options.showClose ?? true,
      onClose,
      onDestroy
    },
    isFunction(options.message) || isVNode(options.message)
      ? {
          default: isFunction(options.message) ? options.message : () => options.message
        }
      : null
  )

  render(vm, container)

  instances.push(vm)

  renderTo?.appendChild(container.firstChild!)
}

export default Notification
