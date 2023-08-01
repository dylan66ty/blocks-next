---
title: Icon
lang: zh-CN
---

# 图标 Icon
:::demo
icon/basic-hide-code
:::

## 使用
```ts
// main.ts
// 全局注册
import {Icon} from 'blocks-next';
app.use(Icon);
```

```vue
// 单个引入 1.0.1-alpha.33 支持
import { BnIconSearch } from 'blocks-next'

<template>
  <bn-icon-search />
</template>
```




## 属性示例
:::demo 颜色 `color` 大小`size` 旋转角度`rotate` 转圈`spin`
icon/use
:::

## Attributes
|参数名|描述|可选值|默认值|
|---|---|---|:---:|
|size|大小|`number` / `string `  |`-`|
|color|颜色|`string`|`-`|
|rotate|旋转角度|`number`|`0`|
|spin|转圈|`boolean`|`false`|








