import { createVNode, render, isVNode } from 'vue'
import type { VNode } from 'vue'
import { isFunction, isObject } from '../../../utils/is'
import { getElement } from '../../../utils/dom'
import { messageTypes } from './types'
import type { IMessageParams, IMessage, IMessageOptions, IMessageMethods, IMessageType, IMessageHandler, IMessageCaller } from './types'
import MessageComponent from './message.vue'

const domMap = new WeakMap()

const Message: Partial<IMessageMethods> & IMessageCaller = (options: IMessageParams): IMessageHandler => {
  if (typeof options === 'string' || isVNode(options)) {
    options = {
      message: options
    }
  }

  const renderContainer: HTMLElement = getElement(options.renderTo || 'body') as HTMLElement

  if (!domMap.has(renderContainer)) {
    domMap.set(renderContainer, [] as VNode[])
  }

  const instances: VNode[] = domMap.get(renderContainer)

  let offset = options.offset || 20

  instances.forEach((vm: VNode) => {
    offset += vm.el?.offsetHeight + 20
  })

  const userClose = options.onClose

  let props: Record<string, any> = {}

  const onClose = () => {
    const index = instances.findIndex((_vm: VNode) => _vm === vm)
    if (index < 0) return
    const closingInstanceOffset = vm.el?.offsetHeight + 20
    // 找到当前关闭的message实例位置 从它开始后面的message实例top都要减去当前关闭的message实例offsetHeight + 20
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

  props = { ...options, onClose, onDestroy, offset }

  const vm = createVNode(
    MessageComponent,
    props,
    isFunction(props.message) || isVNode(props.message)
      ? {
          default: isFunction(props.message) ? props.message : () => props.message
        }
      : null
  )

  const container = document.createElement('div')
  render(vm, container)

  if (renderContainer.tagName === 'BODY') {
    vm.el!.style.position = 'fixed'
  } else {
    // TODO 获取挂在对象的position 没有的话就设置个relative
    renderContainer!.style.position = 'relative'
    vm.el!.style.position = 'absolute'
  }

  renderContainer!.appendChild(container.firstElementChild!)

  instances.push(vm)

  const close = () => {
    ;(vm.component!.proxy as any).handleClose()
  }

  return {
    close
  }
}

const registerAllMethods = () => {
  messageTypes.forEach((method: IMessageType) => {
    Message[method] = (message: IMessage | IMessageOptions) => {
      if (isObject(message)) {
        return Message({
          type: method,
          ...message
        })
      }
      return Message({
        message: message as string,
        type: method
      })
    }
  })
}

registerAllMethods()

export default Message as IMessageMethods
