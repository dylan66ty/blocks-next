---
title: Empty
lang: zh-CN
---

# 空状态 Empty
指当前场景没有对应的数据内容，呈现出的一种状态

## 基本使用
空状态组件的基本用法
::: demo 
empty/basic
:::


## 图片尺寸
通过使用 `icon-size` 属性来控制图片大小。`icon-size`可接受个数字类型或数组
::: demo 
empty/size
:::

## 自定义图片和文字
通过使用插槽 `image` 来自定义
::: demo 
empty/custom
:::

## 底部内容
通过使用插槽 `description` 来自定义底部内容
::: demo 
empty/slots
:::

## Attributes
|属性名|描述|类型|默认值|
|---|---|---|:---:|
|description|描述内容| `string` |暂无数据|
|iconSize|控制默认图标大小|`number \| [number,number]`   | [240,120] |

 ## Slots
|名称|描述|scoped|
|---|---|---|
|image|图标|-|
|description|描述内容|-|
