# 升级指南

## 打开命令行执行 `pnpm install blocks-next@latest` 即可
``` shell 
pnpm install blocks-next@latest
```
## 无法安装最新blocks-next
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



