以下是 IntelliJ IDEA 的傻瓜式教程和快捷键总结，适合初学者快速上手。

---

# IntelliJ IDEA 傻瓜式教程

## 1. **安装与配置**
### 1.1 下载与安装
1. 前往 [IntelliJ IDEA 官网](https://www.jetbrains.com/idea/)。
2. 下载 **Community Edition**（免费版）或 **Ultimate Edition**（付费版，适合企业开发）。
3. 按照安装向导完成安装。

### 1.2 配置 JDK
1. 打开 IDEA，点击 **File > Project Structure > SDKs**。
2. 点击 `+`，选择 JDK 的安装路径（如 JavaVirtualMachines）。
3. 确保项目使用正确的 JDK 版本。

---

## 2. **创建项目**
### 2.1 创建 Java 项目
1. 点击 **New Project**。
2. 选择 **Java**，配置 JDK。
3. 点击 **Next**，填写项目名称和路径。
4. 点击 **Finish**，完成项目创建。

### 2.2 创建文件
1. 右键项目目录，选择 **New > Java Class**。
2. 输入类名，点击 **Enter**。

---

## 3. **运行与调试**
### 3.1 运行代码
1. 在代码中找到 `main` 方法。
2. 点击代码左侧的绿色三角形，选择 **Run 'Main'**。
3. 查看运行结果。

### 3.2 调试代码
1. 在代码行号左侧点击，添加断点（红点）。
2. 右键 **Run > Debug 'Main'**。
3. 使用调试工具（如 Step Over、Step Into）逐步执行代码。

---

## 4. **常用功能**
### 4.1 自动补全
- 输入代码时按 `Ctrl + Space`（Mac: `Cmd + Space`），自动补全变量、方法等。

### 4.2 快速修复
- 当代码有错误时，按 `Alt + Enter`（Mac: `Option + Enter`）快速修复问题。

### 4.3 导入依赖
- 使用 Maven 或 Gradle 管理依赖：
  1. 打开 **pom.xml** 或 **build.gradle**。
  2. 添加依赖后，点击右上角的 **刷新图标**。

### 4.4 格式化代码
- 按 `Ctrl + Alt + L`（Mac: `Cmd + Option + L`）格式化代码。

---

## 5. **快捷键总结**
以下是常用快捷键，适用于 Windows 和 Mac：

| 功能                 | Windows/Linux         | Mac                  |
|----------------------|-----------------------|----------------------|
| **运行代码**          | `Shift + F10`         | `Control + R`        |
| **调试代码**          | `Shift + F9`          | `Control + D`        |
| **格式化代码**        | `Ctrl + Alt + L`      | `Cmd + Option + L`   |
| **自动补全**          | `Ctrl + Space`        | `Cmd + Space`        |
| **快速修复**          | `Alt + Enter`         | `Option + Enter`     |
| **查找类**            | `Ctrl + N`            | `Cmd + O`            |
| **查找文件**          | `Ctrl + Shift + N`    | `Cmd + Shift + O`    |
| **查找方法或变量**    | `Ctrl + Shift + Alt + N` | `Cmd + Option + O` |
| **全局搜索**          | `Ctrl + Shift + F`    | `Cmd + Shift + F`    |
| **跳转到定义**        | `Ctrl + B`            | `Cmd + B`            |
| **显示参数信息**      | `Ctrl + P`            | `Cmd + P`            |
| **生成代码**          | `Alt + Insert`        | `Cmd + N`            |
| **重命名**            | `Shift + F6`          | `Shift + F6`         |
| **撤销**              | `Ctrl + Z`            | `Cmd + Z`            |
| **恢复撤销**          | `Ctrl + Shift + Z`    | `Cmd + Shift + Z`    |
| **复制行**            | `Ctrl + D`            | `Cmd + D`            |
| **删除行**            | `Ctrl + Y`            | `Cmd + Backspace`    |
| **注释代码**          | `Ctrl + /`            | `Cmd + /`            |
| **多行注释**          | `Ctrl + Shift + /`    | `Cmd + Option + /`   |
| **打开设置**          | `Ctrl + Alt + S`      | `Cmd + ,`            |

---

## 6. **常见问题与解决**
### 6.1 IDEA 无法识别 JDK
- 检查 JDK 是否正确安装。
- 在 **File > Project Structure > SDKs** 中重新配置 JDK。

### 6.2 无法运行代码
- 确保项目中有 `main` 方法。
- 检查运行配置：点击右上角的 **Edit Configurations**，确保选择了正确的类。

### 6.3 依赖无法加载
- 点击右侧的 **Maven/Gradle 刷新按钮**。
- 检查网络连接，确保可以访问 Maven 仓库。

---

## 7. **插件推荐**
- **Key Promoter X**：帮助记住快捷键。
- **Lombok**：简化 Java 代码（需在项目中添加 Lombok 依赖）。
- **Rainbow Brackets**：彩虹括号，方便代码阅读。
- **Git Integration**：集成 Git，方便版本控制。

---
