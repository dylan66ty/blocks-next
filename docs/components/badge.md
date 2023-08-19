---
title: Badge
lang: zh-CN
---

# 数字角标 Badge
按钮和图标上的数字或状态标记

## 基本使用
设置 `value` 来展示角标数字
::: demo 
badge/basic
:::

## 最大值
设置 `max` 来设置最大值，`max`默认值为99。注意：只有设置 `value` 和 `max` 是number类型才生效
::: demo 
badge/max
:::

## 红点
设置 `is-dot` 属性即可
::: demo 
badge/dot
:::

## 自定义内容
设置 `value` 为非数字类型即可
::: demo 
badge/custom
:::

## Attributes
|属性名|描述|类型|默认值|
|-------|-------|---|:---:|
|value|显示值| `string \| value`|-|
|max|最大值，超过最大值会显示 {max}+。 只有当 value 是数字类型时起作用。|`string \| number` | 99 |
|is-dot|是否显示小圆点| `boolean`|false|
|effect|主题|`dark \| light`|dark|
|type|类型|`primary \| success \| warning \| strong \| danger` |danger|
|hidden|是否隐藏 Badge|`boolean`|false|
