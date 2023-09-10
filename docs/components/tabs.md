---
title: Tabs
lang: zh-CN
---

# 标签页 Tabs
将内容组织同一视图中，一次可查看一个视图内容，查看其他内容可切换选项卡查看

## 基本使用
标签页的基本使用方法。双向绑定设置 `v-model:activeKey`即可
::: demo 
tabs/basic
:::

## 带图标的页签 
在 `bn-tab-pane` 设置 `title` 插槽即可
::: demo 
tabs/customTitle
:::

## 类型
设置 `type` 属性即可切换类型。`type` 可选值 line、button、button-group
::: demo 
tabs/types
:::

## 超出自动隐藏
当tab过多时，你可能需要这个功能。不用担心！此功能是根据父元素宽度和tabs长度，自动计算开启
::: demo 
tabs/scroll
:::

## 开启看板
设置 `hide-panes` 属性为 false，即可开启看板
::: demo
tabs/panes
:::

## 附加内容
demo 通过 `extra` 插槽可以自定义额外显示内容
::: 
tabs/extra
:::

## 动态增减标签页
动态增减标签页
::: demo 
tabs/dynamic
:::

## API
## Tabs Attributes
|属性名|描述|类型|默认值|
|---|---|---|:---:|
|v-model:activeKey|当前选中的标签的 key|`string \| number`|-|
|type|选项卡的类型| `line \| button \| button-group`|line|
|destroy-on-hide|是否在不显示标签时销毁看板内容|`boolean`|-|
|animation|选项卡切换时看板是否开启动画|`boolean`|true|
|hide-panes|是否隐藏看板|`boolean`|true|

## TabPane  Attributes
|属性名|描述|类型|默认值|
|---|---|---|:---:|
|key|tab的 key|`string \| number`|required|
|title|tab的 title|`string \| number`|-|
|destroy-on-hide|是否在不显示标签时销毁内容,pane上的此属性优先级高于tabs|`boolean`|-|



## Tabs Events
|name|描述|函数类型|
|---|---|---|
|change|tab在激活时触发|`(key: string\|number) => void`|

## Tabs Slots
|name|描述|scoped|
|---|---|---|
|extra|选项卡额外内容|-|

## TabPane Slots
|name|描述|scoped|
|---|---|---|
|title|tab标题|-|
