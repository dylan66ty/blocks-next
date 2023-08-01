---
title: Popup
lang: zh-CN
---

# 弹出层 Popup
用于对元素添加 hover, click 事件，并且弹出下拉框。

## 基本使用

::: demo 这个例子展示了触发器的最基础的使用。
popup/basic
:::


## 内容可扩展
::: demo 可以在 Popup 中嵌套其它组件， 以下为嵌套表格的例子。
popup/content
:::


## 可嵌套
::: demo 当然，你还可以嵌套 bn-popup， 它比使用dialog更加轻量。
popup/nest
:::

## 手动打开
::: demo 此时你只要弹出层实例抛出的方法`changePopupVisible`即可。该方法只接收一个布尔值，传入true打开，false即关闭。
popup/manual
:::

## Attributes
|参数名|描述|可选值|默认值|
|-------|-------|---|:---:|
|trigger|触发方式| `click` / `hover` |`click`|
|disabled|是否禁用|`boolean`|`false`|
|width|宽度|`string` / `number`|`auto`|
|min-width|最小宽度|`string` / `number`|`150`|
|placement|出现位置|`top` / `tl` / `tr` / `bottom` / `bl` / `br` / `left` / `lt` / `lb` / `right` / `rt` / `rb`|`bottom`|
|show-arrow|是否显示 popup 箭头|`boolean`|`false`|
|offset|出现位置的偏移量|`number`|`-`|
|contentClass|为 popup content 添加类名|`string`|`-`|

## Popup Methods
|方法名|说明|回调参数|
|---|---|---|
|changePopupVisible ^(alpha.33)|手动打开popup|`(visible:boolean) => void`|


## Events
|name|描述|回调参数|
|---|---|---|
|show|显示时触发|`-`|
|hide|隐藏时触发|`-`|



## Slots
|name|描述|scoped|
|---|---|---|
|trigger|弹出层触发器绑定的对象|`-`|
|content|自定义弹出层类容|`-`|










