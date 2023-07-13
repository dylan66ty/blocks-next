import type { VNodeChild } from 'vue'

type Align = 'left' | 'center' | 'right'

export interface DescriptionsData {
  label: string | number
  value: string | number
  span: number
  labelAlign: Align
  align: Align
  renderValue: (data: Record<'value', any>) => VNodeChild
  renderLabel: (data: Record<'label', any>) => VNodeChild
  labelClassName: string
  valueClassName: string
  valueSlotName: string
  labelSlotName: string
}
