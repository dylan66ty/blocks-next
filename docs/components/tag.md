---
title: Tag
lang: zh-CN
---

# 标签 Tag
用于标记和选择

## 基本使用
设置 `type` 属性来选择 Tag 的类型
::: demo 
tag/basic
:::

## 可删除
设置 `closable` 属性可以定义一个标签是否可移除。当 Tag 被移除时会触发 `close` 事件
::: demo 
tag/cancel
:::

## 尺寸大小
设置 `size` 属性来设尺寸, 可选值包括 `small` 或 `large`。默认值 `normal`
::: demo 
tag/size
:::

## 主题
设置 `effect` 属性来设主题, 可选值包括 `light` 、 `dark` 和 `plain`。默认值 `light`
::: demo 
tag/effect
:::

## 圆形标签
设置 `round` 属性为 true 即可
::: demo 
tag/round
:::

## 图标
设置 `icon` 属性为 图标名 即可
::: demo 
tag/icon
:::

## API
## Attributes
|属性名|描述|类型|默认值|
|-------|-------|---|:---:|
|type|Tag 的类型| `primary \| success \| danger \| warning \| strong`|-|
|closeable|是否可关闭|`boolean` |false|
|size|Tag 的尺寸|`small \| large \| default`|default|
|effect|Tag 的主题|`boolean`|false|
|plain|是否为朴素按钮|`dark \| plain \| light`|light|
|round|Tag 是否为圆形|`boolean`|false|
|icon|Tag 的图标|`string`|-|


## Events
|事件名|描述|函数类型|
|---|---|---|
|close|关闭 Tag 时触发的事件|`(e:Event) => void`|


## Slots
|name|描述|scoped|
|---|---|---|
|icon|图标插槽|-|
