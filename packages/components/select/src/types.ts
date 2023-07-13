export interface SelectContext {
  props: {
    valueKey?: string
    multiple?: boolean
    modelValue?: string | number | unknown | unknown[]
    popperClass?: string
  }
  optionsArray: []
  optionItemCreate(vm: SelectOptionProxy): void
  optionItemDestroy(key: ValueKey, vm: SelectOptionProxy): void
  handleOptionSelect(vm: SelectOptionProxy, byClick: boolean): void
  optionsItemHoverIndexChange(vm: SelectOptionProxy): void
}

export type ValueKey = string | number | Record<string, string>

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
