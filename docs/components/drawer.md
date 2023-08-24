---
title: Drawer
lang: zh-CN
---

# 抽屉 Drawer
触发命令后，从屏幕一侧滑出的抽屉式的面板

## 基本使用
点击触发按钮抽屉从右侧滑出，点击遮罩区关闭
::: demo 
drawer/basic
:::

## 抽屉位置
自定义位置，点击触发按钮抽屉从相应的位置滑出。`placement` 可选值 top 、right 、bottom 、left
::: demo 
drawer/placement
:::

## 关闭前拦截
在点击确认和取消前可以做一些事。`onBeforeOk`拦截点击确认按钮，`必须`返回`boolean`或`Promise<boolean>`，只有当返回值为`true`时，抽屉才会关闭。`onBeforeCancel`拦截点击取消按钮，同上。
::: demo 
drawer/before
:::

## 自定义节点
通过默认插槽来自定义内容。
:::warning
当使用默认插槽时，其余（title，body，footer）插槽会失效。
:::
::: demo 
drawer/slots
:::


## 挂载位置
设置 `renderTo` 即可自定义在哪个容器中弹出, 默认在 `document.body` 弹出
::: demo
drawer/custom-container
:::


## API
## Attributes
|属性名|描述|类型|默认值|
|---|---|---|:---:|
|v-model|抽屉是否可见|`boolean`|false|
|show-footer ^(alpha.36.3)|是否显示footer|`boolean`|true|
|placement|抽屉放置的位置|`top \| right \| bottom \| left`|right|
|title|标题|`string`|-|
|mask|是否显示遮罩层|`boolean`|true|
|maskToClose|是否点击遮罩层可以关闭对话框|`boolean`|true|
|okText|确认按钮的内容|`string`|确认|
|cancelText|取消按钮的内容|`string`|取消|
|destroyOnClosed|关闭时是否卸载节点|`boolean` |true|
|width|抽屉的宽度（仅在placement为right,left时可用）|`number \| string` |340|
|height|抽屉的高度（仅在placement为top,bottom时可用）|`number \| string` |340|
|escToClose|是否可以按esc键关闭|`boolean` |true|
|onBeforeOk|点击确认前拦截器|`()=> boolean \| Promise<boolean>`|-|
|beforeOnCancel|点击取消前拦截器|`()=> boolean \| Promise<boolean>`|-|
|renderTo|渲染到哪个容器里面|`string \| HTMLElement`|body|
|disabled|抽屉是否禁用|`boolean`|false|
|popupClass|Drawer添加自定义类名|`string`|-|


## Events
|事件名|描述|函数类型|
|---|---|---|
|open|抽屉打开前触发|`() => void`|
|opened|抽屉打开后（动画结束）触发|`() => void`|
|close|抽屉关闭后触发|`() => void`|
|closed|抽屉关闭后（动画结束）触发|`() => void`|


## Slots
|name|描述|scoped|
|---|---|---|
|default|默认插槽,设置这个插槽后其余插槽失效|-|
|title|标题插槽|-|
|body|主体插槽|-|
|footer|页脚插槽|`{ok:Function,cancel:Function,loadingObj:Record<'ok' \| 'cancel', boolean>}`|



