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

<p align="center">A Vue 3 Component Library</p>
<p align="center"><b>Uses TypeScript, Simple API design, Fast</b></p>
<p align="center">English | <a href="README.zh-CN.md">简体中文</a></p>


## Intro

Blocks Next is an enterprise-level component library developed based on `Vue3`, fully embracing the` Vue3` ecosystem. It aims to provide components that are easy to grasp and use, with out-of-the-box functionality. It is designed to operate smoothly within the [`wujie`](https://github.com/Tencent/wujie) sub-application, ensuring stable performance.

## Documentation

<a href="https://dylan66ty.github.io/blocks-next/">document</a>

## Features

- 🚀 Provide 30+ high quality general purpose components
- 🚀 Based on Vue 3, fully utilizing all Vue 3 features
- 🔥 Written in TypeScript with predictable static types.
- 💡 Code highlighting in VSCode is supported
- 💪 Developed by Chinese programmers, with comprehensive documentation and support
- ✊ Ongoing component improvements



## Install

## Webpack / Vite

```shell
# Install with npm or yarn or pnpm

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
// Import Blocks Next and Icon 
import BlocksNext, {Icon} from 'blocks-next'
// Import Blocks Next style
import 'blocks-next/theme-default/index.css'
// Register component and icon libraries
createApp(App).use(BlocksNext).use(Icon).mount('#app')

```

## Environment Support

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/electron/electron_48x48.png" alt="Electron" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>Electron |
| --- | --- | --- | --- | --- |
| Edge | last 2 versions | last 2 versions | last 2 versions | last 2 versions |



## Technology stack
- Package management: pnpm workspace
- Component code: TypeScript、Vue SFC（Vue Single-File Components）
- Style: Scss、CSS var
- Unit test: Jest、Vitest [Continuous improvement]
- Build：Rollup、esbuild、TypeScript、Gulp
- Code specification: ESLint、Prettier
- Submission specification: Commitizen、Commitlint、Husky
- Automatic deployment: GitHub Actions

## Thanks to our contributors for their efforts

<a href="https://github.com/dylan66ty/blocks-next/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=dylan66ty/blocks-next&t=1" />
</a>
