import { createVNode, render, isVNode } from 'vue'
import type { RenderFunction, VNode } from 'vue'
import _Dialog from '../../dialog/src/dialog.vue'
import BnButton from '../../button/src/button.vue'
import BnSpace from '../../space/src/space.vue'

import { BnIconWarningFill, BnIconPrompt, BnIconCheckFill, BnIconCloseFill } from '../../icon'

import { isFunction } from '../../../utils/is'

import type {
  MessageBoxOptions,
  MessageBoxFooterAction,
  MessageBoxFooterScoped,
  MessageBoxMethods,
  MessageBoxStaticMethod,
  MessageBoxCaller,
  MessageBoxBeforeAction,
  MessageBoxChainArgs,
  MessageBoxContent
} from './types'
import { messageBoxStaticMethods } from './types'

const MessageBox: Partial<MessageBoxMethods> & MessageBoxCaller = (
  options: MessageBoxOptions
): void => {
  const vmMountContainer: HTMLElement = document.createElement('div')

  const onDestroy = () => {
    render(null, vmMountContainer)
  }

  const onBeforeCancel = (action: MessageBoxFooterAction) => {
    if (action === 'cancel') {
      if (options.beforeOnCancel) {
        return options.beforeOnCancel()
      }
      return true
    }
    if (action === 'ok') {
      if (options.beforeOnOk) {
        return options.beforeOnOk()
      }
      return true
    }
  }

  const onClose = (action: MessageBoxFooterAction, e: Event) => {
    if (action === 'cancel') {
      options.onCancel && options.onCancel(e)
    }

    if (action === 'ok') {
      options.onOk && options.onOk(e)
    }
  }

  const defaultRenderIcon = (type: MessageBoxStaticMethod) => {
    let vnode: VNode
    switch (type) {
      case 'warning':
        vnode = <BnIconWarningFill size="60px" color="#f6c64b" />
        break
      case 'strong':
        vnode = <BnIconWarningFill size="60px" color="#ee793c" />
        break
      case 'error':
        vnode = <BnIconCloseFill size="60px" color="#e24f48" />
        break
      case 'success':
        vnode = <BnIconCheckFill size="60px" color="#68d1ab" />
        break
      case 'info':
        vnode = <BnIconPrompt size="60px" color="#2355f5" />
        break
    }
    return vnode!
  }

  const defaultHeader = () => {
    return () => {
      return <>{defaultRenderIcon(options.type || 'success')}</>
    }
  }

  const defaultBody = () => {
    const renderTitle = (title: RenderFunction | string) => {
      if (isVNode(title)) return title
      if (isFunction(title)) {
        const vnode = title()
        return isVNode(vnode) ? vnode : null
      }
      return <div class="bn-message-box__title"> {title} </div>
    }

    const renderContent = (content: RenderFunction | string) => {
      if (isVNode(content)) return content
      if (isFunction(content)) {
        const vnode = content()
        return isVNode(vnode) ? vnode : null
      }
      return <div class="bn-message-box__content"> {options.content} </div>
    }

    return () => (
      <>
        {options.title && renderTitle(options.title)}
        {options.content && renderContent(options.content)}
      </>
    )
  }

  const defaultFooter = () => {
    if (isVNode(options.footer)) return options.footer
    if (isFunction(options.footer)) {
      return options.footer
    }

    const cancelText = options?.cancelText || '取消'
    const okText = options?.okText || '确认'
    return (scoped: MessageBoxFooterScoped) => {
      return (
        <BnSpace size={12}>
          {!options.hideCancel && (
            <BnButton onClick={scoped.cancel} loading={scoped.loadingObj?.cancel}>
              {cancelText}
            </BnButton>
          )}
          {!options.hideOk && (
            <BnButton type="primary" onClick={scoped.ok} loading={scoped.loadingObj?.ok}>
              {okText}
            </BnButton>
          )}
        </BnSpace>
      )
    }
  }

  const vm = createVNode(
    _Dialog,
    {
      messageBox: true,
      width: options?.width ?? 460,
      height: options?.height ?? 'auto',
      modelValue: true,
      renderTo: options?.renderTo,
      center: options?.top ? false : options?.center ?? true,
      top: options?.top ?? 0,
      mask: options?.mask ?? true,
      maskToClose: options?.maskToClose ?? true,
      popupClass: options.popupClass,
      onClose,
      onBeforeCancel,
      'onUpdate:modelValue': () => {
        // hack:如果你有更好的写法 欢迎pr
        vm.component!.props.modelValue = false
      },
      // 等待动画完全结束后销毁vm
      onClosed: onDestroy,
      onOpened: () => {}
    },
    {
      title: defaultHeader(),
      default: defaultBody(),
      footer: defaultFooter()
    }
  )

  render(vm, vmMountContainer)
}

const registerAllMethods = () => {
  messageBoxStaticMethods.forEach((method: MessageBoxStaticMethod) => {
    MessageBox[method] = (title: MessageBoxContent, content: MessageBoxContent) => {
      const okFnArr: Array<Function> = []
      const cancelFnArr: Array<Function> = []
      let _beforeOkFn: MessageBoxBeforeAction = () => true
      let _beforeCancelFn: MessageBoxBeforeAction = () => true
      setTimeout(() => {
        MessageBox({
          title,
          content,
          type: method,
          beforeOnCancel: _beforeCancelFn,
          beforeOnOk: _beforeOkFn,
          onOk: () => {
            okFnArr.forEach((fn) => isFunction(fn) && fn())
          },
          onCancel: () => {
            cancelFnArr.forEach((fn) => isFunction(fn) && fn())
          }
        })
      }, 0)
      return {
        ok(...args: MessageBoxChainArgs) {
          if (args.length === 1) {
            okFnArr.push(args[0])
          }
          if (args.length === 2) {
            _beforeOkFn = args[0]
            okFnArr.push(args[1])
          }
          return this
        },
        cancel(...args: MessageBoxChainArgs) {
          if (args.length === 1) {
            cancelFnArr.push(args[0])
          }
          if (args.length === 2) {
            _beforeCancelFn = args[0]
            cancelFnArr.push(args[1])
          }
          return this
        }
      }
    }
  })
}

registerAllMethods()

export default MessageBox as MessageBoxMethods
