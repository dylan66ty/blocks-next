---
title: Cascader
lang: zh-CN
---

# 级联选择 Cascader
指在选择器选项数量较多时，采用多级分类的方式将选项进行分隔

## 基本使用
级联选择器的基本用法。
:::tip 
级联选择器，支持 `v-model` 双向绑定，必须传入一个 **数组** 。多选模式下必须传入 **二维数组**
:::
::: demo 
cascader/basic
:::

## 可清空
设置 `clearable` 属性即可
::: demo 
cascader/clearable
:::


## 仅显示最后一级
设置 `show-all-levels` 属性为 `false` 即可。可以仅在输入框中显示选中项最后一级的标签，而不是选中项所在的完整路径
::: demo 
cascader/no-show-all-levels
:::

## 多选
设置 `multiple` 属性即可
::: demo 
cascader/multiple
:::

## 选择任意一级选项 ^(alpha.36.2)
在单选模式下，你只能选择叶子节点；而在多选模式下，勾选父节点真正选中的都是叶子节点。 启用该功能后，可让父子节点取消关联，选择任意一级选项。

可通过设置 `check-strictly` 属性来设置父子节点取消选中关联，从而达到选择任意一级选项的目的。
::: demo 
cascader/check-strictly
:::


## 自定义输入框内容
设置 `input-label-format` 函数对显示的内容进行格式化处理
::: demo 
cascader/inputLabelFormat
:::


## 禁用选项
指定 option 的 `disabled` 为 true，可以禁用该选项
::: demo 
cascader/option-disabled
:::

## 开启Footer
设置 `showFooter` 属性即可。
::: warning
该属性只在多选模式中生效
:::
::: demo
cascader/footer
:::

## 模糊搜索
可以利用模糊搜索功能快速查找选项。通过添加 `filterable` 来启用过滤。`filter-method` 自定义搜索方法，该方法必须是个函数，第一个参数是 node，第二个参数是搜索关键词query，通过返回布尔值表示是否命中
::: demo 
cascader/filterable
:::

## 自定义节点内容 
你可以通过 scoped slot 自定义节点的内容。 你可以访问 `scoped` 中的 `node` 和 `data` 属性，分别表示当前节点的 `Node` 对象和当前节点的数据
::: demo 
cascader/custom-node-value
:::

## 展开子菜单
通过设置 `expand-child` 可以在选择时展开第一个子菜单
::: demo 
cascader/expand-child
:::

## 自定义触发元素
通过设置 `trigger` 插槽，即可实现自定义触发器
::: demo 
cascader/custom-trigger
:::

## CascaderNode & CascaderData

```js
export interface CascaderData {
  value?: string | number
  label?: string
  render?: RenderFunction
  disabled?: boolean
  children?: CascaderData[]
  isLeaf?: boolean
}

export interface CascaderNode {
  key: string
  parent?: CascaderNode | null
  raw: CascaderData

  label?: string
  value?: string | number
  render?: RenderFunction
  isLeaf?: boolean
  disabled?: boolean
  level: number
  index: number
  pathNodes: CascaderNode[]
  pathValue?: any[]
  pathLabel?: string[]

  children?: CascaderNode[]
  hasChildren?: boolean
  selectionDisabled?: boolean

  totalLeafNumber?: number
}
```

## API
## Attributes
|属性名|描述|类型|默认值|
|-------|-------|---|:---:|
|v-model|双向绑定的值|`array`|-|
|data|级联选择器的选项数据|`array`|-|
|disabled|是否禁用|`boolean`|false|
|placeholder|提示文案|`string`|请选择|
|size|尺寸大小|`small \| default \| large`|default|
|multiple|是否为多选状态|`boolean`|false|
|check-strictly ^(alpha.36.2)|父子不互相关联,父级状态不会影响子级状态|`boolean`|false|
|clearable|是否可清空|`boolean`|-|
|show-all-levels ^(alpha.32)|是否显示选中值的完整路径|`boolean`|true|
|expand-child|是否展开子菜单|`boolean`|false|
|input-label-format|格式化展示内容|`(labels:string[]) => string`|-|
|separator|用于分隔选项的字符|`string`|/|
|filterable ^(alpha.32)|是否开启模糊搜索|`boolean`|false|
|filter-method ^(alpha.32)|自定义筛选方法，返回的布尔值表示是否保留该选项|`(node:CascaderNode,query:string) => boolean`|-|
|show-footer|是否展示底部区域，只在开启多选时生效|`boolean`|false|
|popup-class|自定义弹出层类名|`string`|-|
|card|输入框卡片模式 [详情](/components/input.html#卡片输入框)|`boolean`|-|


## Option
|属性|描述|类型|默认值|
|---|---|---|:---:|
|label|选项文本|`string`|-|
|value|选项值|`string`|-|
|disabled|是否禁用|`boolean`|false|
|children|下一级选项|`array`|-|
|isLeaf|是否是叶子节点|`boolean`|false|
|render|自定义渲染|`RenderFunction`|-|


## Events
|name|描述|函数类型|
|---|---|---|
|change|选中值改变时触发|`(value: []string) => void`|
|clear|点击清除时触发|`-`|



## Slots
|name|描述|scoped|
|---|---|---|
|default|自定义备选项的节点内容，分别为当前节点的 Node 对象和数据|`{ node: CascaderNode, data: CascaderData }`|
|footer|底部区域自定义|`{ok:() => void , cancel: () => void}`|
|trigger|自定义触发器|`{show:boolean}`|


