---
title: Message
lang: zh-CN
---

# 消息提示 Message
由用户的操作触发的轻量级全局反馈。


## 基本使用
全局提示的基本用法，从顶部出现，1.5s后自动消失
:::warning 
 `message` 属性虽然支持传入 HTML 片段，但是在网站上动态渲染任意 `HTML` 是非常危险的，因为容易导致 `XSS` 攻击。 因此在 `useHTML` 打开的情况下，请确保 `message` 的内容是可信的，永远不要将用户提交的内容赋值给 `message` 属性。
:::
::: demo 
message/basic
:::


## 不同状态
用来显示「成功、警告、强烈警告、消息、错误」的操作反馈
::: demo 
message/type
:::

## 文字居中
使用 `center` 属性让文字水平居中
::: demo 
message/text-center
:::

## 可关闭的消息提示
默认的 `Message` 是不可以被手动关闭的。 如果你需要手动关闭功能，你可以把 `showClose` 设置为 true ，把 `duration` 这个属性的值设置为0便表示该消息不会被自动关闭
::: demo 
message/close
:::

## 挂载位置
设置 `renderTo` 即可自定义在哪个容器中弹出, 默认在 `document.body` 弹出
::: demo 
message/render-container
:::

## API
## Options
|名称|描述|类型|默认值|
|---|---|---|:---:|
|message|消息文字|`string \| VNode`|-|
|type|主题|`success \| info \| error \| warning \| strong` |-|
|duration|显示时间, 毫秒。设为 0 则不会自动关闭|`number`|1500|
|center|文字是否居中|`boolean`|false|
|offset|Message 距离顶部的偏移量|`number`|20|
|onClose|关闭时的回调函数|`() => void`|-|
|useHTML ^(beta)|是否将 message 属性作为 HTML 片段处理|`boolean`|false|
|showClose|是否显示关闭按钮|`boolean`|false|
|renderTo|Message挂载位置|`string \| HTMLElement`|`body`|

## Methods
调用 Message 会返回当前 Message 的实例。 如果需要手动关闭实例，可以调用它的 close 方法。
|方法名|说明|类型|
|---|---|---|
|close|关闭当前的 Message|`() => void`|


