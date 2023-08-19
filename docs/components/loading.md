---
title: Loading
lang: zh-CN
---

# 按钮 Loading
加载数据时显示动效

## 区域加载
在需要的时候展示加载动画，防止页面失去响应提高用户体验。这里提供了两种调用 Loading 的方法：指令和控制器。 对于自定义指令 v-bn-loading，只需要绑定 boolean 值即可
::: demo 
loading/basic
:::


## 自定义加载中组件内容
你可以自定义加载中组件的文字，图标大小，以及背景颜色。通过`bn-loading-text`属性自定义加载文字。通过`bn-loading-background`属性自定义加载背景。通过`bn-loading-iconSize`属性自定义图标大小。通过`bn-loading-color`属性自定义字体颜色。
::: demo 
loading/custom
:::


## 让加载组件铺满整个屏幕
加载数据时显示全屏动画。当使用指令方式时，全屏遮罩需要添加fullscreen修饰符（遮罩会插入至 body 上）。默认隐藏滚动条。需要注意的是，以`open`的方式调用的全屏 Loading 是单例的。 若在前一个全屏 Loading 关闭前再次调用全屏 Loading，并不会创建一个新的 Loading 实例，而是返回现有全屏 Loading 的实例。
::: demo 
loading/fullScreen
:::


## API
## Open Options
|名称|说明|类型|默认|
|---|---|---|---|
|text|显示在加载图标下方的加载文案|`string`|-|
|background|加载中背景颜色|`string`|rgba(255,255,255,0.7)|
|color|加载字体颜色|`string`|-|
|iconSize|加载图标大小|`number \| string`|16|
|customClass|Loading 的自定义类名|`string`|-|
|target|Loading 需要覆盖的 DOM 节点。 可传入一个 DOM 对象或字符串|`string \| HTMLElement`|body|

## 指令
|名称|说明|类型|
|---|---|---|
|v-bn-loading|是否显示动画|`boolean`|
|bn-loading-text|显示在加载图标下方的加载文案|`string`|
|bn-loading-background|加载中背景颜色|`rgba(255,255,255,0.7)`|
|bn-loading-color|加载字体颜色|`string`|
|bn-loading-iconSize|加载图标大小|`string`|
|bn-loading-customClass|Loading 的自定义类名|`-`|













