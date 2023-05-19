import type  { RenderFunction } from 'vue'


export const  messageBoxStaticMethods = ['info', 'success', 'warning', 'strong', 'error'] as const

export type MessageBoxStaticMethod = (typeof messageBoxStaticMethods)[number]


export type MessageBoxBeforeAction = () => boolean | Promise<boolean> 

export type MessageBoxContent = string | RenderFunction


export interface MessageBoxOptions {
  title?: string | RenderFunction;
  type?: MessageBoxStaticMethod;
  content:MessageBoxContent;
  footer?: boolean | RenderFunction;
  okText?: string;
  cancelText?: string;
  mask?: boolean;
  maskToClose?: boolean;
  onOk?: (e: Event) => void;
  beforeOnOk?:MessageBoxBeforeAction;
  onCancel?: (e: Event) => void;
  beforeOnCancel?:MessageBoxBeforeAction
  width?: number | string;
  height?:number |string;
  top?: number | string;
  center?: boolean;
}

export type MessageBoxFooterAction = 'cancel' | 'ok'

export type MessageBoxFooterScoped = {
  cancel():void;
  ok():void;
} 


export interface MessageBoxCaller {
  (options:MessageBoxOptions):void
}

export type MessageBoxChainArgs = [() => boolean | Promise<boolean> , () => void] | [() => void]

export type MessageBoxMethodReturn = {
  ok(...args:MessageBoxChainArgs):any;
  cancel(...args:MessageBoxChainArgs):any
} 

export interface MessageBoxMethods extends MessageBoxCaller {
  info(options:MessageBoxContent):MessageBoxMethodReturn;
  success(options:MessageBoxContent):MessageBoxMethodReturn;
  warning(options:MessageBoxContent):MessageBoxMethodReturn;
  strong(options:MessageBoxContent):MessageBoxMethodReturn;
  error(options:MessageBoxContent):MessageBoxMethodReturn;
}

export type MessageBoxMethodOption = string | MessageBoxOptions