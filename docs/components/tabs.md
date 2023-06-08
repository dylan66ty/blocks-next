---
title: Tabs
lang: zh-CN
---

# 标签页 Tabs
将内容组织同一视图中，一次可查看一个视图内容，查看其他内容可切换选项卡查看。

## 基本使用
::: demo 标签页的基本使用方法。双向绑定设置 `v-model:activeKey`即可。
tabs/basic
:::

## 带图标的页签 
::: demo 在bn-tab-pane设置`title`插槽即可
tabs/customTitle
:::

## 不同类型
::: demo tabs设置type为`line` /`button` / `button-group`即可切换tabs类型
tabs/types
:::

## 左右滑动
::: demo 当tab过多时，你可能需要这个功能。不用担心！此功能是根据父元素宽度和tabs长度，自动计算开启。
tabs/scroll
:::

## 开启看板
::: demo 设置属性hidePanes为false
tabs/panes
:::


## Tabs Attributes
|参数名|描述|可选值|默认值|
|---|---|---|:---:|
|v-model:activeKey|当前选中的标签的 key|`string`/ `number`|`-`|
|type|选项卡的类型| `line` / `button` / `button-group`|`line`|
|destroyOnHide|是否在不显示标签时销毁看板内容|`boolean`|`-`|
|animation|选项卡切换时看板是否开启动画|`boolean`|`true`|
|hidePanes|是否隐藏看板|`boolean`|`true`|

## TabPane  Attributes
|参数名|描述|可选值|默认值|
|---|---|---|:---:|
|key|tab的 key|`string`/ `number`|`required`|
|title|tab的 title|`string`/ `number`|`-`|
|destroyOnHide|是否在不显示标签时销毁内容,pane上的此属性优先级高于tabs。|`boolean`|`-`|


## Tabs Events
|name|描述|回调参数|
|---|---|---|
|change|tab在激活时触发|`(key: string\|number)`|

## TabPane Slots
|name|描述|
|---|---|
|title|tab标题|
