---
title: Dropdown
lang: zh-CN
---

# 下拉菜单 Dropdown
将动作或菜单折叠到下拉菜单中


## 基本使用
悬停在下拉菜单上以展开更多操作
::: demo 
dropdown/basic
:::

## 组件联动
通过 `v-model:command` 实现command的双向绑定。下面例子是和input组件联动效果
::: demo 
dropdown/model
:::


## 菜单隐藏方式
设置 `hide-on-click` 属性即可
::: demo 
dropdown/hide-on-click
:::

## 触发方式
设置 `trigger` 即可，可选的触发方式有 `click` ,`hover`。默认 `click`
::: demo 
dropdown/pattern
:::

## 弹出方向
通过 `placement` 支持指定 6 种弹出方位，分别是：top: 向上, tl: 左上, tr: 右上, bottom: 下方(默认), bl: 左下, br: 右下
::: demo 
dropdown/placement
:::


## 尺寸
使用 size 属性配置尺寸，可选的尺寸大小有:`default` 或 `small`。默认尺寸是 `default`
::: demo 
dropdown/size
:::

## 自定义选项
通过 default 插槽即可自定义选项类容
::: demo 
dropdown/default-slot
:::

## API
## Dropdown Attributes
|属性名|描述|类型|默认值|
|-------|-------|---|:---:|
|v-model:command|双向绑定command| `string \| number`|-|
|trigger|触发方式| `click \| hover` |click|
|disabled|是否禁用|`boolean`|false|
|placement|出现位置|`top \| tl \| tr \| bottom \| bl \| br`|bl|
|show-arrow|是否显示 popup 箭头|`boolean`|false|
|offset|出现位置的偏移量|`number`|-|
|contentClass|为 popup content 添加类名|`string`|-|
|size|尺寸大小|`default \| small`|default|

## DropdownItem Attributes
|属性名|描述|类型|默认值|
|-------|-------|---|:---:|
|command|派发到command回调函数的指令参数| `string \| number`|-|
|disabled|是否禁用| `boolean` |false|
|divided|是否显示分隔符| `boolean` |false|
|label|显示的文本| `string \| number` |-|



## Dropdown Events
|name|描述|函数类型|
|---|---|---|
|show|显示时触发|`-`|
|hide|隐藏时触发|`-`|
|command|点击菜单项触发的事件回调|`(command:string) => void`|




## Dropdown Slots
|name|描述|scoped|
|---|---|---|
|trigger|弹出层触发器绑定的对象|`{show:boolean,data:{label:any,command:any}}`|
|dropdown|下拉菜单的内容|`-`|


## DropdownItem Slots
|name|描述|scoped|
|---|---|---|
|default|自定义DropdownItem内容|`-`|