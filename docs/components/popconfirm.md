---
title: Popconfirm
lang: zh-CN
---

# 按钮 Popconfirm
点击元素，弹出气泡式的确认框。

## 基本使用
::: demo 气泡确认框的基本用法。
popconfirm/basic
:::

## 自定义按钮
::: demo 自定义按钮的文字。通过 `okText` 设置确认按钮文案，`cancelText` 设置取消按钮文案。
popconfirm/text
:::

## 关闭前拦截
::: demo 取消，确认拦截器。传入属性 `onBeforeCancel` 拦截取消行为。`onBeforeOk` 拦截确认行为。拦截函数可直接返回boolean或者promise。返回值false为拦截，不emit事件。反之则校验通过，执行emit事件。
popconfirm/beforeEach
:::

## 弹出位置
::: demo 支持 12 个不同的方位。分别为：上左(tl)、上(top)、上右(tr)、下左(bl)、下(bottom)、下右(br)、左上(lt)、左(left)、左下(lb)、右上(rt)、右(right)、右下(rb)。
popconfirm/position
:::

## 确认框类型
::: demo 通过过 `type` 属性可以设置确认框类型。
popconfirm/type
:::

## 插槽
::: demo 通过 `content` 插槽自定义渲染内容
popconfirm/slots
:::

## 默认显示
::: demo 可以使用v-model实现双向绑定
popconfirm/modelValue
:::


## Attributes
|参数名|描述|可选值|默认值|
|---|---|---|:---:|
|content|气泡确认框的内容|`string`|`-`|
|v-model|双向绑定。不设置会用内部默认状态|`boolean`|`false`|
|width|气泡确认框大小|`string`/ `number`|`200`|
|disabled|是否禁用|`boolean`|`false`|
|type|气泡确认框的类型|`primary` / `success` / `warning` / `strong` / `danger`|`danger`|
|position|气泡确认框弹出位置|`top` / `tl` / `tr` / `bottom` / `bl` / `br` / `left` / `lt` / `lb` / `right` / `rt` / `rb`|`tl`|
|okText|确认按钮文案|`string`|`确认`|
|cancelText|删除按钮文案|`string`|`取消`|
|onBeforeOk|点击确认按钮前拦截|`() => boolean \| Promise<boolean>`|`-`|
|onBeforeCancel|点击取消按钮前拦截|`() => boolean \| Promise<boolean>`|`-`|
|popupClass|弹框添加自定义类名|`string`| `-`|


## Slots
|name|描述|
|---|---|
|content|气泡确认框的内容|

## Events
|事件名|描述|回调|
|---|---|---|
|ok|点击确认按钮触发|`(e:Event)`|
|cancel|点击取消按钮触发|`(e:Event)`|
|change|当绑定值变化时触发的事件|`(val:boolean)`|