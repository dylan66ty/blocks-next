---
title: Cascader
lang: zh-CN
---

# 级联选择 Cascader
指在选择器选项数量较多时，采用多级分类的方式将选项进行分隔。

## 基本使用
:::tip 
级联选择器，支持 `v-model` 双向绑定，必须传入一个数组。多选必须传入二维数组。
:::
::: demo 级联选择器的基本用法。
cascader/basic
:::

## 允许清除
::: demo 设置 `clearable` 属性即可
cascader/clearable
:::


## 多选
::: demo 设置 `multiple` 属性即可
cascader/multiple
:::

## 自定义输入框的展示值
::: demo 利用 `inputLabelFormat` 函数对显示的内容进行自定义处理。
cascader/inputLabelFormat
:::

## 禁用选项
::: demo 指定 option 的 `disabled` 为 true，可以禁用该选项。
cascader/option-disabled
:::

## 是否开启Footer
::: warning
注意：该属性只在多选模式中生效。
:::
::: demo 设置 `showFooter` 属性即可。
cascader/footer
:::

## 自定义节点内容
::: demo 你可以通过 scoped slot 自定义节点的内容。 您可以访问 scope 中的 node 和 data 属性，分别表示当前节点的 Node 对象和当前节点的数据。
cascader/custom-node-value
:::
