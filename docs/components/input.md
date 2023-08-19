---
title: Input
lang: zh-CN
---

# 输入框 Input
基本表单组件，并在原生控件基础上进行了功能扩展，可以组合使用

## 基本使用
输入框的基本使用
::: demo 
input/basic
:::


## 卡片输入框
设置属性 `card` 为 `true` 即可开启卡片模式的输入框
:::tip
Select、Cascader、TreeSelect、DatePicker 组件的输入框基于 Input，因此这些组件都有 card 属性向 Input 内部传递
:::
::: demo 
input/card
:::



## 可清空
使用`clearable`属性即可得到一个可清空的输入框
::: demo  
input/clearable
:::


## 禁用
设置属性 `disabled` 为 `true` 即可禁用此输入框
::: demo 
input/disabled
:::



## 密码
设置属性 `show-password` 为 `true` 即可开启带密码样式的输入框
::: demo 
input/password
:::


## 图标 
设置属性`prefix-icon` `suffix-icon` 即可添加图标
::: demo 
input/icon
:::

## 过滤器
添加 `formatter` 函数即可自定义过滤器
::: demo 
input/formatter
:::

## 尺寸
设置 `size` 属性即可调整输入框的大小
::: demo  
input/size
:::


## 文本域
用于输入多行文本信息，通过将 `type` 属性的值指定为 `textarea`
::: demo 
input/textarea
:::

## 可自适应文本高度的文本域 
通过设置 `autosize` 属性可以使得文本域的高度能够根据文本内容自动进行调整，并且 `autosize` 还可以设定为一个对象，指定最小行数和最大行数
::: demo 
input/auto-textarea
:::



## 字数统计
设置 `max-length` 可以限制最大字数，配合 `show-word-limit` 可以显示字数统计
::: demo 
input/limit-length
:::


## API
## Attributes
|属性名|描述|类型|默认值|
|-------|-------|---|:---:|
|v-model|绑定值|`string \| number`|-|
|type|类型|`text \| textarea`|text|
|size|尺寸(只对type:`text`生效)|`small \| default \| large`|normal|
|show-password|是否显示切换密码图标|`boolean`|false|
|disabled|禁用|`boolean`|false|
|prefix-icon|输入框头部图标|`string`|-|
|suffix-icon|输入框尾部图标|`string`|-|
|formatter|输入框过滤器|`(val:string) => string`|-|
|maxlength|最大输入长度|`string \| number`|-|
|show-word-limit|是否显示统计字数|`boolean`|-|
|autosize|自适应内容高度，只对 type="textarea" 有效，可传入对象，如: \{ minRows: 2, maxRows: 6 \}|`object \| boolean`|false|
|autocomplete|原生属性，自动补全|`on \| off`|off|
|name|原生属性|`string`|-|
|form|原生属性|`string`|-|
|readonly|原生属性，是否只读|`boolean`|false|
|autofocus|原生属性，自动获取焦点|`boolean`|false|
|card|输入框卡片模式|`boolean`|-|


## Events
|name|描述|函数类型|
|---|---|---|
|blur|在 Input 失去焦点时触发|`(event: Event) => void`|
|focus|在 Input 获得焦点时触发|`(event: Event) => void`|
|change|仅在输入框失去焦点或用户按下回车时触发|`(value: string \| number) => void`|
|input|在 Input 值改变时触发|`(value: string \| number) => void`|
|clear|在 Input 清空时触发|`() => void`|


## Slots
|name|描述|scoped|
|---|---|---|
|prefix-icon|输入框头部图标|-|
|suffix-icon|输入框尾部图标|-|




