---
title: Button
lang: zh-CN
---

# 按钮 Button
按钮是一种命令组件，可发起一个即时操作。

## 基本使用
使用 `type` 、`plain` 来定义按钮的样式
::: demo 
button/basic
:::

## 形状
设置属性 `shape` 为 `circle` 圆形、`round` 全圆角
::: demo 
button/shape
:::

## 文字按钮
设置属性 `link` 即可
::: demo 
button/text
:::

## 无边框按钮
设置属性 `border` 为 `false` 即可
::: demo 
button/border
:::

## 卡片按钮
设置属性 `type*` 为 `card` 即可
::: demo 
button/card
:::


## 禁用状态
设置属性 `disabled` 为 `true` 即可
::: demo 
button/disabled
:::


## 按钮大小
设置属性 `size` 为 `mini`、`small`、`large` 来定义按钮的大小
::: demo 
button/size
:::



## 块级按钮

::: demo 设置属性 **block**为 `true` 将按钮定义为块级按钮。
button/block
:::

## Loading状态

::: demo 设置属性 **loading**为 `true`为加载状态。如果你绑定点击函数是个promise的话，内部会自动处理loading状态。不用传递loading属性。
button/loading
:::


## 组合按钮

::: demo 通过 `<bu-button-group>` 组件使按钮以组合方式出现。可用在同级多项操作中。
button/group
:::


## Attributes
|参数名|描述|可选值|默认值|
|-------|-------|---|:---:|
|type|类型| `primary` / `success` / `danger` / `warning` / `strong` / `card` |`-`|
|size|大小|`mini` / `small` / `normal` / `large`   | `normal` |
|shape|按钮形状|`circle` / `round`|`-`|
|link|是否文字按钮|`boolean`|`false`|
|plain|是否为朴素按钮|`boolean`|`false`|
|border|按钮是否添加边框|`boolean`|`true`|
|disabled|是否禁用|`boolean`|`false`|
|block|是否块级按钮|`boolean`|`false`|
|loading|按钮加载中|`boolean`|`false`|
|loading-fill ^(beta)|加载中是否全局填充|`boolean`|`false`|


