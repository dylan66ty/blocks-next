---
title: Dialog
lang: zh-CN
---

# 通知框 Dialog
在当前页面打开一个浮层，承载相关操作。

## 基本用法
::: demo  设置`v-model`绑定即可
dialog/basic
:::

## 弹窗大小
::: demo 设置属性`width/minWidth`和`height/minHeight`即可
dialog/size
:::

## 关闭前验证
::: demo 设置属性**onBeforeCancel**为函数即可，该函数返回`boolean`或者是个`promise`。`true`表示可以关闭，`false`表示不可以关闭。
dialog/before-cancel
:::

## 居中
::: demo 设置属性**center**即可
dialog/center
:::

## 顶部距离
::: demo 设置属性**top**即可，top可以是 `number` / `string`
dialog/top
:::

## 全屏
::: demo 设置属性**fullscreen**即可
dialog/fullscreen
:::

## 挂载位置
::: demo 设置 `renderTo` 即可, 默认挂载到`document.body`
dialog/render-to
:::


## Attributes
|参数名|描述|可选值|默认值|
|---|---|---|:---:|
|v-model|对话框是否可见|`boolean`|`false`|
|width|对话框的宽度|`string`/ `number`  |`-`|
|minWidth|对话框的最小宽度|`string`/ `number`  |`-`|
|height|对话框的高度|`string`/ `number`  |`-`|
|minHeight|对话框的最小高度|`string`/ `number`  |`-`|
|top|对话框的距离顶部的高度，居中显示开启的情况下不生效|`string`/ `number`  |`-`|
|mask|是否显示遮罩层|`boolean`|`true`|
|center|是否居中|`boolean`|`false`|
|destroyOnClosed|dialog是否在关闭时卸载|`boolean`|`true`|
|maskToClose|是否点击遮罩层可以关闭对话框|`boolean`|`true`|
|escToClose|是否可以通过按下esc键关闭|`boolean`|`true`|
|fullscreen|是否全屏|`boolean`|`false`|
|onBeforeCancel|触发 cancel 事件前的回调函数。如果返回 false 则不会触发后续事件。|`boolean`/ `Promise<boolean>`|`-`|
|renderTo|dialog挂在哪个容器下|`string`/ `HTMLElement`|`body`|
|popupClass|dialog添加自定义类名|`string`|`-`|



## Events
|事件名|描述|回调|
|---|---|---|
|open|对话框打开前触发|`() => void`|
|opened|对话框打开后（动画结束）触发|`() => void`|
|close|对话框关闭后触发|`() => void`|
|closed|对话框关闭后（动画结束）触发|`() => void`|


## Slots
|name|描述|scoped|
|---|---|---|
|title|标题插槽|-|
|default|默认插槽,主体内容放在这里|-|
|footer|页脚插槽|`ok` / `cancel` |






