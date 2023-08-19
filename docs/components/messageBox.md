---
title: MessageBox
lang: zh-CN
---

# 弹框 MessageBox
模拟系统的消息提示框而实现的一套模态对话框组件，用于消息提示、确认消息和提交内容

## 基本用法
MessageBox 直接调用即可使用消息提示框。`type` 可选值 `info \| success \| warning \| strong \| error`
::: demo  
messageBox/basic
:::

## 顶部距离
添加`top`属性即可设置距离容器的顶部距离
::: demo  
messageBox/top
:::

## 对话框的宽度
设置 `width="auto"` 可以让对话框自适应宽度
::: demo  
messageBox/width
:::

## 定制按钮文字
设置 `okText` 与 `cancelText` 可以自定义按钮文字。
::: demo  
messageBox/button-text
:::

## 快速调用类型弹框
通过 `MessageBox[type]` 可直接快速调用消息提示框
:::tip
该方法返回一个对象，对象里有ok和cancel方法，如果只传递一个函数`a`作为参数，则此函数`a`在弹框取消`cancel`或确认`ok`后触发。如果你想要在用户点击按钮时`做一些事`,你就要传递两个函数作为参数。第一个参数`a`为拦截函数，你可以在这里做些事，第二个参数`b`会在拦截通过后触发。这两个方法支持链式调用。具体方法看下面dome展示。`MessageBox.success(title,content)`
:::
::: demo  
messageBox/simple-use
:::

## 挂载位置
设置 `renderTo` 即可自定义在哪个容器中弹出, 默认在 `document.body` 弹出
::: demo
messageBox/custom-container
:::


## API
## Options
|属性名|描述|类型|默认值|
|---|---|---|:---:|
|type|弹框类型|`info \| success \| warning \| strong \| error` |info|
|title|弹框标题|`string \| RenderFunction` |-|
|content|弹框内容|`string \| RenderFunction` |required|
|width|弹框宽度|`string \| number`  |-|
|height|弹框高度|`string \| number`  |-|
|footer|弹框footer|`boolean \| (scoped) => void`|-|
|okText|弹框确认按钮文本|`string`|确认|
|cancelText|弹框取消按钮文本|`string`|取消|
|hideCancel|是否隐藏删除按钮|`boolean` |false|
|hideOk|是否隐确认除按钮|`boolean`|false|
|mask|是否显示遮罩层|`boolean`|true|
|maskToClose|是否点击遮罩层关闭|`boolean`|true|
|center|是否居中显示|`boolean`|true|
|top|顶部距离|`number` / `string`|-|
|renderTo|渲染到哪个容器里面|`string \| HTMLElement`|body|
|onOk|点击确认按钮后触发|`(e:Event) => void`|-|
|beforeOnOk|点击确认前拦截器|`()=> boolean \| Promise<boolean>`|-|
|onCancel|点击取消按钮后触发|`(e:Event) => void`|-|
|beforeOnCancel|点击取消前拦截器|`()=> boolean \| Promise<boolean>`|-|
|popupClass|弹框添加自定义类名|`string`|-|









