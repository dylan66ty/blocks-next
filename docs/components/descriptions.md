---
title: Descriptions
lang: zh-CN
---

# 描述列表 Descriptions
列表形式展示多个字段

:::tip 
Descriptions组件你可以传递一个`data`来展示数据，你也可以写DescriptionsItem来展示数据。如果两种方式都存在，传递`data`数据的这种方式优先级最高。
如果你需要展示一些自定义的数据，参考下方的自定义渲染。如果自定义渲染`没效果`，注意传递数据方式，以及组件插槽的书写格式
:::

## 基本使用
通过配置即可快速生成信息展示。具体配置看demo代码
::: demo 
descriptions/basic
:::


## 不同尺寸
配置`size`属性即可改变尺寸
:::warning 
如果设置了cellHeight属性，size属性就会失效
:::
::: demo 
descriptions/size
:::

## 边框样式
配置`border`属性即可设置边框
::: demo 
descriptions/border
:::

## 标签文本对齐
配置 `align` 、`label-align`属性即可分别可设置value、label的对齐方式
::: demo 
descriptions/align
:::

## 自定义渲染
配置插槽即可实现
::: demo 
descriptions/custom-render
:::


## 布局模式
水平排列和垂直排列的布局模式
::: demo 
descriptions/direction
:::

### DescriptionsData 

```js
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


```

## API
## Descriptions Attributes
|属性名|描述|类型|默认值|
|-------|-------|---|:---:|
|data| Descriptions 数据| `DescriptionsData[]` |-|
|column|一行 Descriptions Item 的数量| `string` |2|
|border|是否带有边框| `boolean` |false|
|direction|排列的方向|`vertical \| horizontal` |vertical|
|size| Descriptions 的大小| `large \| default \| small` |default|
|cell-height|每个 Descriptions Item 的高度，border为true时生效| `string \| number` |-|

## Data Option
|属性|描述|类型|默认值|
|---|---|---|:---:|
|span|列的数量| `number` |1|
|label|标签文本| `string \| number` |-|
|value|标签内容| `string \| number` |-|
|align|value对齐方式| `left \| center \| right`|left|
|labelAlign|label对齐方式|`left \| center \| right` |left|
|valueClassName|value的自定义类名| `string` |-|
|labelClassName|label的自定义类名| `string` |-|
|renderValue|自定义渲染value| `(scoped) => VNode` |-|
|renderLabel|自定义渲染label| `(scoped) => VNode` |-|
|valueSlotName|自定义渲染value插槽名| `string` |-|
|labelSlotName|自定义渲染label插槽名| `string` |-|



## Descriptions Item Attributes
|属性名|描述|类型|默认值|
|-------|-------|---|:---:|
|span|列的数量| `number` |1|
|label|标签文本| `string \| number` |-|
|value|标签内容| `string \| number` |-|
|align|value对齐方式| `left \| center \| right`|left|
|label-align|label对齐方式|`left \| center \| right` |left|
|value-class-name|value的自定义类名| `string` |-|
|label-class-name|label的自定义类名| `string` |-|
|render-value|自定义渲染value| `(scoped) => VNode` |-|
|render-label|自定义渲染label| `(scoped) => VNode` |-|


## Descriptions Item Slots
|name|描述|scoped|
|---|---|---|
|default|value插槽|`{value:any}`|
|label|label插槽|`{label:any}`|









