---
title: Switch
lang: zh-CN
---

# 开关 Switch
互斥性的操作控件，用户可打开或关闭某个功能。

## 基础用法
::: demo 绑定 v-model 到一个 Boolean 类型的变量。 可以使用 activeColor 属性与 inactiveText 属性来设置开关的背景色
switch/basic
:::

## 开关类型
::: demo 开关分为 circle - 圆形（默认）、line - 线性2种类型,设置属性`type:line \ circle`即可
switch/type
:::

## 文字描述

::: demo 使用active-text属性与inactive-text属性来设置开关的文字描述, `inlinePrompt` 内部文字描述
switch/label
:::


## 自定义开关的值

::: demo 通过 `trueValue` 和 `falseValue` 可以自定义开关的值
switch/custom-value
:::

## 禁用状态

::: demo 设置 `disabled` 属性，接受一个Boolean，设置true即可禁用
switch/disabled
:::


## 切换拦截

::: demo 设置 `beforeChange` 函数，函数的返回值将用于判断是否阻止切换
switch/intercept
:::


## Attributes
|参数名|描述|可选值|默认值|
|---|---|---|:---:|
|v-model|绑定值，必须等于 trueValue 或 falseValue，默认为 Boolean 类型|`boolean / string / number`|`-`|
|type|switch形状|`line` / `circle`|`circle`|
|disabled|是否禁用|`boolean`|`false`|
|width|switch 的宽度|`string` / `number`|`-`|
|inline-prompt|是否开启内部文字描述|`boolean`|`false`|
|active-text|激活状态文字描述|`string`|`-`|
|inactive-text|未激活状态文字描述|`string`|`-`|
|trueValue|激活状态绑定的值|`boolean` / `string` / `number`|`-`|
|falseValue|未激活状态绑定的值|`boolean` / `string` / `number`|`-`|
|active-color|激活状态时的背景颜色|`string`|`-`|
|inactive-color|未激活激活状态时的背景颜色|`string`|`-`|
|before-change|switch 状态改变前的钩子， 返回 false 或者返回 Promise 且被 reject 则停止切换|`() => Promise<boolean> ` / ` boolean`|`-`|

## Events
|name|描述|回调参数|
|---|---|---|
|change|switch 状态发生变化时的回调函数|`(val) => {}`|

## Slots
|name|描述|
|---|---|
|inline|自定义内部文字描述|
|loading|自定义loading图标|







