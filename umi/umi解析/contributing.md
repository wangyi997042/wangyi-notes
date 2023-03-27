import { Message } from 'wdmjs';

# 参与贡献

## 环境准备

### Node.js 和 pnpm

开发 Wdm 需要 Node.js 16+ 和 `pnpm` v7.

推荐使用 [nvm](https://github.com/nvm-sh/nvm) 管理 Node.js，避免权限问题的同时，还能够随时切换当前使用的 Node.js 的版本。

在 `pnpm` 的[官网](https://pnpm.io/installation)选择一种方式安装即可。

### Clone 项目

```bash
$ git@git.baoyun.ltd:iyunbao/frontend/tools/wdmjs.git

$ cd wdmjs
```

### 安装依赖并构建

```bash
$ pnpm i && pnpm build
```

## 开发 Wdm

### 启动 dev 命令

本地开发 Wdm 必开命令，用于编译 `src` 下的 TypeScript 文件到 `dist` 目录，同时监听文件变更，有变更时增量编译。

```bash
$ pnpm dev
```

如果觉得比较慢，也可以只跑特定 package 的 `pnpm dev` 命令，比如。

### 跑 Example

```bash
$ cd examples/library
$ pnpm dev
```

## 贡献 Wdm 文档

Wdm 的文档由 wdmjs@1 和 `@wdm/preset-docs` 插件实现，本质上就是一个 `Wdm` 项目。在根目录执行如下命令即可开始 `Wdm` 文档的开发：

```bash
# 启用 Wdm 文档开发
# 首次启动时编译耗时较长，请耐心等待
$ pnpm doc:dev
```

打开指定的端口号，即可实时查看文档更新的内容，以及 `@wdm/preset-docs` 插件开发的成果。

### 写 Wdm 文档

Wdm 文档的编写基于 MDX 格式。MDX 是 Markdown 格式的拓展，允许您在撰写 Wdm 文档时插入 JSX 组件。

<Message type="success">
撰写 **文档（Document）** 时，可用的组件可以在 `packages/preset-docs/client/theme-doc/components` 目录下找到。写 **API平台** 时，可用的组件可以在 `packages/preset-docs/client/theme-blog/components` 目录下找到。
</Message>

在根目录执行如下命令可以格式化仓库中已有的 Wdm 文档：

```bash
$ pnpm doc:format
```

格式化文档后，建议**_仅提交您撰写或修改的 Wdm 文档_**。不同文档贡献者的写作风格有一定的差异，格式化以后不一定能保留原来期望的样式。

### 打包 Wdm 文档

在根目录执行如下命令可以构建 Wdm 文档：

```bash
$ pnpm doc:build
```

## 更新依赖

执行 `pnpm dep:update` 可更新依赖。

```bash
$ pnpm dep:update
```

由于 Wdm 有针对依赖做预打包处理，更新依赖后还需检查更新的依赖是否为 devDependencies 并且有对此做依赖预打包。如果有，需要在对应 package 下执行 `pnpm build:deps` 并指定依赖，用于更新预打包的依赖文件。

```bash
$ pnpm build:deps --dep webpack
```

## 发布

只有 Core Maintainer 才能执行发布。

```bash
$ pnpm release
```
