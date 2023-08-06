---
title: Cascader
lang: zh-CN
---

# 级联选择 Cascader
指在选择器选项数量较多时，采用多级分类的方式将选项进行分隔。

## 基本使用
级联选择器的基本用法。
:::warning 
级联选择器，支持 `v-model` 双向绑定，必须传入一个 **数组** 。多选模式下必须传入 **二维数组**。
:::
::: demo 
cascader/basic
:::

## 允许清除
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


## 自定义输入框的展示值
利用 `inputLabelFormat` 函数对显示的内容进行自定义处理
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
注意：该属性只在多选模式中生效。
:::
::: demo
cascader/footer
:::

## 模糊搜索 ^(beta)
可以利用模糊搜索功能快速查找选项。通过添加 `filterable` 来启用过滤。`filter-method` 自定义搜索方法，该方法必须是个函数，第一个参数是node，第二个参数是搜索关键词query，通过返回布尔值表示是否命中
::: demo 
cascader/filterable
:::

## 自定义节点内容 
你可以通过 scoped slot 自定义节点的内容。 你可以访问 scoped 中的 node 和 data 属性，分别表示当前节点的 Node 对象和当前节点的数据
::: demo 
cascader/custom-node-value
:::

## 展开子菜单
通过设置 `expand-child` 可以在选择时展开第一个子菜单
::: demo 
cascader/expand-child
:::

## 自定义触发器^(beta)
通过设置 `trigger`插槽，即可实现自定义触发器
::: demo 
cascader/custom-trigger
:::


## Attributes
|参数名|描述|可选值|默认值|
|-------|-------|---|:---:|
|v-model|双向绑定的值|`array`|`-`|
|data|级联选择器的选项数据|`array`|`-`|
|disabled|是否禁用|`boolean`|`false`|
|placeholder|占位符|`string`|`请选择`|
|multiple|是否为多选状态|`boolean`|`false`|
|clearable|是否可清空|`boolean`|`-`|
|show-all-levels ^(alpha.32)|是否显示选中值的完整路径|`boolean`|`true`|
|expand-child|是否展开子菜单|`boolean`|
|input-label-format|格式化展示内容|`(labels:string[]) => string`|`-`|
|separator|用于分隔选项的字符|`string`|`/`|
|filterable ^(alpha.32)|是否开启模糊搜索|`boolean`|`false`|
|filter-method ^(alpha.32)|自定义筛选方法，返回的布尔值表示是否保留该选项|`() => boolean`|`-`|
|show-footer|是否展示底部区域，只在开启多选时生效|`boolean`|`false`|
|popup-class|自定义弹出层类名|`string`|`-`|


## Option
|属性|描述|可选值|默认值|
|---|---|---|:---:|
|label|选项文本|`string`|`-`|
|value|选项值|`string`|`-`|
|disabled|是否禁用|`boolean`|`false`|
|children|下一级选项|`array`|`-`|
|isLeaf|是否是叶子节点|`boolean`|`false`|
|render|自定义渲染|`RenderFunction`|`-`|




## Events
|name|描述|回调参数|
|---|---|---|
|change|选中值改变时触发|`(value: []string)`|


## Slots
|name|描述|scoped|
|---|---|---|
|default|自定义备选项的节点内容，分别为当前节点的 Node 对象和数据|`{ node: any, data: any }`|
|footer|底部区域自定义|`{ok:() => void , cancel: () => void}`|
|trigger|自定义触发器|`{show:boolean}`|


