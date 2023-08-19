---
title: Table
lang: zh-CN
---

# 表格 Table
用于数据收集展示、分析整理、操作处理

## 基本使用
表格的基本用法，需要传递 `columns` 和 `data`
::: demo 
table/basic
:::


## 行选择器
通过配置 column 里面 type 为 `checkbox`即可。table上面绑定`v-model:selection`即可实现双向绑定
::: demo 
table/checkbox
:::

## 索引
通过配置 column 里面 type 为 `index`即可
::: demo 
table/index
:::

## 排序
通过配置 column 里面 sortable 为 `true`即可。
::: demo 
table/sortable
:::


## 表格属性
这里罗列了一些表格的属性，你可以方便的打开或关闭一些属性，查看它的效果。
::: demo 
table/props
:::

## 固定表头
设置table `height` 即可
::: demo 
table/fixedHeight
:::

## 流体高度
当数据量动态变化时，可以为 Table 设置一个最大高度。通过设置 `max-height` 属性为 table 指定最大高度。 此时若表格所需的高度大于最大高度，则会显示一个滚动条
::: demo 
table/flowHeight
:::


## 固定列
通过配置 `column` 里面 `fixed` 即可。`fixed` 可选值 left 、right、undefined
::: demo 
table/fixedColumn
:::

## 表格config配置
通过配置 `config` 属性 `{setting: true}` 即可开启对表格 `column` 的操作
::: demo 
table/columnDrag
:::

## 自定义渲染
通过在column里面配置插槽`slotName`渲染数据，配置 `headerSlotName` 渲染表头。你也可以直接 `column` 中配置 renderCell 函数来渲染渲染数据，配置 renderHeader 函数来渲染表头。如果你既用了插槽也用了渲染函数，那么渲染函数的优先级高于插槽。
::: demo
table/customRender
:::

## TableData & TableColumnData
```js

export interface TableData {
  key?: string
  expand?: string | RenderFunction
  children?: TableData[]
  disabled?: boolean
  isLeaf?: boolean
  [name: string]: any
}


export interface TableColumnData {
  type?: TableColumnTypes
  prop?: string
  title?: string
  width?: number
  minWidth?: number
  align?: 'left' | 'center' | 'right'
  fixed?: 'left' | 'right'
  ellipsis?: boolean
  tooltip?: boolean | Record<string, any>
  sortable?: boolean
  filterable?: TableFilterable
  children?: TableColumnData[]
  renderCell?: (data: {
    row: TableData
    column: TableColumnData
    rowIndex: number
  }) => VNode | string | number
  renderHeader?: (data: { column: TableColumnData }) => VNode | string | number
  renderIndex?: (data: { column: TableColumnData; index: number }) => number
  slotName?: string
  headerSlotName?: string
  hiddenCheckboxAll?: boolean

  hidden?: boolean
  disabled?: boolean
  checked?: boolean

  // private
  isLastLeftFixed?: boolean
  isFirstRightFixed?: boolean
  colSpan?: number
  rowSpan?: number
  index?: number
  parent?: TableColumnData
}
```

## API
## Table Attributes
|属性名|描述|类型|默认值|
|---|---|---|:---:|
|data|表格数据|`TableData[]`|-|
|columns|表格列配置|`TableColumnData[]`|-|
|height|设置height属性可以固定表头|`string \| number`|-|
|maxHeight|设置maxHeight可以实现流式高度|`string \| number`|-|
|hover|鼠标移入row样式|`boolean`|-|
|v-model:selection|多选|`array`|-|
|loading|Loading,加载数据时候用|`boolean`|false|
|default-sort|默认sort升序降序，column的prop，是否需要弹出层popup|`{sort: 'ascend' \| 'descend', prop: string, popup:boolean}`|-|
|rowHeight|设置rowHeight可以改变row高度|`string \| number`|68|
|stripe|斑纹样式|`boolean`|-|
|border|表格边框|`boolean` |false|
|hover|表格列hover|`boolean`|false|
|columnResizable|是否可以拖拽改变column的宽度,相关联border属性必须为true|`boolean`|false|
|config|表格配置项|`{setting:boolean}`|-|



## Table Column Option
|属性|描述|类型|默认值|
|---|---|---|:---:|
|type|表格操作类型|`checkbox \| index`|-|
|prop|列信息的标识，对应TableData中的数据，可支持链式。如`a.b.c`|`string`|-|
|title|列标题|`string \| number`|-|
|width|列宽度|`string \| number`|-|
|sortable|列是否可排序|`boolean`|false|
|align|文本对齐方向|`left \| center \| right`|left|
|fixed|固定位置，必须设置宽度width|`left \| right`|-|
|slotName|列数据插槽|`string`|-|
|headerSlotName|列标题插槽|`string`|-|
|hidden|列是否隐藏|`boolean`|false|
|disabled|列是否禁用|`boolean`|false|
|hiddenCheckboxAll|只有type是checkbox时会生效，默认表头显示全选，设为true后表头不显示全选|`boolean`|false|

## Table Events
|事件名|描述|函数类型|
|---|---|---|
|selection-change|当绑定selection变化时触发的事件|`(selection: TableData[]) => void`|


## Table Slots
|name|描述|scoped|
|---|---|---|
|header|头部插槽|-|
|footer|尾部插槽|-|


