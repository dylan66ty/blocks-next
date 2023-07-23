---
title: Select
lang: zh-CN
---

# 选择器 Select
当用户需要从一组同类数据中选择一个或多个时，可以使用下拉选择器，点击后选择对应项。

## 基础用法

::: demo v-model的值为当前被选中的el-option的 value 属性值
select/basic
:::

## 禁用状态
::: demo 选择器不可用状态,设置属性disabled即可
select/disabled
:::

## 可清空单选
::: demo 包含清空按钮，可将选择器清空为初始状态
select/clearable
:::

## 有禁用选项
::: demo 在bn-option中，设定disabled值为 true，即可禁用该选项
select/option-disabled
:::

## 多选 ^(beta)
::: demo 设置属性`multiple`即可。注意此时`v-model`要绑定是个`数组`的字段。
select/multiple
:::


## 自定义模板
::: demo 在bn-option中，设定默认插槽即可
select/option-default-slots
:::

## 筛选选项 ^(beta)
::: demo 可以利用筛选功能快速查找选项。
select/filter
:::

## 远程搜索 ^(beta)
::: demo 输入关键字以从远程服务器中查找数据。此功能必须将`filterable`和`remote`设置为true，同时传入一个`remote-method`。 remote-method为一个Function，它会在输入值发生变化时调用，参数为当前输入值。此时你可以拿到当前输入框的query,然后你在请求接口拿到数据后在渲染option。
select/remote
:::

## Select Attributes
|参数名|描述|可选值|默认值|
|---|---|---|:---:|
|v-model|绑定值|`number` / `string` / `array`|`-`|
|multiple ^(alpha.30)|是否多选|`boolean`|`false`|
|disabled|是否禁用|`boolean` |`false`|
|clearable|是否可以清空选项|`boolean` |`false`|
|size|尺寸大小|`small` / `default` / `large`|`default`|
|placeholder|占位符|`string`|`请选择`|
|filterable^(alpha.32)|是否可筛选|`boolean`|`false`|
|filter-method^(alpha.32)|自定义筛选方法|`(optVmProxy, query) => boolean`|`-`|
|remote^(alpha.32)|是否从服务器远程加载|`boolean`|`false`|
|remote-method^(alpha.32)|自定义远程搜索方法|`(query) => void `|`-`|
|loading|是否正在从远程获取数据|`boolean`|`false`|
|loading-text|正在加载文字|`string`|`-`|
|no-data-text|选项为空时显示的文字|`string`|`暂无数据`|


## Select Events
|事件名|描述|回调|
|---|---|---|
|change|当绑定值变化时触发的事件|`(val) => void`|


## Select Slots
|name|描述|
|---|---|
|empty|无选项时的列表|


## Option Attributes
|参数名|描述|可选值|默认值|
|---|---|---|:---:|
|label|选项的标签|`string`|`-`|
|value|选项的值|`string` |`-`|
|disabled|是否禁用|`boolean` |`false`|

## Option Slots
|name|描述|
|---|---|
|default|-|
