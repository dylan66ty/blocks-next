---
title: Form
lang: zh-CN
---

# 表单 Form
具有数据收集、校验和提交功能的表单，包含复选框、单选框、输入框、下拉选择框等元素。

## 基础表单
表单的基本用法
::: demo
form/basic
:::

## 行内表单
设置属性 `inline` 即可
::: demo 
form/inline
:::


## 对齐方式
设置属性 `label-position`即可。可选值 `left` `top` `right`
::: demo 
form/label-position
:::

## 表单验证 
Form 组件提供了表单验证的功能，只需为 `rules` 属性传入约定的验证规则，并将 `form-Item` 的 `prop` 属性设置为需要验证的特殊键值即可
::: demo 
form/validate
:::

## 内置自定义校验规则
提供自定义内置表单验证， `ruleItem` 中 `validator` 支持 `email｜url｜mobile｜chinese｜number`
::: demo 
form/built-in-validate
:::

## 自定义校验规则
使用自定义验证规则来完成密码的二次验证
::: demo 
form/custom-validate
:::


## 自定义字段验证
在一个表单中，可能需要分步骤校验表单字段。下面例子可能适合你。
::: demo 
form/validate-field
:::


## API
## Form Attributes
|属性名|描述|类型|默认值|
|---|---|---|:---:|
|model|表单数据对象|`Record<string,any>`|-|
|inline|行内表单|`boolean`|false|
|rules|表单验证规则|`Record<string,any>`|-|
|label-position|label位置|`left \| right \| top`|right|
|label-width|label长度|`string \| number`|-|
|validate-on-rule-change|是否在 rules 属性改变后立即触发一次验证|`boolean`|true|

## Form Methods
|方法名|说明|函数类型|
|---|---|---|
|validate|对整个表单的内容进行验证。 接收一个回调函数，或返回 Promise。|`(callback?: boolean) => Promise<void>`|
|resetFields|重置该表单项，将其值重置为初始值，并移除校验结果|`(props?:[]) => void`|
|validateField|验证具体的某个字段。|`(props?:[]) => Promise<void>`|
|clearValidate	|清理某个字段的表单验证信息。	|`(props?:[]) => void`|


## FormItem Attributes
|属性名|描述|类型|默认值|
|---|---|---|:---:|
|prop|model 的键名, 它可以是一个路径`a.b[0]`,表单验证这个属性必传|`string`|-|
|label|标签文本|`string`|-|
|label-width|label长度,优先级高于form上的label-width| `string \| number`|-|
|required|是否为必填项。设置此属性单个form-item会合并新的校验规则|`boolean`|-|
|rules|表单验证规则, 注意这里必须配置为`array`格式,会与form上的rules进行合并|`array`|-|
 
 ## FormItem Slots
|名称|描述|scoped|
|---|---|---|
|default|表单的内容|-|
|label|标签位置显示的内容|-|
|error|验证错误信息的显示内容|-|

