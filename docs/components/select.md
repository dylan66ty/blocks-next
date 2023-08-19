---
title: Select
lang: zh-CN
---

# 选择器 Select
当用户需要从一组同类数据中选择一个或多个时，可以使用下拉选择器，点击后选择对应项。

## 基础用法
`v-model` 的值为当前被选中的el-option的 `value` 属性值
::: demo 
select/basic
:::

## 禁用状态
选择器不可用状态,设置属性 `disabled` 即可
::: demo 
select/disabled
:::

## 可清空单选
设置 `clearable` 属性即可清空输入框
::: demo 
select/clearable
:::

## 有禁用选项
在 `bn-option` 中，设定 `disabled` 值为 `true`，即可禁用该选项
::: demo 
select/option-disabled
:::

## 多选
设置属性 `multiple` 即可。注意此时 `v-model` 要绑定是个 `数组` 的字段。
::: demo
select/multiple
:::


## 自定义模板
在bn-option中，设定默认插槽即可
::: demo 
select/option-default-slots
:::

## 模糊搜索
可以利用模糊搜索功能快速查找选项。通过添加 `filterable` 来启用过滤。`filter-method`自定义搜索方法，该方法必须是个函数，第一个参数是option实例对象代理，第二个参数是搜索关键词query，通过返回布尔值表示是否命中。
::: demo 
select/filterable
:::

## 远程搜索
输入关键字以从远程服务器中查找数据。此功能必须将 `filterable` 和 `remote` 设置为true，同时传入一个 `remote-method`。 remote-method为一个Function，它会在输入值发生变化时调用，参数为当前输入值。此时你可以拿到当前输入框的query,然后你在请求接口拿到数据后在渲染option。
::: demo 
select/remote
:::

## OptVmProxy
```js
export type ValueKey = string | number

export interface OptVmProxy {
  value: ValueKey
  label: string | number
  disabled: boolean
  currentLabel: string
  currentValue: ValueKey
  isSelected: boolean
  visible: boolean
  isHover: boolean
  hoverItem: () => void
  selectOptionClick: () => void
}

```

## API
## Select Attributes
|属性名|描述|类型|默认值|
|---|---|---|:---:|
|v-model|绑定值|`number \| string \| array`|`-`|
|multiple ^(alpha.30)|是否多选|`boolean`|`false`|
|disabled|是否禁用|`boolean` |`false`|
|clearable|是否可以清空选项|`boolean` |`false`|
|size|尺寸大小|`small \| default \| large \| default`|
|placeholder|提示文案|`string`|`请选择`|
|filterable ^(alpha.32)|是否开启模糊搜索|`boolean`|`false`|
|filter-method ^(alpha.32)|自定义筛选方法，返回的布尔值表示是否保留该选项|`(opt:OptVmProxy, query) => boolean`|`-`|
|remote ^(alpha.32)|是否从服务器远程加载|`boolean`|`false`|
|remote-method ^(alpha.32)|自定义远程搜索方法|`(query) => void `|`-`|
|loading|是否正在从远程获取数据|`boolean`|`false`|
|loading-text|正在加载文字|`string`|`-`|
|no-data-text|选项为空时显示的文字|`string`|`暂无数据`|
|popup-class|自定义弹出层类名|`string`|`-`|
|card|输入框卡片模式 [详情](/components/input.html#卡片输入框)|`boolean`|`-`|

## Select Events
|事件名|描述|函数类型|
|---|---|---|
|change|当绑定值变化时触发的事件|`(val) => void`|


## Select Slots
|name|描述|scoped|
|---|---|---|
|empty|无选项时的列表|-|


## Option Attributes
|属性名|描述|类型|默认值|
|---|---|---|:---:|
|label|选项的标签|`string`|`-`|
|value|选项的值|`string` |`-`|
|disabled|是否禁用|`boolean` |`false`|

## Option Slots
|name|描述|scoped|
|---|---|---|
|default|-|-|
