import type { RenderFunction, VNode } from 'vue'

export const messageBoxStaticMethods = ['info', 'success', 'warning', 'strong', 'error'] as const

export type MessageBoxStaticMethod = (typeof messageBoxStaticMethods)[number]

export type MessageBoxBeforeAction = () => boolean | Promise<boolean>

export type MessageBoxContent = string | number | VNode | RenderFunction

export interface MessageBoxOptions {
  title?: MessageBoxContent
  type?: MessageBoxStaticMethod
  content?: MessageBoxContent
  footer?: boolean | ((scoped: MessageBoxFooterScoped) => VNode)
  okText?: string
  cancelText?: string
  mask?: boolean
  maskToClose?: boolean
  onOk?: (e: Event) => void
  beforeOnOk?: MessageBoxBeforeAction
  onCancel?: (e: Event) => void
  beforeOnCancel?: MessageBoxBeforeAction
  width?: number | string
  height?: number | string
  top?: number | string
  center?: boolean
  renderTo?: string | HTMLElement
  hideCancel?: boolean
  hideOk?: boolean
  popupClass?: string
}

export type MessageBoxFooterAction = 'cancel' | 'ok'

export interface MessageBoxFooterScoped {
  cancel(): void
  ok(): void
  loadingObj?: { ok: boolean; cancel: boolean }
}

export interface MessageBoxCaller {
  (options: MessageBoxOptions): void
}

export type MessageBoxChainArgs = [() => boolean | Promise<boolean>, () => void] | [() => void]

export interface MessageBoxMethodReturn {
  ok(...args: MessageBoxChainArgs): any
  cancel(...args: MessageBoxChainArgs): any
}

export interface MessageBoxMethods extends MessageBoxCaller {
  info(title: MessageBoxContent, content?: MessageBoxContent): MessageBoxMethodReturn
  success(title: MessageBoxContent, content?: MessageBoxContent): MessageBoxMethodReturn
  warning(title: MessageBoxContent, content?: MessageBoxContent): MessageBoxMethodReturn
  strong(title: MessageBoxContent, content?: MessageBoxContent): MessageBoxMethodReturn
  error(title: MessageBoxContent, content?: MessageBoxContent): MessageBoxMethodReturn
}

export type MessageBoxMethodOption = string | MessageBoxOptions
