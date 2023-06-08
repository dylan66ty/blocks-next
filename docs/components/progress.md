---
title: Progress
lang: zh-CN
---

# 进度条 Progress
给予用户当前系统执行中任务运行状态的反馈，多用于运行一段时间的场景，有效减轻用户在等待中产生的焦虑感。

## 基本使用

::: demo 简单的进度条。
progress/basic
:::


## 进度条状态

::: demo 通过 `status` 指定进度条状态。`status`状态可选值为`primary`,`success`,`warning`,`danger`
progress/status
:::

## 环形进度条

::: demo 设置 type 为`circle` 将会展示环形进度条。
progress/circle
:::

## 进度条动画

::: demo 通过设置`animation`属性即可。只适用于type为`line`情况。
progress/animation
:::

## 进度条颜色

::: demo 通过设置`color`属性即可。color属性可以是string。也可以是个函数，随着percent变化来改变颜色。
progress/customColor
:::

## 进度条大小

::: demo 通过 `size` 设置进度条的大小。size可选值为small,normal,large。默认值为normal。你也可以直接设置strokeWidth来改变进度条大小。
progress/size
:::

## 进度条轨道颜色

::: demo 通过 `trackColor` 可以通过 trackColor 设置轨道的颜色
progress/trackColor
:::



## Attributes
|参数名|描述|可选值|默认值|
|---|---|---|:---:|
|type|进度条的类型| `line` / `circle`|`line`|
|size|进度条的大小|`small` / `normal` / `large`   | `normal` |
|percent|进度条当前的百分比,注意取值范围0-1|`number` |`0`|
|stroke-width|进度条的线宽|`number`|`-`|
|width|进度条的长度,注意环形进度条只能传number类型|`number` / `string`|`-`|
|color|进度条的颜色，当color为函数时候，必须返回一个string颜色|`string`/ `(percent:number) => string`|`-`|
|track-color|进度条的轨道颜色|`string`|`-`|
|show-text|是否显示进度条尾部文字|`boolean`|`true`|
|status|进度条状态|`primary` / `success` / `warning` / `danger`|`primary`|
|formatText|文字格式化函数|`(percent:number) => string`|`-`|

## Slots
|name|描述|scoped|
|---|---|---|
|text|进度条尾部文字|`percent`|

