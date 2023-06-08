---
title: Notification
lang: zh-CN
---

# 通知 Notification
全局展示通知提醒，将信息及时有效的传达给用户。

## 基本使用
::: demo 设置参数`duration`为0则不会自动关闭。默认`duration`为3s，倒计时结束后自动关闭。
notification/basic
:::

## 消息类型
::: demo 设置参数`type`为`info`,`success`,`warning`,`strong`,`err`, `none`即可。
notification/types
:::

## 全局提示的位置
::: demo 设置参数`position`为`top-left`,`top-right`,`bottom-left`,`bottom-right`即可。
notification/position
:::

## 隐藏关闭按钮
::: demo 设置参数`showClose`为`false`即可。
notification/hide-close
:::

## 使用renderFunction渲染
::: demo options中的message可以是`RenderFunction`
notification/render-function
:::

## 挂载位置
::: demo 设置 `renderTo` 即可, 默认挂载到`document.body`
notification/render-to
:::

## Options
|参数名|描述|可选值|默认值|
|---|---|---|:---:|
|title|通知标题|`string` |`-`|
|message|通知内容|`string` / `RenderFunction` |`required`|
|type|弹框类型|`info` / `success` / `warning` / `strong` / `error` |`info`|
|duration|显示时间, 毫秒。设为 0 则不会自动关闭|`number`|`3000`|
|position|弹出位置|`top-right` | `top-left` | `bottom-right` |`bottom-left`|`top-right`|
|offset|Notification 距离顶部的偏移量|`number`|`20`|
|onClose|关闭时的回调函数, 参数为被关闭的 Notification实例|`(vm) => void`|`-`|
|showClose|是否显示关闭按钮|`boolean`|`false`|
|renderTo|Notification挂载位置|`string` / `HTMLElement`|`body`|









