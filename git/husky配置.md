
# **Husky 傻瓜式操作说明文档**

Husky 是一个 Git Hook 工具，可以在 Git 操作（如 `commit` 或 `push`）时触发自定义脚本，常用于代码质量检查（如 lint 检查、测试等）。

---

## **1. 安装 Husky**

### **1.1 初始化项目**
确保项目已经初始化为一个 Git 仓库，并且有 package.json 文件。如果没有，运行以下命令：
```bash
git init
npm init -y
```

---

### **1.2 安装 Husky**
运行以下命令安装 Husky：
```bash
npm install husky --save-dev
```

---

### **1.3 启用 Husky**
运行以下命令启用 Husky：
```bash
npx husky install
```
**作用**: 这会在项目根目录下创建一个 `.husky/` 文件夹，用于存放 Git Hook 脚本。

---

### **1.4 添加 Husky 到 package.json**
为了确保 Husky 在安装依赖时自动启用，可以在 package.json 中添加以下脚本：
```json
{
  "scripts": {
    "prepare": "husky install"
  }
}
```
**作用**: 每次运行 `npm install` 时，Husky 会自动安装。

---

## **2. 配置 Git Hook**

### **2.1 添加 Hook**
使用以下命令添加一个 Git Hook（如 `pre-commit`）：
```bash
npx husky add .husky/pre-commit "npm test"
```
**作用**: 这会在 `.husky/` 文件夹中创建一个 `pre-commit` 文件，并添加 `npm test` 命令。

---

### **2.2 常用 Hook**
以下是一些常用的 Git Hook：
- **`pre-commit`**: 在执行 `git commit` 之前运行。
- **`commit-msg`**: 在提交信息被保存之前运行。
- **`pre-push`**: 在执行 `git push` 之前运行。

#### **示例：配置 `pre-commit`**
```bash
npx husky add .husky/pre-commit "npm run lint"
```
**作用**: 在每次提交代码之前运行 `npm run lint` 检查代码。

#### **示例：配置 `commit-msg`**
```bash
npx husky add .husky/commit-msg "npx commitlint --edit $1"
```
**作用**: 在提交信息被保存之前运行 `commitlint` 检查提交信息格式。

---

## **3. 配合 lint-staged 使用**

Husky 通常与 `lint-staged` 配合使用，以便只检查被修改的文件。

### **3.1 安装 lint-staged**
```bash
npm install lint-staged --save-dev
```

### **3.2 配置 lint-staged**
在 package.json 中添加以下配置：
```json
{
  "lint-staged": {
    "*.js": "eslint --fix"
  }
}
```
**作用**: 每次提交时，`lint-staged` 会自动修复被修改的 `.js` 文件。

### **3.3 配置 Husky 调用 lint-staged**
运行以下命令：
```bash
npx husky add .husky/pre-commit "npx lint-staged"
```
**作用**: 在 `pre-commit` 阶段调用 `lint-staged`。

---

## **4. 常见问题**

### **4.1 Husky 没有生效**
**原因**: 可能是没有运行 `npx husky install` 或 `prepare` 脚本未配置。
**解决方法**:
1. 确保运行了以下命令：
   ```bash
   npx husky install
   ```
2. 确保在 package.json 中添加了 `prepare` 脚本：
   ```json
   {
     "scripts": {
       "prepare": "husky install"
     }
   }
   ```

---

### **4.2 跳过 Hook**
**场景**: 某些情况下需要跳过 Hook（如紧急提交）。
**解决方法**: 使用 `--no-verify` 参数跳过 Hook。
```bash
git commit --no-verify -m "紧急提交，跳过 Hook"
```

---

### **4.3 权限问题**
**原因**: `.husky/` 文件夹中的 Hook 文件可能没有执行权限。
**解决方法**: 赋予执行权限：
```bash
chmod +x .husky/*
```

---

## **5. 完整示例**

以下是一个完整的 Husky 配置示例：

### **5.1 安装依赖**
```bash
npm install husky lint-staged @commitlint/config-conventional @commitlint/cli --save-dev
```

### **5.2 配置 `commitlint`**
创建 `commitlint.config.js` 文件：
```javascript
module.exports = {
  extends: ['@commitlint/config-conventional']
};
```

### **5.3 配置 `lint-staged`**
在 package.json 中添加：
```json
{
  "lint-staged": {
    "*.js": "eslint --fix"
  }
}
```

### **5.4 配置 Husky**
1. 初始化 Husky：
   ```bash
   npx husky install
   ```
2. 添加 `pre-commit` Hook：
   ```bash
   npx husky add .husky/pre-commit "npx lint-staged"
   ```
3. 添加 `commit-msg` Hook：
   ```bash
   npx husky add .husky/commit-msg "npx commitlint --edit $1"
   ```

---

## **6. 总结**

1. **安装 Husky**: `npm install husky --save-dev`。
2. **启用 Husky**: `npx husky install`。
3. **配置 Hook**: 使用 `npx husky add` 添加 Hook。
4. **配合 lint-staged**: 实现只检查被修改的文件。
5. **跳过 Hook**: 使用 `--no-verify` 参数。
