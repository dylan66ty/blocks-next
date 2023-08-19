---
title: Space
lang: zh-CN
---

# 间距 Space
设置组件之间的间距

## 基础用法
基础使用
::: demo 
space/basic
:::

## 垂直间距
设置 `direction` 属性为 `vertical` 即可设置垂直方向排列的间距
::: demo 
space/vertical
:::

## 尺寸
内置 4 个尺寸，mini - 4px small - 8px (默认) medium - 16px large - 24px，也支持传数字来自定义尺寸
::: demo 
space/size
:::

## 分隔符
设置插槽 `split` 可以为相邻子元素设置分隔符
::: demo 
space/split
:::

## 水平布局对齐方式
 内置 4 种对齐方式，分别为 start center end baseline，在水平模式下默认为 center
::: demo
space/align
:::

## API
## Attributes
|属性名|描述|类型|默认值|
|---|---|---|:---:|
|direction|间距方向|`horizontal \| vertical`|horizontal|
|size|间距大小，支持分别制定横向和竖向的间距|`number \| mini \| small \| medium \| large`|small|
|align|对齐方式|`start \| center \| end \| baseline`|center|
|fill|充满整行|`boolean`|false|

## Slots
|name|描述|scoped|
|---|---|---|
|split|设置分隔符|-|
