import type { VNode  } from 'vue'

export type IMessageType = 'success' | 'warning' | 'danger' | 'strong' | 'info'

export type IMessage = string | number | undefined | VNode

export interface IMessageOptions {
  id?:string,
  message?:IMessage,
  type?: IMessageType,
  duration?: number,
  center?:boolean,
  onClose?: () => void,
  offset?:number,
  renderTo?: string | HTMLElement,
  showClose?:Boolean
}

export type IMessageParams = IMessageOptions | string
