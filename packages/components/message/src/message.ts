import {
  messageTypes,
  IMessageParams,
  IMessage,
  IMessageOptions,
  IMessageMethods,
  IMessageType,
  IMessageHandler,
  IMessageCaller
} from './types'
import MessageComponent from './message.vue'
import { createVNode, render, isVNode } from 'vue'
import type { VNode } from 'vue'
import { isFunction, isObject, isString } from '../../../utils/is'

const instanceMap = new WeakMap()

const Message: Partial<IMessageMethods> & IMessageCaller = (options: IMessageParams): IMessageHandler => {

  if (typeof options === 'string') {
    options = {
      message: options
    }
  }

  let renderContainer: HTMLElement
  let renderTo = options.renderTo

  if (renderTo) {
    if (isString(renderTo)) {
      renderContainer = document.querySelector(renderTo)!
    } else {
      renderContainer = renderTo
    }
  } else {
    renderContainer = document.body
  }

  if (!instanceMap.has(renderContainer)) {
    instanceMap.set(renderContainer, [] as VNode[])
  }

  const instances: VNode[] = instanceMap.get(renderContainer)

  let offset = options.offset || 20

  instances.forEach((vm: VNode) => {
    offset += vm.el?.offsetHeight + 20
  })


  const userClose = options.onClose

  let vm: any = {}
  let props: any = {}

  const onClose = () => {
    const index = instances.findIndex((_vm: VNode) => _vm === vm)
    if (index < 0) return
    let closingInstanceOffset = vm.el?.offsetHeight + 20
    // 找到当前关闭的message实例位置 从它开始后面的message实例top都要减去当前关闭的message实例offsetHeight + 20
    instances.slice(index + 1).forEach((_vm: VNode) => {
      const top = _vm.component?.props.offset as number
      _vm.component!.props.offset = top - closingInstanceOffset
    })
    instances.splice(index, 1)
    userClose && userClose()
  }
  const onDestroy = () => {
    render(null, container)
  }

  props = { ...options, onClose, onDestroy, offset }

  vm = createVNode(MessageComponent, props,
    isFunction(props.message) || isVNode(props.message)
      ? {
        default: isFunction(props.message)
          ? props.message
          : () => props.message,
      }
      : null
  )

  const container = document.createElement('div')
  render(vm, container)

  if (renderContainer === document.body) {
    vm.el.style.position = 'fixed'
  } else {
    // TODO 获取挂在对象的position 没有的话就设置个relative
    renderContainer!.style.position = 'relative'
    vm.el.style.position = 'absolute'
  }
  renderContainer!.appendChild(container.firstElementChild!)


  instances.push(vm)


  const close = () => {
    vm.component!.proxy.handleClose()
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


export default Message