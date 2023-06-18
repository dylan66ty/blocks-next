# 升级指南

## 安装最新版本
- 第一步，先卸载
``` shell 
pnpm uninstall blocks-next
```
- 第二步，安装最新版本
``` shell 
pnpm install blocks-next@latest
```
## 无法安装最新版本
**查看npm镜像源**
```shell
npm config get registry
```
**切换到npm官方源**
```shell
npm config set registry https://registry.npmjs.org/
```
**安装最新blocks-next**
```shell
pnpm install blocks-next@latest
```
## npm镜像切换工具
- [nrm](https://www.npmjs.com/package/nrm)

- [yrm](https://www.npmjs.com/package/yrm)



