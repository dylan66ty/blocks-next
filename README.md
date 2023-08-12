<p align="center">
  <img width="200" src="https://dylan66ty.github.io/blocks-next/blocks-next-logo.svg">
</p>



<p align="center">基于vue3的UI组件库</p>


## 介绍
Blocks Next 是一个基于 `Vue3` 开发的PC端组件库，全面拥抱 `Vue3` 生态。实现更简单易上手的组件，开箱即用。弹出层所有相关组件支持在 [`wujie(无界)`](https://github.com/Tencent/wujie) 下使用，不会出现位置偏差问题。

## 文档
[中文文档](https://dylan66ty.github.io/blocks-next/)

## 特性
- 🚀 基于vue3，支持vue3全部特性
- 🔥 所有组件都是用 TypeScript 编写的，所以天然的类型友好
- 📚 组件丰富，包含按钮、表单、布局、数据展示、反馈、图标、其他等
- 💪 由国人开发，完善的中文文档和后勤保障
- 💡 支持 VSCode 组件属性提示
- 📦 支持按需加载，体积小，只有需要的组件才会被打包
- 📖 组件文档清晰
- 💪 组件持续完善

## 安装

## Webpack / Vite

```shell
# 通过 npm 或 yarn 或 pnpm 安装

# npm
npm i blocks-next

# yarn
yarn add blocks-next

# pnpm 【推荐】
pnpm add blocks-next
```

```ts
import App from './App.vue'
import { createApp } from 'vue'
// 引入blocks-next组件库
import BlocksNext, {Icon} from 'blocks-next'
// 引入BlocksNext样式
import 'blocks-next/theme-default/index.css'

// 注册组件和图标库
createApp(App).use(BlocksNext).use(Icon).mount('#app')

```

## 浏览器兼容性

| [<img src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/08095282566ac4e0fd98f89aed934b65.png~tplv-uwbnlip3yd-png.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>IE / Edge | [<img src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/40ad73571879dd8d9fd3fd524e0e45a4.png~tplv-uwbnlip3yd-png.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Firefox | [<img src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/4f59d35f6d6837b042c8badd95871b1d.png~tplv-uwbnlip3yd-png.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Chrome | [<img src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/eee2667f837a9c2ed531805850bf43ec.png~tplv-uwbnlip3yd-png.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Safari | [<img src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3240334d3967dd263c8f4cdd2d93c525.png~tplv-uwbnlip3yd-png.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Opera | [<img src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/f2454685df95a1a557a61861c5bec256.png~tplv-uwbnlip3yd-png.png" alt="Electron" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Electron |
| --------- | --------- | --------- | --------- | --------- | --------- |
| Edge 16| 31| 49 | 31 | 36 | last 2 versions |



## 项目架构
- 包管理：pnpm workspace
- 组件代码：TypeScript、Vue SFC（Vue 单文件组件）
- 样式：Scss、CSS var
- 单元测试：Jest、Vitest 【后续完善中】
- 构建：Rollup、esbuild、TypeScript、Gulp
- 代码风格：ESLint、Prettier
- 代码提交：Commitizen、Commitlint、Husky

## 感谢贡献者们做出的努力

<a href="https://github.com/dylan66ty/blocks-next/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=dylan66ty/blocks-next&t=1" />
</a>
