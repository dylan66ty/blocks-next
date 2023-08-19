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
设置 `shape` 属性即可改变按钮的形状。`circle` 圆形、`round` 全圆角
::: demo 
button/shape
:::

## 文字按钮
设置`link` 属性即可设置成文字按钮
::: demo 
button/text
:::

## 无边框按钮
设置 `border` 属性为 `false` 即可隐藏按钮的边框
::: demo 
button/border
:::

## 卡片按钮
设置 `type` 属性为 `card` 即可改变按钮的样式
::: demo 
button/card
:::


## 禁用状态
设置 `disabled` 属性为 `true` 即可禁用按钮
::: demo 
button/disabled
:::


## 按钮大小
设置 `size` 属性可以定义按钮的大小。`size` 可选值为 `mini`、`small`、`large`
::: demo 
button/size
:::



## 块级按钮
设置 `block` 属性为 `true` 即可将按钮独占一行
::: demo
button/block
:::

## Loading状态
设置 `loading` 属性为 `true` 即可使按钮处于加载状态
::: tip
如果你绑定点击函数是个 Promise 的话，内部会自动处理 loading 状态。不用传递 loading 属性。具体下面的示例
:::
::: demo 
button/loading
:::


## 组合按钮
组合 `bu-button-group` 组件使按钮以组合方式出现
::: demo 
button/group
:::

## API
## Attributes
|属性名|描述|类型|默认值|
|---|---|------|:---:|
|type|类型|`primary \| success \| danger \| warning \| strong \| card`|-|
|size|大小|`mini \| small \| normal \| large` | normal |
|shape|按钮形状|`circle \| round`|-|
|link|是否文字按钮|`boolean`|false|
|plain|是否为朴素按钮|`boolean`|false|
|border|按钮是否添加边框|`boolean`|true|
|disabled|是否禁用|`boolean`|false|
|block|是否块级按钮|`boolean`|false|
|loading|按钮加载中|`boolean`|false|
|loading-fill|加载中是否全局填充|`boolean`|false|


