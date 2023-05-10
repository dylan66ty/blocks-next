---
title: Input
lang: zh-CN
---

# 输入框 Input

## 基本使用

::: demo  warning设置属性 **error**为 `true` 即可。
input/basic
:::

## 尺寸

::: demo  设置属性 **size**为 `small` `normal` `large` 即可。
input/size
:::



## 禁用

::: demo 设置属性 **disabled**为 `true` 即可。
input/disabled
:::



## 密码
::: demo 设置属性 **show-password**为 `true` 即可。
input/password
:::


## 图标 
::: demo 设置前后`prefix-icon` `suffix-icon` 插槽即可
input/icon
:::

## 文本域
::: demo 用于输入多行文本信息，通过将 type 属性的值指定为 textarea。
input/textarea
:::

## 可自适应文本高度的文本域 
::: demo 通过设置 autosize 属性可以使得文本域的高度能够根据文本内容自动进行调整，并且 autosize 还可以设定为一个对象，指定最小行数和最大行数。
input/auto-textarea
:::


## Attributes
|参数名|描述|类型|默认值|
|---|---|---|:---:|
|`value` / `v-model`|绑定值|`string` \| `number`|`-`|
|size|尺寸|`string`|`small` \| `normal` \| `large`|
|show-password|密码|`number`|`false`|
|disabled|禁用|`boolean`|`false`|
|warning|边框和文字颜色danger|`boolean`|`false`|


## Slots
|name|描述|
|---|---|
|`prefix-icon`|输入框头部内容|
|`suffix-icon`|输入框尾部内容|


## Input Events
|name|描述|回调参数|
|---|---|---|
|`blur`|在 Input 失去焦点时触发|`(event: Event)`|
|`focus`|在 Input 获得焦点时触发|`(event: Event)`|
|`change`|仅在输入框失去焦点或用户按下回车时触发|`(value: string \| number)`|
|`input`|在 Input 值改变时触发|`(value: string \| number)`|



