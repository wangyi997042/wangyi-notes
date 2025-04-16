
# **npm、nrm 和 nvm 常用命令**

---

## **1. npm 常用命令**

### **1.1 npm 配置相关**
- `npm config list -l` 查看 npm 的配置。
- `npm config get/set registry` 设置或获取 npm 的镜像源。
  - 示例: `npm config set registry http://registry.npmjs.org`
- `npm config set/get username "your-username"` 设置或获取用户名。
- `npm config set/get email "your-email@example.com"` 设置或获取邮箱。

---

### **1.2 npm 包管理**
- `npm search <搜索词> [-g]` 搜索 npm 仓库。
- `npm list -g --depth 0` 列出全局安装的模块（`--depth 0` 表示不显示依赖）。
- `npm update <name> [-g]` 升级当前项目或全局的指定模块。
  - 示例: `npm update express -g`
- `npm update` 升级本地库到最新版本。

---

### **1.3 npm 链接依赖**
- `npm link [<@scope>/]<pkg>[@<version>]` 引用依赖（全局安装的包在项目中引用）。
  - 示例: `npm link gulp gulp-ssh gulp-ftp`
- `npm unlink <pkg>` 解除引用。
  - 示例: `npm unlink gulp`

---

### **1.4 npm 版本管理**
- `npm version [<newversion> | major | minor | patch | premajor | preminor | prepatch | prerelease [--preid=<prerelease-id>] | from-git]` 增加版本号。
  - 示例: `npm version prerelease --preid=alpha`
- `npm show <packagename> versions` 显示包的所有版本号。

---

### **1.5 npm 常用命令补充**
- **安装指定版本的包**:
  ```bash
  npm install <package-name>@<version>
  ```
  示例:
  ```bash
  npm install express@4.17.1
  ```
  **作用**: 安装指定版本的依赖包。

- **卸载包**:
  ```bash
  npm uninstall <package-name>
  ```
  示例:
  ```bash
  npm uninstall express
  ```
  **作用**: 卸载项目中的依赖包。

- **清理缓存**:
  ```bash
  npm cache clean --force
  ```
  **作用**: 清理 npm 的缓存，解决某些安装问题。

- **查看包的依赖树**:
  ```bash
  npm ls
  ```
  **作用**: 查看当前项目的依赖树。

---

## **2. nvm 安装与常用命令**

### **2.1 Windows 安装**
1. 访问 [nvm-windows GitHub](https://github.com/coreybutler/nvm-windows/releases) 下载 exe 文件。
2. 安装路径中不要包含空格。
3. 安装完成后，使用 `nvm` 命令测试。
4. 必须先安装 nvm，再安装 Node.js，否则可能找不到 Node.js 版本。

---

### **2.2 macOS 安装**
1. 删除本地的 Node.js：
   ```bash
   sudo rm -rf /usr/local/lib/node_modules
   sudo rm /usr/local/bin/node
   ```
2. 查看本地安装的包：
   ```bash
   npm ls -g --depth=0
   ```
3. 按照 [nvm 官方文档](https://github.com/nvm-sh/nvm/blob/master/README.md) 安装。

---

### **2.3 nvm 常用命令**
- `nvm install stable` 安装最新稳定版 Node.js。
- `nvm install <version>` 安装指定版本（如 `nvm install v4.4.0`）。
- `nvm uninstall <version>` 删除已安装的指定版本。
- `nvm use <version>` 切换使用指定的 Node.js 版本。
- `nvm ls` 列出所有安装的版本。
- `nvm alias default <version>` 设置默认版本（如 `nvm alias default v11.1.0`）。
- `nvm version` 查看当前使用的版本。
- `nvm current` 显示当前版本。
- `nvm ls-remote` 查看所有可安装版本。
- `nvm ls-remote --lts` 查看所有可安装的长期支持版。

---

### **2.4 nvm 常见问题**
- **问题**: 使用 `nvm` 切换 Node.js 版本后，npm 命令不可用。
  **解决方法**:
  ```bash
  nvm install-latest-npm
  ```
  **作用**: 安装与当前 Node.js 版本兼容的最新 npm。

- **问题**: macOS 上 `nvm` 安装后命令不可用。
  **解决方法**:
  1. 确保在 `~/.bashrc` 或 `~/.zshrc` 文件中添加了以下内容：
     ```bash
     export NVM_DIR="$HOME/.nvm"
     [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
     ```
  2. 重新加载配置文件：
     ```bash
     source ~/.zshrc
     ```

---

## **3. nrm 安装与常用命令**

### **3.1 nrm 安装**
1. 安装好 nvm 和 Node.js 后，直接运行以下命令安装 nrm：
   ```bash
   npm i nrm -g
   ```
2. 如果安装报错，运行以下命令重新安装：
   ```bash
   npm install -g nrm open@8.4.2 --save
   ```

---

### **3.2 nrm 常用命令**
- `nrm ls` 列出可选的源。
- `nrm use <registry>` 切换源。
- `nrm add <registry> <url>` 添加源。
- `nrm del <registry>` 删除源。
- `nrm test` 测试所有源的速度。
- `nrm test <registry>` 测试指定源的速度。

---

### **3.3 常用镜像源**
- 官方源:
  ```plaintext
  https://registry.npmjs.org/
  ```
- 淘宝源:
  ```plaintext
  https://registry.npmmirror.com/
  ```
- Yarn 源:
  ```plaintext
  https://registry.yarnpkg.com/
  ```

---

### **3.4 切换镜像源的注意事项**
- 切换镜像源后，建议运行以下命令测试是否生效：
  ```bash
  npm config get registry
  ```
  输出结果应为切换后的镜像地址。

---

### **3.5 nrm 安装报错问题**

#### **报错 1**
```plaintext
/Users/xxx/.nvm/versions/node/v16.20.0/lib/node_modules/nrm/cli.js:9
const open = require('open');
^

Error [ERR_REQUIRE_ESM]: require() of ES Module /Users/xxx/.nvm/versions/node/v16.20.0/lib/node_modules/nrm/node_modules/open/index.js from /Users/xxx/.nvm/versions/node/v16.20.0/lib/node_modules/nrm/cli.js not supported.
Instead change the require of index.js in /Users/xxx/.nvm/versions/node/v16.20.0/lib/node_modules/nrm/cli.js to a dynamic import() which is available in all CommonJS modules.
```

**解决方法**:
运行以下命令重新安装：
```bash
npm i -g nrm open@8.4.2 --save
```

---

#### **报错 2**
!nrm报错

**解决方法**:
1. 根据报错的文件地址，打开 `cli.js` 文件。
2. 找到第 17 行，将以下代码：
   ```javascript
   const NRMRC = path.join(process.env.HOME, '.nrmrc');
   ```
   修改为：
   ```javascript
   const NRMRC = path.join(process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'], '.nrmrc');
   ```
3. 保存文件后重新执行命令，即可解决问题。

---

## **4. 常见问题补充**

### **4.1 npm 安装速度慢**
**解决方法**:
1. 切换到国内镜像源（如淘宝源）：
   ```bash
   npm config set registry https://registry.npmmirror.com/
   ```
2. 使用 `nrm` 切换源：
   ```bash
   nrm use taobao
   ```

---

### **4.2 nvm 切换版本后全局包丢失**
**原因**: 不同版本的 Node.js 使用独立的全局包目录。
**解决方法**:
- 在切换版本后，重新全局安装需要的包：
  ```bash
  npm install -g <package-name>
  ```

---

## **5. 其他工具推荐**
- **pnpm**:
  - **作用**: 高效的包管理工具，安装速度更快，占用空间更小。
  - **安装**:
    ```bash
    npm install -g pnpm
    ```
  - **常用命令**:
    ```bash
    pnpm install
    pnpm add <package-name>
    pnpm remove <package-name>
    ```

- **yarn**:
  - **作用**: Facebook 开发的包管理工具，支持并行安装，速度更快。
  - **安装**:
    ```bash
    npm install -g yarn
    ```
  - **常用命令**:
    ```bash
    yarn add <package-name>
    yarn remove <package-name>
    yarn install
    ```

---
