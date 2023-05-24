import _Dialog from '../../dialog/src/dialog.vue'
import { createVNode, render, isVNode, nextTick, ref } from 'vue'
import type { RenderFunction, VNode } from 'vue'
import BnButton from '../../button/src/button.vue'
import BnSpace from '../../space/src/space.vue'


import WarningIcon from '../../icon/src/base/warning.vue'
import InfoIcon from '../../icon/src/base/prompt.vue'
import SuccessIcon from '../../icon/src/base/success.vue'
import ErrorIcon from '../../icon/src/base/close-fill.vue'




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
import { getElement } from '../../../utils/dom'
import { useOverflow } from '../../../hooks/use-overflow'


const MessageBox: Partial<MessageBoxMethods> & MessageBoxCaller = (options: MessageBoxOptions): void => {
  const vmMountContainer: HTMLElement = document.createElement('div')
  const dialogContainer: HTMLElement = document.createElement('div')

  const renderTo = getElement(options?.renderTo || 'body')!

  const { setOverflowHidden, resetOverflow } = useOverflow(ref(renderTo))

  const onDestroy = () => {
    render(null, vmMountContainer)
    resetOverflow()
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
    let vnode: VNode;
    switch (type) {
      case 'warning':
        // @ts-ignore
        vnode = <WarningIcon size="60px" color="#f6c64b" />
        break;
      case 'strong':
        // @ts-ignore
        vnode = <WarningIcon size="60px" color="#ee793c" />
        break;
      case 'error':
        // @ts-ignore
        vnode = <ErrorIcon size="60px" color="#e24f48" />
        break;
      case 'success':
        // @ts-ignore
        vnode = <SuccessIcon size="60px" color="#68d1ab" />
        break;
      case 'info':
        // @ts-ignore
        vnode = <InfoIcon size="60px" color="#2355f5" />
        break;

    }
    return vnode!
  }


  const defaultHeader = () => {
    return () => {
      return (
        <>
          {defaultRenderIcon(options.type || 'success')}
        </>
      )
    }
  }

  const defaultBody = () => {
    const renderTitle = (title: RenderFunction | string) => {
      if (isVNode(title)) return title
      if (isFunction(title)) {
        const vnode = title()
        return isVNode(vnode) ? vnode : null
      }
      return (<div class="bn-message-box__title"> {title} </div>)
    }

    const renderContent = (content: RenderFunction | string) => {
      if (isVNode(content)) return content
      if (isFunction(content)) {
        const vnode = content()
        return isVNode(vnode) ? vnode : null
      }
      return (<div class="bn-message-box__content"> {options.content} </div>)
    }

    return () => (
      <>
        {
          options.title && renderTitle(options.title)
        }
        {
          options.content && renderContent(options.content)
        }
      </>
    )
  }

  const defaultFooter = () => {
    if(isVNode(options.footer)) return options.footer
    if (isFunction(options.footer) ) {
      return options.footer
    }

    const cancelText = options?.cancelText || '取消'
    const okText = options?.okText || '确认'
    return (scoped: MessageBoxFooterScoped) => {
      return (<>
        <BnSpace size={12}>
          {
            !options.hideCancel && (<BnButton fill-mode='outline' onClick={scoped.cancel} loading={scoped.loadingObj?.cancel}>{cancelText}</BnButton>)
          }
          <BnButton type="primary" onClick={scoped.ok} loading={scoped.loadingObj?.ok}>{okText}</BnButton>
        </BnSpace>
      </>)
    }
  }




  const vm = createVNode(_Dialog, {
    messageBox: true,
    width: options?.width ?? 460,
    height: options?.height ?? 'auto',
    modelValue: true,
    renderTo: dialogContainer,
    center: options?.top ? false : options?.center ?? true,
    top: options?.top ?? 0,
    mask: options?.mask ?? true,
    maskToClose: options?.maskToClose ?? true,
    onClose,
    onBeforeCancel,
    'onUpdate:modelValue': () => {
      // hack:如果你有更好的写法 欢迎pr
      vm.component!.props.modelValue = false
    },
    // 等待动画完全结束后销毁vm
    onClosed: onDestroy,
    onOpened: () => {
      setOverflowHidden()
    }
  },
    {
      title: defaultHeader(),
      default: defaultBody(),
      footer: defaultFooter()
    }
  )

  render(vm, vmMountContainer)


  nextTick(() => {
    const target = dialogContainer.firstElementChild! as HTMLElement
    if (renderTo !== document.body) {
      renderTo.style.position = 'relative'
      target.style.position = 'absolute'
    } else {
      target.style.position = 'fixed'
    }
    renderTo.appendChild(target)
  })

  


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
            okFnArr.forEach(fn => isFunction(fn) && fn())
          },
          onCancel: () => {
            cancelFnArr.forEach(fn => isFunction(fn) && fn())
          }
        })
      },0)
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




export default MessageBox