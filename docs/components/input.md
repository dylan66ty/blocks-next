---
title: Input
lang: zh-CN
---

# 按钮 Input

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

## Attributes
|参数名|描述|类型|默认值|
|---|---|---|:---:|
|warning|danger颜色边框|`boolean`|`false`|
|size|尺寸|`string`|`small \| normal \| large`|
|show-password|密码|`number`|`false`|
|disabled|禁用|`boolean`|false|

## Slots
|name|描述|
|---|---|
|prefix-icon|输入框头部内容|
|suffix-icon|输入框尾部内容|


## Event
|name|描述|回调参数|
|---|---|---|
|change|在 Input 值改变时触发|(value: string)|
