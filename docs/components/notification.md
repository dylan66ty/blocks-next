---
title: Notification
lang: zh-CN
---

# 通知 Notification
全局展示通知提醒，将信息及时有效的传达给用户。

## 基本使用
设置参数 `duration` 为0则不会自动关闭。默认 `duration` 为3s，倒计时结束后自动关闭。
::: demo 
notification/basic
:::

## 消息类型
设置 `type` 属性即可改变消息类型，`type` 可选值 info 、success 、warning 、strong 、error
::: demo 
notification/types
:::

## 全局提示的位置
设置 `position` 属性即可改变弹出的位置，`position` 可选值 top-left 、top-right 、bottom-left 、bottom-right
::: demo 
notification/position
:::

## 隐藏关闭按钮
设置 `showClose` 属性为 `false` 即可。
::: demo 
notification/hide-close
:::

## 使用renderFunction渲染
options中的 `message` 可以是 `RenderFunction`
::: demo 
notification/render-function
:::

## 挂载位置
设置 `renderTo` 即可自定义在哪个容器中弹出, 默认在 `document.body` 弹出
::: demo
notification/render-to
:::

## API
## Options
|属性名|描述|类型|默认值|
|---|---|---|:---:|
|title|通知标题|`string` |-|
|message|通知内容|`string \| RenderFunction` |required|
|type|弹框类型|`info \| success \| warning \| strong \| error` |info|
|duration|显示时间, 毫秒。设为 0 则不会自动关闭|`number`|`3000`|
|position|弹出位置|`top-right \| top-left \| bottom-right \| bottom-left`|top-right|
|offset|Notification 距离顶部的偏移量|`number`|20|
|onClose|关闭时的回调函数|`() => void`|-|
|showClose|是否显示关闭按钮|`boolean`|false|
|renderTo|Notification挂载位置|`string \| HTMLElement`|body|









