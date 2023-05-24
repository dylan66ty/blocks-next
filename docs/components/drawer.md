---
title: Drawer
lang: zh-CN
---

# 抽屉 Drawer

## 基本使用
::: demo 点击触发按钮抽屉从右侧滑出，点击遮罩区关闭。
drawer/basic
:::

## 抽屉位置
::: demo 自定义位置，点击触发按钮抽屉从相应的位置滑出。设置属性`placement`即可。
drawer/placement
:::

## 回调函数
::: demo 在点击确认和取消前可以做一些事。`onBeforeOk`拦截点击确认按钮，可返回`boolean`或`Promise<boolean>`，只有当返回值为`true`时，抽屉才会关闭。`onBeforeCancel`拦截点击取消按钮，同上。
drawer/before
:::

## 自定义节点
::: demo 通过默认插槽来自定义内容。注意：当使用默认插槽时，其余（title，body，footer）插槽会失效。
drawer/slots
:::


## 挂载位置
::: demo  设置 `renderTo` 即可, 默认挂载到`document.body`
drawer/custom-container
:::

## Attributes
|参数名|描述|可选值|默认值|
|---|---|---|:---:|
|v-model|抽屉是否可见|`boolean`|`false`|
|placement|抽屉放置的位置|`top` / `right` / `bottom` / `left` |`right`|
|title|标题|`string`|`-`|
|mask|是否显示遮罩层|`boolean`|`false`|
|maskToClose|是否点击遮罩层可以关闭对话框|`boolean` |`true`|
|okText|确认按钮的内容|`string` |`确认`|
|cancelText|取消按钮的内容|`string` |`取消`|
|destroyOnClosed|关闭时是否卸载节点|`boolean` |`true`|
|width|抽屉的宽度（仅在placement为right,left时可用）|`number` / `string` |`340`|
|height|抽屉的高度（仅在placement为top,bottom时可用）|`number` / `string` |`340`|
|escToClose|是否可以按esc键关闭|`boolean` |`true`|
|onBeforeOk|点击确认前拦截器|`Function`|`()=> boolean \| Promise<boolean>`|
|beforeOnCancel|点击取消前拦截器|`Function`|`()=> boolean \| Promise<boolean>`|
|renderTo|渲染到哪个容器里面|`string` / `HTMLElement`|`body`|
|disabled|抽屉是否禁用|`boolean`|`false`|


## Events
|事件名|描述|回调|
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
|footer|页脚插槽|`ok` / `cancel` / `loadingObj: {ok:boolean, cancel:boolean}` |



