---
title: Scrollbar
lang: zh-CN
---

# 滚动条 Scrollbar
用于替换浏览器默认滚动条样式。

## 基本使用

::: demo scrollbar默认插槽。注意：要给scrollbar默认`height`
scrollbar/basic
:::

::: demo 设置 `type` 属性改变滚动条类型，track 类型会显示滚动条轨道。
scrollbar/type
:::

## Attributes
|参数名|描述|可选值|默认值|
|-------|-------|---|:---:|
|type|类型|`track` / `track` |`embed`|

## Events
|事件名|描述|回调|
|---|---|---|
|scroll|滚动时触发|`(e:Event) => void`|


## Methods
|方法名|描述|参数|
|---|---|---|
|scrollTo|滚动|`(options: {left?: number;top?: number}) => void`|
|scrollTop|纵向滚动|`top: number`|
|scrollLeft|横向滚动|`left: number`|

