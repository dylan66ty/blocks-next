import _Dialog from '../../dialog/src/dialog.vue'
import { createVNode, render } from 'vue'
import BnButton from '../../button/src/button.vue'
import BnSpace from '../../space/src/space.vue'
import WarningIcon from '../../icon/src/warning.vue'


import {
  MessageBoxOptions,
  MessageBoxFooterAction,
  MessageBoxFooterScoped,
  MessageBoxMethods,
  messageBoxStaticMethods,
  MessageBoxStaticMethod,
  MessageBoxCaller,
  MessageBoxBeforeAction,
  MessageBoxChainArgs,
  MessageBoxContent
} from './types'
import { isFunction } from '../../../utils/is'






const MessageBox: Partial<MessageBoxMethods> & MessageBoxCaller = (options: MessageBoxOptions): void => {

  const dialogRenderToContainer: HTMLElement = document.createElement('div')
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
    let vnode = null
    switch (type) {
      case 'warning':
        vnode = <WarningIcon size={60} color="#FF7125" />
        break;
      case 'strong':
        vnode = <WarningIcon size={60} color="#FF7125" />
        break;
      case 'error':
        vnode = <WarningIcon size={60} color="#FF7125" />
        break;
      case 'success':
        vnode = <WarningIcon size={60} color="#FF7125" />
        break;
      case 'info':
        vnode = <WarningIcon size={60} color="#FF7125" />
        break;

    }
    return vnode
  }


  const defaultHeader = () => {
    return () => {
      return (
        <>
          {defaultRenderIcon(options.type! || 'info')}
          {
            options?.title && <span class="bn-message-box__title">{options?.title}</span>
          }
        </>
      )
    }
  }

  const defaultContent = () => {
    if (isFunction(options.content)) {
      return () => options.content
    }
    return () => (
      <>
        {options.content}
      </>
    )
  }

  const defaultFooter = () => {
    const cancelText = options?.cancelText || '取消'
    const okText = options?.okText || '确认'
    return (scoped: MessageBoxFooterScoped) => {
      return (<>
        <BnSpace size={12}>
          <BnButton fill-mode='outline' onClick={scoped.cancel}>{cancelText}</BnButton>
          <BnButton type="primary" onClick={scoped.ok}>{okText}</BnButton>
        </BnSpace>
      </>)
    }
  }


  const vm = createVNode(_Dialog, {
    width: options?.width ?? 460,
    height: options?.height ?? 'auto',
    modelValue: true,
    renderTo: dialogRenderToContainer,
    center: options?.center ?? true,
    top: options?.top ?? 0,
    messageBox: true,
    onClose,
    onBeforeCancel,
    'onUpdate:modelValue': () => {
      // hack:如果你有更好的写法 欢迎pr
      vm.component!.props.modelValue = false
    },
    // 等待动画完全结束后销毁vm
    onClosed: onDestroy
  },
    {
      title: defaultHeader(),
      default: defaultContent(),
      footer: options.footer ? options.footer : defaultFooter()
    }
  )
  render(vm, vmMountContainer)
  document.body.appendChild(dialogRenderToContainer.firstElementChild!)

}



const registerAllMethods = () => {
  messageBoxStaticMethods.forEach((method: MessageBoxStaticMethod) => {
    MessageBox[method] = (content: MessageBoxContent) => {
      const okFnArr: Array<Function> = []
      const cancelFnArr: Array<Function> = []
      let _beforeOkFn:MessageBoxBeforeAction= () => true
      let _beforeCancelFn:MessageBoxBeforeAction= () => true
      setTimeout(() => {
        MessageBox({
          content: content as MessageBoxContent,
          type: method,
          beforeOnCancel: _beforeCancelFn,
          beforeOnOk: _beforeOkFn,
          onOk: () => {
            okFnArr.forEach(fn => isFunction(fn) && fn())
          },
          onCancel: () => {
            cancelFnArr.forEach(fn => isFunction(fn) && fn())
          }
        })
      })
      return {
        ok(...args:MessageBoxChainArgs) {
          if(args.length === 1) {
            okFnArr.push(args[0])
          }
          if(args.length === 2) {
            _beforeOkFn = args[0]
            okFnArr.push(args[1])
          }
          return this
        },
        cancel(...args:MessageBoxChainArgs) {
          if(args.length === 1) {
            cancelFnArr.push(args[0])
          }
          if(args.length === 2) {
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




export default MessageBox