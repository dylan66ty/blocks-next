---
title: Tooltip
lang: zh-CN
---

# 文字气泡 Tooltip
鼠标悬停、聚焦或点击在某个组件时，弹出的文字提示。

## 基本使用
鼠标移入，气泡出现，鼠标移出，气泡消失。设置 `effect` 属性即可切换主题，`effect` 可选值 light、effect
::: demo 
tooltip/basic
:::

## 位置
文字气泡支持 12 个不同的方位。分别为：上左(tl)、上(top)、上右(tr)、下左(bl)、下(bottom)、下右(br)、左上(lt)、左(left)、左下(lb)、右上(rt)、右(right)、右下(rb)
::: demo 
tooltip/position
:::

## 自定义背景颜色
通过 `background-color` 属性自定义背景颜色
:::warning
设置自定义背景颜色后会覆盖effect主题。
:::
::: demo 
tooltip/background-color
:::

## 自定义内容
通过使用`content`插槽来自定义提示内容。
::: demo 
tooltip/slot
:::


## 双向绑定
通过使用`v-model` 即可。
::: demo 
tooltip/default-visible
:::

## 禁用
通过 `disabled` 设置是否禁用。
::: demo 
tooltip/disabled
:::

## API
## Attributes
|属性名|描述|类型|默认值|
|---|---|---|:---:|
|v-model|双向绑定。不设置会用内部默认状态|`boolean`|false|
|effect|默认提供的主题|`dark \| light`|dark|
|disabled|是否禁用|`boolean`|false|
|content|文字气泡内容|`string`|-|
|position|弹出位置|`top \| tl \| tr \| bottom \| bl \| br \| left \| lt \| lb \| right \| rt \| rb`|tl|
|background-color|气泡的背景颜色|`string`|rgba(0,0,0,.8)|
|renderTo|气泡渲染到哪个容器|`string \| HTMLElement`|body|



## Slots
|name|描述|scoped|
|---|---|---|
|content|文字气泡内容|-|

## Events
|事件名|描述|函数类型|
|---|---|---|
|change|当绑定值变化时触发的事件|`(val:boolean) => void`|
