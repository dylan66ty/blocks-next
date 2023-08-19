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
通过 `color` 属性设置图标颜色 

通过 `size` 属性设置图标的大小

通过 `rotate` 属性使图标旋转角度

通过 `spin` 属性使图标转圈

:::warning
业务图标暂时不支持通过 color 属性来设置图标的颜色
:::
:::demo 
icon/use
:::

## API
## Attributes
|属性名|描述|类型|默认值|
|---|---|---|:---:|
|size|大小|`number \| string`|-|
|color|颜色|`string`|-|
|rotate|旋转角度|`number`|0|
|spin|转圈|`boolean`|false|








