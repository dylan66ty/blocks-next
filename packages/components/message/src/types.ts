import type { VNode  } from 'vue'


export const messageTypes = ['success' ,'warning' ,'error' , 'strong' ,'info'] as const

export type IMessageType = (typeof messageTypes)[number]



export type IMessage = string | number | undefined | VNode

export interface IMessageOptions {
  id?:string;
  message?:IMessage;
  type?: IMessageType;
  duration?: number;
  center?:boolean;
  onClose?: () => void;
  offset?:number;
  renderTo?: string | HTMLElement;
  showClose?:Boolean;
}

export interface IMessageHandler {
  close: () => void
}

export interface IMessageCaller {
  (options:IMessageParams): IMessageHandler
}

export interface IMessageMethods extends IMessageCaller {
  success(message:IMessage | IMessageOptions):IMessageHandler;
  error(message:IMessage | IMessageOptions):IMessageHandler;
  warning(message:IMessage | IMessageOptions):IMessageHandler;
  strong(message:IMessage | IMessageOptions):IMessageHandler;
  info(message:IMessage | IMessageOptions):IMessageHandler;
}


export type IMessageParams = IMessageOptions | string
