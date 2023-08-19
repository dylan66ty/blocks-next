---
title: Scrollbar
lang: zh-CN
---

# 滚动条 Scrollbar
用于替换浏览器默认滚动条样式

## 基本使用
scrollbar默认插槽
:::warning 
要给 scrollbar 默认 height
:::
::: demo 
scrollbar/basic
:::

设置 `type` 属性改变滚动条类型，track 类型会显示滚动条轨道
::: demo 
scrollbar/type
:::

## API
## Attributes
|属性名|描述|类型|默认值|
|-------|-------|---|:---:|
|type|类型|`track \| embed` |embed|

## Events
|事件名|描述|函数类型|
|---|---|---|
|scroll|滚动时触发|`(e:Event) => void`|


## Methods
|方法名|描述|类型|
|---|---|---|
|scrollTo|滚动|`(options: {left?: number;top?: number}) => void`|
|scrollTop|纵向滚动|`(top: number) => void`|
|scrollLeft|横向滚动|`(left: number) => void`|

