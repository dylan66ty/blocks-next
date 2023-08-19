---
title: Popconfirm
lang: zh-CN
---

# 按钮 Popconfirm
点击元素，弹出气泡式的确认框

## 基本使用
气泡确认框的基本用法
::: demo 
popconfirm/basic
:::

## 自定义按钮
自定义按钮的文字。通过 `okText` 设置确认按钮文案，`cancelText` 设置取消按钮文案
::: demo 
popconfirm/text
:::

## 关闭前拦截
取消，确认拦截器。传入属性 `onBeforeCancel` 拦截取消行为。`onBeforeOk` 拦截确认行为。拦截函数可直接返回boolean或者promise。返回值false为拦截，不emit事件。反之则校验通过，执行emit事件
::: demo 
popconfirm/beforeEach
:::

## 弹出位置
支持 12 个不同的方位。分别为：上左(tl)、上(top)、上右(tr)、下左(bl)、下(bottom)、下右(br)、左上(lt)、左(left)、左下(lb)、右上(rt)、右(right)、右下(rb)。
::: demo 
popconfirm/position
:::

## 确认框类型
通过 `type` 属性可以设置确认框类型，`type` 可选值 primary、success、warning、strong、danger
::: demo 
popconfirm/type
:::

## 插槽
通过 `content` 插槽自定义渲染内容
::: demo 
popconfirm/slots
:::

## 双向绑定
可以使用v-model实现双向绑定
::: demo 
popconfirm/modelValue
:::


## API
## Attributes
|属性名|描述|类型|默认值|
|---|---|---|:---:|
|content|气泡确认框的内容|`string`|`-|
|v-model|双向绑定。不设置会用内部默认状态|`boolean`|false|
|width|气泡确认框大小|`string \| number`|200|
|disabled|是否禁用|`boolean`|false|
|type|气泡确认框的类型|`primary \| success \| warning \| strong \| danger \| danger`|
|position|气泡确认框弹出位置|`top \| tl \| tr \| bottom \| bl \| br \| left \| lt \| lb \| right \| rt \| rb`|tl|
|okText|确认按钮文案|`string`|确认|
|cancelText|删除按钮文案|`string`|取消|
|onBeforeOk|点击确认按钮前拦截|`() => boolean \| Promise<boolean>`|-|
|onBeforeCancel|点击取消按钮前拦截|`() => boolean \| Promise<boolean>`|-|
|popupClass|弹框添加自定义类名|`string`|-|


## Events
|事件名|描述|函数类型|
|---|---|---|
|ok|点击确认按钮触发|`(e:Event) => void`|
|cancel|点击取消按钮触发|`(e:Event) => void`|
|change|当绑定值变化时触发的事件|`(val:boolean) => void`|

## Slots
|name|描述|scoped|
|---|---|---|
|content|气泡确认框的内容|-|

