export type ValueData = string | number

export type ValueKey = string | number

export interface OptVmProxy {
  value: ValueKey
  label: string | number
  disabled: boolean
  currentLabel: string
  currentValue: ValueKey
  isSelected: boolean
  visible: boolean
  isHover: boolean
  hoverItem: () => void
  selectOptionClick: () => void
}
