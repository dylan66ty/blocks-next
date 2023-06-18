export type LoadingOptions = Partial<{
  background: string
  text: string
  color: string
  customClass: string
  renderTo: HTMLElement | string
  iconSize: number
  fullScreen: boolean
}>

export interface LoadingInstance {
  cancelLoading: () => void
  appendLoading: () => void
  updateText?: (text: string) => void
}

export interface LoadingOpen {
  close: () => void
  updateText: (text: string) => void
}
