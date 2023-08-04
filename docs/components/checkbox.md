---
title: Checkbox
lang: zh-CN
---

# 多选框 Checkbox
在一组数据中，用户可通过复选框选择一个或多个数据。

## 基本使用
可以表示两种状态之间的切换
::: demo 
checkbox/basic
:::

## 禁用
设置属性 `disabled` 为 `true` 即可。
::: demo 
checkbox/disabled
:::

## 多选框组
适用于多个勾选框绑定到同一个数组的情景，通过是否勾选来表示这一组选项中选中的项。
::: demo 
checkbox/group
:::

## 半选状态
`indeterminate` 属性用以表示 checkbox 的不确定状态，一般用于实现全选的效果
::: demo 
checkbox/indeterminate
:::


## Checkbox Attributes
|参数名|描述|可选值|默认值|
|---|---|---|:---:|
|v-model|绑定值|`boolean`|`false`|
|label|选中状态的值|`string`/ `number` / `boolean` |`-`|
|disabled|是否禁用|`boolean`|`false`|
|name|原生 name 属性|`string`|`-`|
|checked|当前是否勾选|`boolean`|`false`|
|indeterminate|半选状态|`boolean`|`false`|

## Checkbox Events
|事件名|描述|回调|
|---|---|---|
|change|当绑定值变化时触发的事件|`(val:boolean)`|


## CheckboxGroup Attributes
|参数名|描述|可选值|默认值|
|---|---|---|:---:|
|value / v-model|绑定值|`array`|`-`|

## CheckboxGroup Events
|事件名|描述|回调|
|---|---|---|
|change|当绑定值变化时触发的事件|`(val:array)`|




