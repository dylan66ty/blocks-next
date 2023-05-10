---
title: Button
lang: zh-CN
---

# 图标 Icon
:::demo
icon/basic-hide-code
:::

## 基础使用
```ts
// main.ts
import {Icon} from 'blocks-next';
app.use(Icon);
```

```vue 
<template>
  <bn-icon-search />
</template>
```


## 属性示例
:::demo 颜色 `color` 大小`size` 旋转角度`rotate` 转圈`spin`
icon/use
:::

## Attributes
|参数名|描述|类型|默认值|
|---|---|---|:---:|
|`size`|大小|`number \| string`|`-`|
|`color`|颜色|`string`|`-`|
|`rotate`|旋转角度|`number`|`0`|
|`spin`|转圈|`boolean`|`false`|








