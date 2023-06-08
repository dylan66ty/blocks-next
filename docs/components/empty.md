---
title: Empty
lang: zh-CN
---

# 空状态 Empty
指当前场景没有对应的数据内容，呈现出的一种状态。

## 基本使用

::: demo 空状态组件的基本用法。
empty/basic
:::


## 图片尺寸

::: demo 通过使用 `icon-size` 属性来控制图片大小。`icon-size`可接受个数字类型或数组。
empty/size
:::

## 自定义图片和文字

::: demo 通过使用插槽`image`来自定义
empty/custom
:::

## 底部内容

::: demo 通过使用插槽`description`来自定义底部内容
empty/slots
:::

## Attributes
|参数名|描述|可选值|默认值|
|---|---|---|:---:|
|description|描述内容| `string` |`暂无数据`|
|iconSize|控制默认图标大小|`number` / `[number,number]`   | `[240,120]` |

 ## Slots
|名称|描述|
|---|---|
|image|图标|
|description|描述内容|
