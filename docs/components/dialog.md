---
title: Dialog
lang: zh-CN
---

# 通知框 Dialog
在当前页面打开一个浮层，承载相关操作。

## 基本用法
设置`v-model`绑定即可
::: demo  
dialog/basic
:::

## 弹窗大小
设置 `width` 和 `height` 属性即可改变弹窗的大小
::: demo 
dialog/size
:::

## 关闭前验证
设置属性 `on-before-cancel` 为函数即可添加验证。该函数 `必须` 返回 `boolean` 或者是个`Promise<boolean>`。`true`表示可以关闭，`false`表示不可以关闭
::: demo 
dialog/before-cancel
:::

## 居中
设置 `center` 属性即可垂直居中显示
::: demo 
dialog/center
:::

## 顶部距离
设置 `top` 属性即可设置顶部距离
::: demo 
dialog/top
:::

## 全屏
设置 `fullscreen` 属性即可全局展示
::: demo 
dialog/fullscreen
:::

## 挂载位置
设置 `render-to` 即可自定义在哪个容器中弹出, 默认在 `document.body` 弹出
::: demo 
dialog/render-to
:::


## API
## Attributes
|属性名|描述|类型|默认值|
|---|---|---|:---:|
|v-model|对话框是否可见|`boolean`|false|
|show-header-bottom-line ^(alpha.36.4)|对话框头部区域下方显示边框|`boolean`|false|
|width|对话框的宽度|`string \| number`|-|
|min-width|对话框的最小宽度|`string \| number`|-|
|height|对话框的高度|`string \|number`|-|
|min-height|对话框的最小高度|`string \| number`|-|
|top|对话框的距离顶部的高度，居中显示开启的情况下不生效|`string \| number`  |-|
|mask|是否显示遮罩层|`boolean`|true|
|show-close ^(alpha.30)|是否显示关闭按钮|`boolean`|true|
|center|是否居中|`boolean`|false|
|destroy-on-closed|dialog是否在关闭时卸载|`boolean`|true|
|mask-to-close|是否点击遮罩层可以关闭对话框|`boolean`|true|
|esc-to-close|是否可以通过按下esc键关闭|`boolean`|true|
|fullscreen|是否全屏|`boolean`|false|
|on-before-cancel|触发 cancel 事件前的回调函数。如果返回 false 则不会触发后续事件。|`boolean \| Promise<boolean>`|-|
|render-to|dialog挂在哪个容器下|`string \| HTMLElement`|body|
|popup-class|dialog添加自定义类名|`string`|-|


## Events
|事件名|描述|函数类型|
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
|footer|页脚插槽|`{ok:Function, cancel: Function}` |






