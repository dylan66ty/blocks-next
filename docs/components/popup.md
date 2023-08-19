---
title: Popup
lang: zh-CN
---

# 弹出层 Popup
用于对元素添加 hover, click 事件，并且弹出下拉框

## 基本使用
触发器的最基础的使用
::: demo 
popup/basic
:::


## 内容可扩展
可以在 Popup 中嵌套其它组件， 以下为嵌套表格的例子
::: demo 
popup/content
:::


## 可嵌套
当然，你还可以嵌套 bn-popup， 它比使用dialog更加轻量
::: demo 
popup/nest
:::

## 手动打开
此时你只要弹出层实例抛出的方法`changePopupVisible`即可。该方法只接收一个布尔值，传入 true 打开，false 即关闭。
::: demo 
popup/manual
:::

## API
## Attributes
|属性名|描述|类型|默认值|
|-------|-------|---|:---:|
|trigger|触发方式| `click \| hover` |click|
|disabled|是否禁用|`boolean`|false|
|width|宽度|`string \| number`|auto|
|min-width|最小宽度|`string \| number`|150|
|placement|出现位置|`top \| tl \| tr \| bottom \| bl \| br \| left \| lt \| lb \| right \| rt \| rb`|`bottom`|
|show-arrow|是否显示 popup 箭头|`boolean`|false|
|offset|出现位置的偏移量|`number`|-|
|contentClass|为 popup content 添加类名|`string`|-|

## Popup Methods
|方法名|说明|函数类型|
|---|---|---|
|changePopupVisible ^(alpha.33)|手动打开popup|`(visible:boolean) => void`|


## Events
|name|描述|函数类型|
|---|---|---|
|show|显示时触发|`() => void`|
|hide|隐藏时触发|`() => void`|



## Slots
|name|描述|scoped|
|---|---|---|
|trigger|弹出层触发器绑定的对象|`-`|
|content|自定义弹出层类容|`-`|










