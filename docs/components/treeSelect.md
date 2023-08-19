---
title: TreeSelect
lang: zh-CN
---

# 树选择 TreeSelect
可以对树形结构数据进行选择

## 基本使用
最简单的用法。单选
:::tip
v-model绑定的数据必须为 **数组** 格式
:::
::: demo 
treeSelect/basic
:::


## 可清空
设置属性 `clearable` 即可
::: demo 
treeSelect/clearable
:::

## 多选
设置属性 `multiple` 即可开启多选
::: demo 
treeSelect/multiple
:::

## 模糊搜索
设置属性 `filterable`即可开启模糊搜索模式
::: demo 
treeSelect/filterable
:::

## API
## Attributes
|属性名|描述|类型|默认值|
|-------|-------|---|:---:|
|data|传入data,生成对应的树结构|`TreeData[]`|-|
|v-model|绑定值|`(string \| number)[]`|-|
|multiple|是否支持多选|`boolean`|false|
|disabled|是否禁用|`false`|-|
|placeholder|是否禁用|`false`|-|
|size|尺寸大小|`small \| default \| large`|default|
|filterable|是否开启模糊搜索|`false`|-|
|filter-method|自定义筛选方法，返回的布尔值表示是否保留该选项|`(node:TreeNode,query:string) => boolean`|-|
|show-line|提示文案|`string`|-|
|check-strictly|父子不互相关联,父级状态不会影响子级状态|`boolean`|false|
|default-unfold-all|是否默认展开全部的节点|`boolean`|false|
|default-unfold-values|默认展开节点的value集合|`array`|-|
|accordion|是否每次只打开一个同级树节点展开|`boolean`|false|
|unfold-on-click-node|点击节点的时候触发展开或折叠|`boolean`|false|
|checked-on-click-node|点击节点的时候改变复选框的状态|`boolean`|false|
|no-data-text|选项为空时显示的文字|`string`|暂无数据|
|popup-class|自定义弹出层类名|`string`|-|
|card|输入框卡片模式 [详情](/components/input.html#卡片输入框)|`boolean`|-|

## Events
|name|描述|函数类型|
|---|---|---|
|clear|点击清除时触发|`-`|
|change|值改变时触发|`(values: (string \| number)[])`|
|show|当下拉列表显示时触发|`-`|
|hide|当下拉列表隐藏时触发|`-`|

## Slots
|name|描述|scoped|
|---|---|---|
|node-icon|节点左侧图标|`{node:TreeNode}`|
|node-label|节点展示的内容|`{node:TreeNode}`|
|node-extra|节点右侧渲染内容|`{node:TreeNode}`|
|empty|空状态|`-`|
