---
title: Select
lang: zh-CN
---

# 选择器 Select

## 基础用法

::: demo v-model的值为当前被选中的el-option的 value 属性值
select/basic
:::

## 禁用状态
::: demo 选择器不可用状态,设置属性disabled即可
select/disabled
:::

## 有禁用选项
::: demo 在bn-option中，设定disabled值为 true，即可禁用该选项
select/option-disabled
:::

## 自定义模板 
::: demo 在bn-option中，设定默认插槽即可
select/option-default-slots
:::

## 异步加载数据 
::: demo 设置loading属性
select/loading
:::

## Select Attributes
|参数名|描述|可选值|默认值|
|---|---|---|:---:|
|v-model|绑定值|`boolean` / `number` / `string`|`-`|
|disabled|是否禁用|`boolean` |`false`|
|size|select大小|`small` / `normal` / `large`|`normal`|
|placeholder|占位符|`string`|`请选择`|
|loading|是否正在从接口获取数据|`boolean`|`false`|
|loading-text|正在加载文字|`string`|`-`|
|no-data-text|选项为空时显示的文字|`string`|`暂无数据`|


## Select Events
|事件名|描述|回调|
|---|---|---|
|change|当绑定值变化时触发的事件|`(val:boolean | string | number)`|


## Select Slots
|name|描述|
|---|---|
|empty|空文本插槽|


## Option Attributes
|参数名|描述|可选值|默认值|
|---|---|---|:---:|
|label|绑定值|`string`|`-`|
|value|是否禁用|`string` |`-`|
|disabled|是否禁用|`boolean` |`false`|

## Option Slots
|name|描述|
|---|---|
|default|-|
