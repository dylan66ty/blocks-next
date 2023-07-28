---
title: Table
lang: zh-CN
---

# 表格 Table
用于数据收集展示、分析整理、操作处理。

## 基本使用
::: demo 表格的基本用法，需要传递 `columns` 和 `data`。
table/basic
:::


## 行选择器
::: demo 通过配置 column 里面 type 为 `checkbox`即可。table上面绑定`v-model:selection`即可实现双向绑定
table/checkbox
:::

## 索引
::: demo 通过配置 column 里面 type 为 `index`即可
table/index
:::

## 排序
::: demo 通过配置 column 里面 sortable 为 `true`即可。
table/sortable
:::


## 表格属性
::: demo 这里罗列了一些表格的属性，你可以方便的打开或关闭一些属性，查看它的效果。
table/props
:::

## 固定表头
::: demo 设置table `height` 即可
table/fixedHeight
:::

## 流体高度
::: demo 当数据量动态变化时，可以为 Table 设置一个最大高度。通过设置 max-height 属性为 table 指定最大高度。 此时若表格所需的高度大于最大高度，则会显示一个滚动条。
table/flowHeight
:::


## 固定列
::: demo 通过配置 column 里面 fixed 为 `left/right`即可。
table/fixedColumn
:::

## 表格config配置
::: demo 通过配置table `config:{setting: true}` 即可。
table/columnDrag
:::

## 自定义渲染
::: demo 通过在column里面配置插槽`slotName`渲染数据，配置`headerSlotName`渲染表头。你也可以直接column中配置renderCell函数来渲染渲染数据，配置renderHeader函数来渲染表头。如果你既用了插槽也用了渲染函数，那么渲染函数的优先级高于插槽。
table/customRender
:::

## Table Attributes
|参数名|描述|可选值|默认值|
|---|---|---|:---:|
|data|表格数据|`array`|`-`|
|columns|表格列配置|`array`|`-`|
|height|设置height属性可以固定表头|`string` / `number`|`-`|
|maxHeight|设置maxHeight可以实现流式高度|`string` / `number`|`-`|
|hover|鼠标移入row样式|`boolean`|`-`|
|v-model:selection|多选|`array`|`-`|
|loading|Loading,加载数据时候用|`boolean`|`false`|
|default-sort|默认sort升序降序，column的prop，是否需要弹出层popup|`{sort: 'ascend'/'descend', prop: '', popup:boolean}`|`-`|
|rowHeight|设置rowHeight可以改变row高度|`string` / `number`|`68`|
|stripe|斑纹样式|`boolean`|`-`|
|border|表格边框|`boolean` |`false`|
|hover|表格列hover|`boolean`|`false`|
|columnResizable|是否可以拖拽改变column的宽度,相关联border属性必须为true|`boolean`|`false`|
|config|表格配置项|`{setting:boolean}`|`{setting:false}`|



## Table Column Option
|属性|描述|可选值|默认值|
|---|---|---|:---:|
|type|表格操作类型|`checkbox`/ `index`|`-`|
|prop|列信息的标识，对应TableData中的数据，可支持链式。如`a.b.c`|`string`|`-`|
|title|列标题|`string`/ `number`|`-`|
|width|列宽度|`string` / `number`|`-`|
|sortable|列是否可排序|`boolean`|`false`|
|align|文本对齐方向|`left` / `center` / `right`|`left`|
|fixed|固定位置，必须设置宽度width|`left` / `right`|`-`|
|slotName|列数据插槽|`string`|`-`|
|headerSlotName|列标题插槽|`string`|`-`|
|hidden|列是否隐藏|`boolean`|`false`|
|disabled|列是否禁用|`boolean`|`false`|
|hiddenCheckboxAll|只有type是checkbox时会生效，默认表头显示全选，设为true后表头不显示全选|`boolean`|`false`|




## Table Events
|事件名|描述|回调|
|---|---|---|
|selection-change|当绑定selection变化时触发的事件|`(selection: TableData[])`|





