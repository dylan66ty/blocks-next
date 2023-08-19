---
title: DatePicker
lang: zh-CN
---

# 日期选择器 DatePicker
选择日期。支持月、周、日类型，也支持范围选择等。


## 基本使用
日期选择器的基础使用
::: demo 
datePicker/basic
:::


## 月份选择器
月份输入器的基础使用。设置`type`为`month`即可。
::: demo 
datePicker/month
:::


## 周选择器
周输入器的基础使用。设置`type`为`week`即可。
::: demo
datePicker/week
:::

## 选择日期范围
你可以通过以下例子来学习如何设置一个日期范围选择器。
::: demo 
datePicker/daterange
:::

## 选择月份范围
你当然还可以选择一个月的范围。
::: demo 
datePicker/monthrange
:::


## 双向绑定
通过 `v-model` 实现值的双向绑定。`v-model`绑定的值要根据`type`类型来定义。参考下面示例。
::: demo
datePicker/default-value
:::


## 不可选取的时间
使用 `disabled-date` 可以禁用某些日期。
::: demo
datePicker/disabled-date
:::


## 日期格式
1.使用 `input-label-format` 指定输入框显示时间的格式。
|type|默认format|
|---|---|
|date|`yyyy-MM-dd`|
|daterange|`yyyy-MM-dd`|
|month|`yyyy-MM`|
|monthrange|`yyyy-MM`|
|week|`yyyy-ww周`|

2.使用 `model-value-format` 指定绑定值的格式。默认情况下，组件接受并返回Date对象。

:::warning 
请一定要注意传入参数的大小写是否正确
:::
::: demo
datePicker/formats
:::

3.format格式说明

|格式|输出|描述|
|---|---|---|
|`YY`|23|两位数年份|
|`YYYY`|2023|四位数年份|
|`M`|8|一位数月份|
|`MM`|08|两位数月份|
|`d`|1|一位数日期|
|`dd`|01|二位数日期|
|`h`|1-12|一位数小时|
|`hh`|01-12|二位数小时|
|`m`|0-59|一位数分钟|
|`mm`|00-59|二位数分钟|
|`s`|0-59|一位数秒|
|`ss`|00-59|二位数秒|
|`w`|0-53|一位数周|
|`ww`|00-53|二位数周|



## 每周的第一天开始于周几
使用 `day-start-of-week` 可以重置第一天开始于周几
::: demo
datePicker/week-start
:::


## 自定义内容
弹出框的内容是可以自定义的，你可以使用 `cell` 插槽来获取到当前单元格的数据
::: demo
datePicker/custom-cell
:::

## DateCell类型
```js
export interface DateCell {
  value: string | number
  label: string | number
  date: Date
  isNow: boolean
  isCur: boolean
  isPrev: boolean
  isNext: boolean
  isRange: boolean
  isSelect: boolean
  isRangeStart: boolean
  isRangeEnd: boolean
  isDisabled: boolean
  format: (date?: Date, formatter?: string) => string | undefined
}


```

## API
## Checkbox Attributes
|属性名|描述|类型|默认值|
|-------|-------|---|:---:|
|v-model|双向绑定的值|`array \| string \| Date \| number`|date|
|disabled|是否禁用|`boolean`|false|
|placeholder|提示文案|`string`|请选择|
|size|尺寸大小|`small \| default \| large`|default|
|clearable|是否可清空|`boolean`|-|
|range-separator|输入框中日期展示的分隔符，一般只用于日期的范围选择|`string`|～|
|day-start-of-week|每周的第一天开始于周几，0:周日，1:周一，以此类推。|`0 \| 1 \| 2 \| 3 \| 4 \| 5 \| 6`|1|
|model-value-format|可选，绑定值的格式。 不指定则绑定值为 Date 对象|`string`|-|
|input-label-format|显示在输入框中的格式,具体规则请看 [这里](/components/datePicker#日期格式) |`string`|-|
|disabled-date|不可选取的日期|`(date: Date) => boolean`|-|
|popup-class|自定义弹出层类名|`string`|-|
|card|输入框卡片模式 [详情](/components/input.html#卡片输入框)|`boolean`|-|


## Events
|name|描述|函数类型|
|---|---|---|
|change|选中值改变时触发|`(date: Date \| Date[]) => void`|
|show|当下拉列表显示时触发|`-`|
|hide|当下拉列表隐藏时触发|`-`|


## Slots
|name|描述|scoped|
|---|---|---|
|cell|自定义单元格内容|`{cell:DateCell}`|













