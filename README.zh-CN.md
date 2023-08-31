<p align="center">
  <img width="200" src="https://dylan66ty.github.io/blocks-next/blocks-next-logo.svg">
</p>
<p align="center">
  <a href="https://www.npmjs.com/package/blocks-next">
    <img src="https://img.shields.io/npm/v/blocks-next.svg">
  </a>
  <a href="https://vuejs.org">
    <img src="https://img.shields.io/badge/vue-v3.2.0%2B-%23407fbc" alt="vue">
  </a>
  <a href="https://github.com/dylan66ty/blocks-next">
    <img src="https://img.shields.io/badge/node-%20%3E%3D%2016-47c219" />
  </a>
  <a href="https://npmcharts.com/compare/blocks-next?minimal=true">
    <img src="https://img.shields.io/npm/dm/blocks-next.svg" />
  </a>
</p>

<p align="center">基于vue3的UI组件库</p>
<p align="center"><b>使用 TypeScript，简洁的 API 设计，快</b></p>
<p align="center"><a href="README.md">English</a> | 中文</p>


## 介绍
Blocks Next 是基于 `Vue3` 开发的企业级组件库，全面拥抱 `Vue3` 生态。实现更简单易上手的组件，开箱即用。可以在[`wujie`](https://github.com/Tencent/wujie)子应用中稳定运作。

## 文档

<a href="https://dylan66ty.github.io/blocks-next/">文档</a>

## 特性

- 🚀 提供 30+ 个高质量通用组件
- 🚀 基于vue3，支持vue3全部特性
- 🔥 使用 TypeScript 开发，提供完整的类型定义文件。
- 💡 支持 VSCode 中代码高亮
- 💪 由国人开发，完善的文档和后勤保障
- ✊ 组件持续完善


## 安装

## Webpack / Vite

```shell
# 通过 npm 或 yarn 或 pnpm 安装

# npm
npm i blocks-next

# yarn
yarn add blocks-next

# pnpm
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

## 兼容环境

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/electron/electron_48x48.png" alt="Electron" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>Electron |
| --- | --- | --- | --- | --- |
| Edge | last 2 versions | last 2 versions | last 2 versions | last 2 versions |


## 技术栈
- 包管理：pnpm workspace
- 组件代码：TypeScript、Vue SFC（Vue 单文件组件）
- 样式：Scss、CSS var
- 单元测试：Jest、Vitest 【后续完善中】
- 构建：Rollup、esbuild、TypeScript、Gulp
- 代码规范：ESLint、Prettier
- 提交规范：Commitizen、Commitlint、Husky
- 自动部署：GitHub Actions

## 感谢贡献者们做出的努力

<a href="https://github.com/dylan66ty/blocks-next/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=dylan66ty/blocks-next&t=1" />
</a>
