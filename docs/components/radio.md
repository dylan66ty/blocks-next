---
title: Radio
lang: zh-CN
---

# 单选框 Radio
在一组相关且互斥数据中，用户仅能选择一个选项。

## 基本使用
单选框的基本用法
::: demo

radio/basic
:::

## 禁用状态
设置属性 `disabled` 为 `true` 即可
::: demo 
radio/disabled
:::

## 单选框组
适用于在多个互斥的选项中选择的场景
::: demo 
radio/group
:::

## API
## Radio Attributes
|属性名|描述|类型|默认值|
|---|---|---|:---:|
|v-model|绑定值|`boolean \| number \| string`|-|
|label|选中状态的值|`string \| number` |-|
|disabled|是否禁用|`boolean`|false|
|name|原生 name 属性|`string`|-|

## Radio Events
|事件名|描述|函数类型|
|---|---|---|
|change|当绑定值变化时触发的事件|`(val:boolean) => void`|


## RadioGroup Attributes
|属性名|描述|类型|默认值|
|---|---|---|:---:|
|v-model|绑定值|`number \| string \| boolean`|-|

## RadioGroup Events
|事件名|描述|函数类型|
|---|---|---|
|change|当绑定值变化时触发的事件|`(val:number \| string \| boolean) => void`|
