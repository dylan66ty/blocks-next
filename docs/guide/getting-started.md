# 快速开始

## 开发环境

首先得有 node，并确保 node 版本是 `v16` 或以上。

``` shell
# v16+
node --version
```

## 使用

**安装blocks-next**

``` shell
pnpm install blocks-next
```



**在vue3项目中注册block-next**

```ts
// main.ts
import BlocksNext, {Icon} from blocks-next
// 引入BlocksNext样式
import 'blocks-next/theme-default/index.css'

// 注册BlocksNext组件库
app.use(BlocksNext)
// 注册BlocksNext图标库
app.use(Icon) 

```




