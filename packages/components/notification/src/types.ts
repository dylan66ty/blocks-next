import type { RenderFunction, VNode } from 'vue'

export const types = ['success', 'strong', 'warning', 'error', 'info'] as const

export type NotificationType = (typeof types)[number]

export interface NotificationOptions {
  title?: string
  message: string | RenderFunction
  type?: NotificationType
  duration?: number
  position?: NotificationPosition
  offset?: number
  renderTo?: string | HTMLElement
  showClose?: boolean
  onClose?: (vm?: VNode) => void
}

export type NotificationPosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'
