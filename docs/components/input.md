---
title: Input
lang: zh-CN
---

# 输入框 Input
基本表单组件，并在原生控件基础上进行了功能扩展，可以组合使用

## 基本使用
::: demo 
input/basic
:::


## 卡片输入框
::: demo 设置属性 **card**为 `true` 即可
input/card
:::



## 可清空
::: demo  使用`clearable`属性即可得到一个可清空的输入框
input/clearable
:::


## 禁用
::: demo 设置属性 **disabled**为 `true` 即可
input/disabled
:::



## 密码
::: demo 设置属性 **show-password**为 `true` 即可
input/password
:::


## 图标 
::: demo 设置属性`prefix-icon` `suffix-icon` 即可
input/icon
:::

## 过滤器
::: demo 设置属性 **formatter**为 `Function` 即可 
input/formatter
:::

## 尺寸
::: demo  设置属性 **size**为 `small` `normal` `large` 即可
input/size
:::


## 文本域
::: demo 用于输入多行文本信息，通过将 type 属性的值指定为 textarea
input/textarea
:::

## 可自适应文本高度的文本域 
::: demo 通过设置 autosize 属性可以使得文本域的高度能够根据文本内容自动进行调整，并且 autosize 还可以设定为一个对象，指定最小行数和最大行数
input/auto-textarea
:::


## Attributes
|参数名|描述|可选值|默认值|
|---|---|---|:---:|
|v-model|绑定值|`string` / `number`|`-`|
|type|类型|`text` / `textarea`|`text`|
|size|尺寸(只对type:`text`生效)|`small` / `normal` / `large`|`normal`|
|show-password|是否显示切换密码图标|`boolean`|`false`|
|disabled|禁用|`boolean`|`false`|
|prefix-icon|输入框头部图标|`string`|`-`|
|suffix-icon|输入框尾部图标|`string`|`-`|
|formatter|输入框过滤器|`(val:string) => string`|`-`|
|autosize|自适应内容高度，只对 type="textarea" 有效，可传入对象，如，\{ minRows: 2, maxRows: 6 \}|`object` / `boolean`|`false`|
|warning|边框和文字颜色danger|`boolean`|`false`|
|autocomplete|原生属性，自动补全|`on` / `off`|`off`|
|name|原生属性|`string`|`-`|
|form|原生属性|`string`|`-`|
|readonly|原生属性，是否只读|`boolean`|`false`|
|autofocus|原生属性，自动获取焦点|`boolean`|`false`|



## Events
|name|描述|回调参数|
|---|---|---|
|blur|在 Input 失去焦点时触发|`(event: Event)`|
|focus|在 Input 获得焦点时触发|`(event: Event)`|
|change|仅在输入框失去焦点或用户按下回车时触发|`(value: string / number)`|
|input|在 Input 值改变时触发|`(value: string / number)`|
|clear|在 Input 清空时触发|`(value: '')`|


## Slots
|name|描述|
|---|---|
|prefix-icon|输入框头部图标|
|suffix-icon|输入框尾部图标|




