# 开始

## 开发环境

首先得有 node，并确保 node 版本是 v16 或以上。

``` sh
node -v
# v16+
```

## 使用

- 安装依赖
``` sh
pnpm install blocks-next
```



- 在vue项目中注册block-next

```js

// main.ts
import BlocksNext, {Icon} from blocks-next
// 引入BlocksNext样式
import 'blocks-next/theme-default/index.css'

// 注册BlocksNext组件库
app.use(BlocksNext)
// 注册BlocksNext图标
app.use(Icon) 

```


