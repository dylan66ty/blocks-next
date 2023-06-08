---
title: Space
lang: zh-CN
---

# 间距 Space
设置组件之间的间距

## 基础用法
::: demo 设置组件之间的间距
space/basic
:::

## 垂直间距
::: demo 可以设置垂直方向排列的间距
space/vertical
:::

## 尺寸
::: demo 内置 4 个尺寸，mini - 4px small - 8px (默认) medium - 16px large - 24px，也支持传数字来自定义尺寸
space/size
:::

## 分隔符
::: demo 设置插槽`split`可以为相邻子元素设置分隔符；
space/split
:::

## 水平布局对齐方式
::: demo 内置 4 种对齐方式，分别为 start center end baseline，在水平模式下默认为 center。
space/align
:::

## Attributes
|参数名|描述|可选值|默认值|
|---|---|---|:---:|
|direction|间距方向|`horizontal` / `vertical`|`horizontal`|
|size|间距大小，支持分别制定横向和竖向的间距|`number` / `mini` / `small` / `medium` / `large`|`small`|
|align|对齐方式|`start` / `center` / `end` / `baseline`|`center`|
|fill|充满整行|`boolean`|`false`|

## Slots
|name|描述|
|---|---|
|split|设置分隔符|
