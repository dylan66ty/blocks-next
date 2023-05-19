---
title: Dialog
lang: zh-CN
---

# 通知框 Dialog

## 基本用法
::: demo  设置`v-model`绑定即可
dialog/basic
:::

## 弹窗大小
::: demo 设置属性`width/minWidth`和`height/minHeight`即可
dialog/size
:::

## 关闭前验证
::: demo 设置属性**onBeforeCancel**为函数即可，该函数返回`boolean`或者是个`promise`。`true`表示可以关闭，`false`表示不可以关闭。
dialog/before-cancel
:::

## 居中
::: demo 设置属性**center**即可
dialog/center
:::

## 顶部距离
::: demo 设置属性**top**即可，top可以是 `number` / `string`
dialog/top
:::

## 全屏
::: demo 设置属性**fullscreen**即可
dialog/fullscreen
:::