# npm 常用命令与 API 快速总结（便捷参考）

## 初始化与配置
- npm init -y  
  快速生成 package.json（交互式用 `npm init`）。
- npm config set <key> <value>  
  设置 npm 配置（registry、proxy、cache 等）。例：`npm config set registry https://registry.npm.taobao.org`

## 安装与卸载
- npm install <pkg>@<version> (-S / --save)  
  安装到 dependencies（本地项目）。例：`npm install lodash --save`
- npm i <pkg> -D / --save-dev  
  安装到 devDependencies。例：`npm i jest -D`
- npm install (无参数)  
  根据 package.json 和 package-lock.json 安装依赖（CI 环境用 npm ci 更快更可靠）。
- npm uninstall <pkg>  
  卸载并移除 package.json 中对应依赖。
- npm update <pkg>  
  更新包（遵循 semver 规则，可能修改 package-lock）。

## 锁文件与 CI
- npm ci  
  基于 package-lock.json 的干净安装（更适合 CI，速度快且可复现）。
- package-lock.json / npm-shrinkwrap.json  
  锁定依赖树，保证可复现安装。

## 版本与 SemVer
- npm version <patch|minor|major|x.y.z>  
  修改 package.json 版本并提交 tag。例：`npm version patch`
- 语义化版本：MAJOR.MINOR.PATCH

## 发布与私服
- npm login / npm logout  
  登录 / 登出 registry。
- npm publish --access public|restricted  
  发布包到 registry（私有仓库或 npmjs）。
- npm publish --dry-run  
  先模拟发布，检查文件列表。
- npm pack  
  打包当前模块为 .tgz 文件（可用于本地测试安装）。

## 权限与发布管理
- npm owner add <user> <pkg>  
  添加包的维护者。
- npm access public|restricted <pkg>  
  修改包访问权限。
- npm dist-tag add <pkg>@<version> <tag>  
  添加分发标签（如 latest / beta）。

## 查询与调试
- npm view <pkg> [field]（或 npm info）  
  查询包元数据。例：`npm view react version`
- npm ls [pkg]  
  列出依赖树（本地或全局用 -g）。
- npm outdated  
  显示可更新的依赖。
- npm audit / npm audit fix  
  安全审计并尝试自动修复漏洞。

## 脚本与运行
- package.json scripts  
  在 scripts 中定义脚本，运行 `npm run <script>`。标准脚本：start、test、build、prepublishOnly 等。
- npm run <script> -- <args>  
  传参给脚本。

示例 package.json 脚本：
```json
{
  "scripts": {
    "start": "node server.js",
    "build": "webpack --mode production",
    "test": "jest"
  }
}
```

## 全局安装与执行
- npm install -g <pkg>  
  全局安装命令行工具（如 eslint、http-server）。
- npx <pkg> [args]  
  临时执行本地或远程包（无需全局安装），适合一次性脚本或脚手架。

## 缓存、清理与性能
- npm cache verify  
  验证并清理缓存（推荐）。
- npm cache clean --force  
  强制清理缓存（慎用）。
- npm dedupe  
  尝试去重 node_modules 中的依赖，减少重复包。

## 常用标志（速记）
- --save-prod / --no-save：控制是否写入 package.json  
- --save-exact：保存精确版本（不使用 ^ 或 ~）  
- --legacy-peer-deps / --force：解决安装冲突（谨慎使用）

## 与私服/镜像
- 常见私服：Verdaccio、Nexus、Artifactory；切换 registry：`npm config set registry <url>`
- 使用镜像加速：国内常用淘宝镜像（已迁移到 npmmirror）。

## 自动化与脚本调用
- 在 CI 中常用：`npm ci`、`npm run build`、`npm publish`（结合 secrets 做认证）
- 可用 Node 直接调用子进程执行 npm：`child_process.exec('npm install', cb)`

## 小贴士
- 开发环境推荐使用 `npm ci` 保证可复现；本地开发用 `npm install` 方便添加包。  
- 使用 `npm audit` 定期检查安全问题。  
- 发布前用 `npm pack` 和 `npm publish --dry-run` 检查要发布的文件。  
- 优先在 package.json scripts 中封装常用命令，统一团队约定。

---
如需我把上述内容写入当前笔记文件或生成常用命令的脚本示例（例如 CI 示例、npm publish 自动化脚本），告诉我文件路径或需要的示例类型。