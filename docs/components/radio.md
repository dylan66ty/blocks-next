---
title: Radio
lang: zh-CN
---

# 单选框 Radio

## 基本使用

::: demo
radio/basic
:::

## 禁用状态
::: demo 设置属性 **disabled**为 `true`。
radio/disabled
:::

## 单选框组
::: demo 适用于在多个互斥的选项中选择的场景。
radio/group
:::

## Radio Attributes
|参数名|描述|可选值|默认值|
|---|---|---|:---:|
|v-model|绑定值|`boolean` / `number` / `string`|`-`|
|label|选中状态的值|`string`/ `number` / `boolean` |`-`|
|disabled|是否禁用|`boolean`|`false`|
|name|原生 name 属性|`string`|`-`|

## Radio Events
|事件名|描述|回调|
|---|---|---|
|change|当绑定值变化时触发的事件|`(val:boolean)`|


## RadioGroup Attributes
|参数名|描述|可选值|默认值|
|---|---|---|:---:|
|value / v-model|绑定值|`number` / `string` / `boolean`|`-`|

## RadioGroup Events
|事件名|描述|回调|
|---|---|---|
|change|当绑定值变化时触发的事件|`(val:number/string/boolean)`|
