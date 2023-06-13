---
title: Tag
lang: zh-CN
---

# 标签 Tag
用于标记和选择。

## 基本使用
::: demo 由 `type` 属性来选择 tag 的类型。
tag/basic
:::

## 可删除
::: demo 设置 `closable` 属性可以定义一个标签是否可移除。当 Tag 被移除时会触发 `close` 事件。
tag/cancel
:::

## 尺寸大小
::: demo 设置 `size` 属性来设尺寸, 可选值包括 `small` 或 `large`。默认值 `normal`
tag/size
:::

## 主题
::: demo 设置 `effect` 属性来设主题, 可选值包括 `light` 、 `dark` 和 `plain`。默认值 `light`
tag/effect
:::

## 圆形标签
::: demo 设置 `round` 属性为true即可。
tag/round
:::

## 图标
::: demo 设置 `icon` 属性为 图标名 即可。
tag/icon
:::


## Attributes
|参数名|描述|可选值|默认值|
|-------|-------|---|:---:|
|type|Tag 的类型| `primary` / `success` / `danger` / `warning` / `strong`|`-`|
|closeable|是否可关闭|`boolean` | `false` |
|size|Tag 的尺寸|`small` / `large` / `normal`|`normal`|
|effect|Tag 的主题|`boolean`|`false`|
|plain|是否为朴素按钮|`dark` / `plain` / `light`|`light`|
|round|Tag 是否为圆形|`boolean`|`false`|
|icon|Tag 的图标|`string`|`-`|


## Events
|事件名|描述|回调|
|---|---|---|
|close|关闭 Tag 时触发的事件|`(e:Event) => void`|


## Slots
|name|描述|scoped|
|---|---|---|
|icon|图标插槽|-|
