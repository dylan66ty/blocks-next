// GlobalComponents for Volar
declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    BnButton: typeof import('blocks-next')['Button']
    BnButtonGroup: typeof import('blocks-next')['ButtonGroup']
    BnCheckbox: typeof import('blocks-next')['Checkbox']
    BnCheckboxGroup: typeof import('blocks-next')['CheckboxGroup']
    BnDialog: typeof import('blocks-next')['Dialog']
    BnDrawer: typeof import('blocks-next')['Drawer']
    BnForm: typeof import('blocks-next')['Form']
    BnFormItem: typeof import('blocks-next')['FormItem']
    BnInput: typeof import('blocks-next')['Input']
    BnPagination: typeof import('blocks-next')['Pagination']
    BnRadio: typeof import('blocks-next')['Radio']
    BnRadioGroup: typeof import('blocks-next')['RadioGroup']
    BnSelect: typeof import('blocks-next')['Select']
    BnOption: typeof import('blocks-next')['Option']
    BnSpace: typeof import('blocks-next')['Space']
    BnSwitch: typeof import('blocks-next')['Switch']
    BnTooltip: typeof import('blocks-next')['Tooltip']
    BnScrollbar: typeof import('blocks-next')['Scrollbar']
    BnTable: typeof import('blocks-next')['Table']
    BnTabs: typeof import('blocks-next')['Tabs']
    BnTabPane: typeof import('blocks-next')['TabPane']
    BnEmpty: typeof import('blocks-next')['Empty']
    BnPopconfirm: typeof import('blocks-next')['Popconfirm']
    BnProgress: typeof import('blocks-next')['Progress']
    BnTag: typeof import('blocks-next')['Tag']
    BnBadge: typeof import('blocks-next')['Badge']
    BnCascader: typeof import('blocks-next')['Cascader']
    BnDescriptions: typeof import('blocks-next')['Descriptions']
    BnDescriptionsItem: typeof import('blocks-next')['DescriptionsItem']
    BnPopup: typeof import('blocks-next')['Popup']

  }

  interface ComponentCustomProperties {
    $message: typeof import('blocks-next')['Message']
    $messageBox: typeof import('blocks-next')['MessageBox']
    $notification: typeof import('blocks-next')['Notification']
  }
}

export {}
