---
title: Pagination
lang: zh-CN
---

# 分页 Pagination
采用分页控制单页内的信息数量，也可进行页面跳转

## 基础用法
当数据量过多时，使用分页分解数据
::: demo 
pagination/basic
:::

## 可选择页面大小
设置`page-sizes`属性即可
::: demo 
pagination/sizes
:::


## 跳转
在属性`layout`添加`jumper`即可
::: demo 
pagination/jumper
:::

## 完整功能
pagination完整功能
::: demo 
pagination/full
:::


## API
## Attributes
|属性名|描述|类型|默认值|
|---|---|---|:---:|
|page-config|分页器控制对象,page:当前页，pageSize:页面大小，total:数据总条数|`{page:number,pageSize:number,total:0}`|必填|
|page-sizes|每页显示个数选择器的选项设置|`number[]`|[10,20,30]|
|layout|组件布局，子组件名用逗号分隔|`total, prev, pager, next, sizes, jumper`|prev, pager, next|



## Events
|name|描述|函数类型|
|---|---|---|
|page-change|Page 改变时会触发|`(page:number) => void`|
|page-size-change|pageSize 改变时会触发|`(page:Number) => void`|
|prev|点击上一页按钮触发|`(page:Number) => void`|
|next|点击下一页按钮触发|`(page:Number) => void`|





