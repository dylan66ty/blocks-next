---
title: Message
lang: zh-CN
---

# 消息提示 Message

## 基本使用
::: demo 从顶部出现，1.5s后自动消失。
message/basic
:::


## 不同状态
::: demo 用来显示「成功、警告、强烈警告、消息、错误」类的操作反馈。
message/type
:::

## 文字居中
::: demo 使用 `center` 属性让文字水平居中。
message/text-center
:::

## 渲染到容器
::: demo 使用 `renderTo` 属性让message渲染到容器中，默认`document.body`
message/render-container
:::

## 可关闭
::: demo 
message/close
:::

## Options
|参数名|描述|可选值|默认值|
|---|---|---|:---:|
|message|消息文字|`string` / `VNode`|`-`|
|type|主题|`success`/ `info` / `error` / `warning` / `strong` |`-`|
|duration|显示时间, 毫秒。设为 0 则不会自动关闭|`number`|`1500`|
|center|文字是否居中|`boolean`|`false`|
|offset|Message 距离窗口顶部的偏移量|`number`|`20`|
|onClose|关闭时的回调函数, 参数为被关闭的 message 实例|`function`|`-`|
|showClose|是否显示关闭按钮|`boolean`|`false`|


## 方法
|方法名|说明|
|---|---|
|close|关闭当前的 Message|


