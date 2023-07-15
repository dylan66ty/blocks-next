export interface SelectContext {
  props: {
    valueKey?: string
    multiple?: boolean
    modelValue?: string | number | unknown | unknown[]
    popperClass?: string
  }
  optionsArray: []
  optionItemCreate(option: SelectOptionProxy): void
  optionItemDestroy(key: ValueKey, option: SelectOptionProxy): void
  handleOptionSelect(option: SelectOptionProxy, byClick: boolean): void
  optionItemHoverIndexChange(option: SelectOptionProxy): void
}

export type ValueKey = string | number | Record<string, any>

export interface SelectOptionProxy {
  value: ValueKey
  label: string | number
  created: boolean
  disabled: boolean
  currentLabel: string
  currentValue: ValueKey
  itemSelected: boolean
  isDisabled: boolean
  select: SelectContext
  visible: boolean
  isHover: boolean
  hoverItem: () => void
  selectOptionClick: () => void
}
