---
title: Button
lang: zh-CN
---

# 按钮 Button

## 基本使用

::: demo 设置属性 **type**为 `info`、`success` 、 `danger`、 `warning`、 `strong` 来定义按钮的类型。
button/default
:::

## 填充类型

::: demo 设置属性 **fill-mode**为 `outline`来控制 **bn-button** 成为线形按钮。
button/fill-mode
:::

## 按钮大小

::: demo 设置属性 **size**为 `mini`、`small`、`normal`默认、`large` 来定义按钮的大小。
button/size
:::

## 按钮图标

::: demo 设置属性 **left-icon** 文字左边按钮 或 **right-icon** 文字右边按钮 为 `add`、`delete`... 来定义按钮内嵌Icon。或者直接使用Icon标签亦可。
button/icon
:::


## 块级按钮

::: demo 设置属性 **block**为 `true` 将按钮定义为块级按钮。
button/block
:::

## 加载和等待

::: demo 设置属性 **loading**为 `true`为加载状态，设置属性 **delay**为 `number`为节流时间，通过绑定 **await** 属性为一个 `Promise`/`Async`函数，会自动按照响应时间开始Loading和关闭Loading。
button/loading
:::

## 形状

::: demo 设置属性 **shape**为 `circle` 圆形、`square`长方形、`round`全圆角，设置属性 **disabled**为 `true`为禁止。
button/shape
:::
## 组合按钮

::: demo 通过 `<bu-button-group>` 组件使按钮以组合方式出现。可用在同级多项操作中。
button/group
:::

## Attributes


| 属性|描述|可选值|默认值|
|---|---|---|---|
| type       | 按钮类型     | `default` / `info` / `success` / `danger` / `warning` / `strong` | `default` |
| fill-mode    | 填充类型     | `outline` / `none`                                                   | `-`       |
| block        | 块级按钮     | boolean                                                               | `false`   |
| size         | 按钮大小     | `mini` / `small` / `default` / `large`                             | `default` |
| shape        | 按钮形状     | `circle` / `square` / `round`                                       | `-`       |
| loading      | 按钮加载中    | `boolean`                                                               | `false`   |
| loading-fill | 按钮居中填充   | `boolean`                                                               | `false`   |
| right-icon   | 文字右按钮    | `add` / `delete` / `search`                                         | `-`       |
| left-icon   | 文字左按钮    | `add` / `delete` / `search`                                         | `-`       |
| delay        | debounce等待时间   | `number` / `string`                                                                | `0`       |
| await        | 等待函数执行完毕 | `Promise` / `AsyncFunction`                                              |`-`      |
| disabled     | 禁止操作     | `true` / `false`                                                         | `false`   |
