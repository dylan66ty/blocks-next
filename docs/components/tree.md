---
title: Tree
lang: zh-CN
---

# 树 Tree
树状结构能清晰展示文件夹、分类目录、组织架构等多层级内容的关系，同时支持展开、收起和选择等交互功能。

## 基本使用
为每个节点赋予全局唯一的 value，label 为该节点显示的内容。
::: demo 
tree/basic
:::


## 节点选择
绑定 `v-model:select` 即可选中节点。设置 `multiple` 属性为 `true`，可以启用多选。
::: demo 
tree/select
:::

## 带复选框
设置 `show-checkbox` 属性为 `true`，可以启用复选框。
::: demo 
tree/checkbox
:::

## 默认展开全部
设置 `default-unfold-all` 属性为 `true`，可以展开全部。
::: demo 
tree/unfold-all
:::


## 默认展开
通过 `default-unfold-values` 设置默认展开的节点
::: demo 
tree/unfold-values
:::


## 自定义节点内容
::: demo 
tree/custom-node
:::


## 显示连接线
为 Tree 添加 showLine 属性即可使树具有连接线
::: demo 
tree/show-line
:::

## 手风琴模式
对于同一级的节点，每次只能展开一个。设置属性 `accordion` 为 `true` 即可开启手风琴模式。
::: demo 
tree/accordion
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



## Attributes
|参数名|描述|可选值|默认值|
|-------|-------|---|:---:|
|data|传入data,生成对应的树结构|`TreeData[]`|`-`|
|v-model:selected|点击选中节点value|`boolean`|`false`|
|v-model:checked|checkbox模式下，双向绑定的|`boolean`|`false`|
|multiple|是否支持多选|`boolean`|`false`|
|show-line|是否展示连接线|`boolean`|`false`|
|show-checkbox|节点左侧否显示checkbox|`boolean`|`false`|
|check-strictly|在显示checkbox的情况下，父子不互相关联|`boolean`|`false`|
|default-unfold-all|是否默认展开全部的节点|`boolean`|`false`|
|default-unfold-values|默认展开节点的value集合|`array`|`-`|
|accordion|是否每次只打开一个同级树节点展开|`boolean`|`false`|
|unfold-on-click-node|是否在点击节点的时候展开或者折叠节点|`boolean`|`false`|

## TreeData
|属性|描述|可选值|默认值|
|---|---|---|:---:|
|label|节点展示的文本|`string`|`-`|
|value|节点选中的值(必须全局唯一)|`string` / `number`|`-`|
|disabled|是否禁用|`boolean`|`false`|
|children|子节点|`TreeNode[]`|`-`|
|isLeaf|是否是叶子节点|`boolean`|`false`|

## Tree Methods
|方法名|说明|回调参数|
|---|---|---|
|unfoldNodes|展开节点。此方法可传入节点的value（数组形式），来展开相对应的节点。注意不传参数的时候，展开所有节点。|`(values?:string[]) => void`|
|foldNodes|折叠节点。此方法可传入节点的value（数组形式），来折叠相对应的节点。注意不传参数的时候，折叠所有节点。|`(values?:string[]) => void`|
|insertNodes|新增节点。第一个参数为parent value，第二个参数为tree data|`(parentValue:number \| string, data: TreeData[]) => void`|
|removeNodes|移除节点。参数为节点的value（数组形式）|`(values: (number \| string)[]) => void`|


## Tree Events
|name|描述|回调参数|
|---|---|---|
|unfold-node|展开节点时触发|`(node: TreeNode)`|
|fold-node|折叠节点时触发|`(node: TreeNode)`|
|click-node|点击节点时触发|`(node: TreeNode)`|

## Tree Slots
|name|描述|scoped|
|---|---|---|
|node-icon|节点左侧图标|`{node}: {node:TreeNode}`|
|node-label|节点label|`{node}: {node:TreeNode}`|
|node-extra|节点右侧渲染内容|`{node}: {node:TreeNode}`|






