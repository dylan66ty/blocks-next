import type { Slots } from 'vue'

export type TabsType = 'line' | 'button' | 'button-group'

export interface TabPaneData {
  key: string | number
  title?: string
  disabled?: boolean
  paneSlots?: Slots
}
