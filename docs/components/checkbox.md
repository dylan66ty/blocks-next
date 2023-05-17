---
title: Checkbox
lang: zh-CN
---

# 多选框 Checkbox

## 基本使用

::: demo 
checkbox/basic
:::

## 禁用

::: demo 设置属性 **disabled**为 `true` 即可。
checkbox/disabled
:::

## 多选框组
::: demo 
checkbox/group
:::

## indeterminate 状态
::: demo **indeterminate**属性用以表示 checkbox 的不确定状态，一般用于实现全选的效果
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




