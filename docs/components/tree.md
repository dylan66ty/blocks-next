---
title: Tree
lang: zh-CN
---

# 树 Tree
树状结构能清晰展示文件夹、分类目录、组织架构等多层级内容的关系，同时支持展开、收起和选择等交互功能

## 基本使用
为每个节点赋予`value`(全局唯一的)，`label` 为该节点显示的内容
::: demo 
tree/basic
:::


## 节点选择
绑定 `v-model:select` 即可选中节点。设置 `multiple` 属性为 `true`，可以启用多选
::: demo 
tree/select
:::

## 带复选框
设置 `show-checkbox` 属性为 `true`，可以启用复选框
::: demo 
tree/checkbox
:::

## 默认展开全部
设置 `default-unfold-all` 属性为 `true`，可以模式展开全部节点
::: demo 
tree/unfold-all
:::


## 默认展开
通过 `default-unfold-values` 来设置默认需要展开哪些节点
::: demo 
tree/unfold-values
:::


## 自定义节点内容
你可以设置插槽来自定义展示节点内容。具体示例看下面的例子
::: demo 
tree/custom-node
:::


## 显示连接线
添加 `show-line` 属性即可使树具有连接线
::: demo 
tree/show-line
:::

## 手风琴模式
对于同一级的节点，每次只能展开一个。设置属性 `accordion` 为 `true` 即可开启手风琴模式
::: demo 
tree/accordion
:::

## 树节点过滤 ^(alpha.41)
调用 `Tree` 实例对象的 `filter` 方法来过滤树节点。 当然你也可以设置 `filter-node-method` 属性来自定义过滤器。

::: demo 
tree/filter
:::


## TreeData & TreeNode

```js
export interface TreeData {
  label: string | number
  value: string | number
  isLeaf?: boolean
  disabled?: boolean
  children?: TreeData[]
}

export interface TreeNode extends Omit<TreeData, 'children'> {
  key: string
  indents: number[]
  deep: number
  pathValue: (string | number | undefined)[]
  pathNode: TreeNode[]
  pathLabel: (string | number | undefined)[]
  data: TreeData
  unfold: boolean
  lasted: boolean
  hasChildren: boolean
  totalLeafNumber?: number
  parent?: TreeNode | null
  children?: TreeNode[]
}
```

## API
## Attributes
|属性名|描述|类型|默认值|
|-------|-------|---|:---:|
|data|传入data,生成对应的树结构|`TreeData[]`|-|
|v-model:selected|双向绑定节点selected|`(string \| number)[]`|-|
|v-model:checked|双向绑定节点checked|`(string \| number)[]`|-|
|multiple|是否支持多选|`boolean`|false|
|show-line|是否展示连接线|`boolean`|false|
|show-checkbox|节点否显示checkbox|`boolean`|false|
|check-strictly|父子不互相关联,父级状态不会影响子级状态|`boolean`|false|
|default-unfold-all|是否默认展开全部的节点|`boolean`|false|
|default-unfold-values|默认展开节点的value集合|`array`|-|
|accordion|是否每次只打开一个同级树节点展开|`boolean`|false|
|unfold-on-click-node|点击节点的时候触发展开或折叠|`boolean`|false|
|checked-on-click-node|点击节点的时候改变复选框的状态|`boolean`|false|
|filter-node-method ^(alpha.41)|自定义node过滤器，只有当调用实例方法`filter`方法生效|`boolean`|false|



## TreeData
|属性|描述|类型|默认值|
|---|---|---|:---:|
|label|节点展示的文本|`string`|-|
|value|节点选中的值(必须全局唯一)|`string \| number`|-|
|disabled|是否禁用|`boolean`|false|
|children|子节点|`TreeNode[]`|-|
|isLeaf|是否是叶子节点|`boolean`|false|

## Tree Methods
|方法名|说明|函数类型|
|---|---|---|
|unfoldNodes|展开节点。此方法可传入节点的value（数组形式），来展开相对应的节点。注意不传参数的时候，展开所有节点。|`(values?:string[]) => void`|
|foldNodes|折叠节点。此方法可传入节点的value（数组形式），来折叠相对应的节点。注意不传参数的时候，折叠所有节点。|`(values?:string[]) => void`|
|insertNodes|新增节点。第一个参数为parent value，第二个参数为tree data|`(parentValue:number \| string, data: TreeData[]) => void`|
|removeNodes|移除节点。参数为节点的value（数组形式）|`(values: (number \| string)[]) => void`|
|getNodesByValues|通过value来获取节点|`(values: (number \| string)[]) => TreeNode[]`|
|getSelectedNodes|获取当前树所有选中(selected)的节点|`() => TreeNode[]`|
|filter ^(alpha.41)|树节点过滤|`(query:string) => void`|



## Events
|name|描述|函数类型|
|---|---|---|
|unfold-node|展开节点时触发|`(node: TreeNode) => void`|
|fold-node|折叠节点时触发|`(node: TreeNode) => void`|
|click-node|点击节点时触发|`(node: TreeNode) => void`|
|change-selected|选中节点时触发|`(values: (string \| number)[]) => void`|
|change-checked|点击节点复选框时触发|`(values: (string \| number)[]) => void`|


## Slots
|name|描述|scoped|
|---|---|---|
|node-icon|节点左侧图标|`{node:TreeNode}`|
|node-label|节点展示的内容|`{node:TreeNode}`|
|node-extra|节点右侧渲染内容|`{node:TreeNode}`|



