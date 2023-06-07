# 升级blocks-next到最新版本

## 打开命令行执行 `pnpm install blocks-next@latest` 即可
``` bash 
pnpm install blocks-next@latest
```
## 无法安装最新blocks-next
- 1.查看npm镜像源
```bash
npm config get registry
```
- 2.切换到npm官方源
```bash
npm config set registry https://registry.npmjs.org/
```
- 3.安装最新blocks-next
```bash
pnpm install blocks-next@latest
```
## npm镜像切换工具
- [nrm](https://www.npmjs.com/package/nrm)
- [yrm](https://www.npmjs.com/package/yrm)



