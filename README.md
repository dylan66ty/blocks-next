### 组件库开发方案


#### 技术栈
- 主流技术
- vue3
- typescript
- vitepress 
- rollup 
- gulp
- vite
- scss 

#### 主要项目结构

- build 
   - umd esm（打两种包，方便不同的项目使用）
   - sass转换成css（rollup将sass语法转换成浏览器可识别的css文件）
   - 生成dts文件 (用于组件的类型提示，方便其他开发者使用)
   - package.json
- docs（组件文档）
   - vitepress 快速搭建组件文档
   - package.json 
- effect （项目演示）
   - vite搭建vue3项目（快速冷启动）
   - package.json   
- packages （组件核心）
  - components （组件都在这里）
    - button
    - Icon
    - ...
    - index.ts
  - theme-default（组件样式统一管理）
    - buttons.scss
    - icon.scss
    - ... 
    - index.scss
  - package.json  


#### 包管理工具
- pnpm 
- monorepo 
    - packages
    - docs
    - effect
    - build


#### 项目启动
- 文档开发: pnpm run docs:dev
- 组件开发（预览）: pnpm run dev



#### 开发计划
- form表单
- table
- radio
- switch

