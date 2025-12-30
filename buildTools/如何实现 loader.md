# 如何自己实现一个 Webpack Loader

## 一、Loader 的基本概念

**Loader** 是 Webpack 中用于对模块的源代码进行预处理的工具。它们可以将各种资源（如 CSS 文件、图片、TypeScript 文件等）转换为 JavaScript 模块，使 Webpack 能够处理这些资源。

> "Loader 的本质就是一个函数，在打包时帮我们处理需要打包的文件。" —— Webpack 官方文档

## 二、Loader 的执行顺序

**Loader 的执行顺序是从右到左、从下到上**。例如，配置中使用 `use: ['loader3', 'loader2', 'loader1']`，那么文件会先经过 `loader1` 处理，再经过 `loader2` 处理，最后经过 `loader3` 处理。

## 三、实现 Loader 的基本步骤

### 1. 创建项目目录

```bash
mkdir my-webpack-loader
cd my-webpack-loader
npm init -y
```

### 2. 安装依赖

```bash
npm install webpack webpack-cli loader-utils --save-dev
```

### 3. 创建 Loader 文件

在项目根目录下创建 `replaceHelloLoader.js` 文件：

```javascript
// replaceHelloLoader.js
const loaderUtils = require('loader-utils');

module.exports = function(source) {
  // 获取配置的选项
  const options = loaderUtils.getOptions(this);
  
  // 将文件内容中的 "hello" 替换为指定的字符串
  const replacement = options.replacement || 'hi';
  return source.replace(/hello/g, replacement);
};
```

### 4. 配置 Webpack

在项目根目录下创建 `webpack.config.js` 文件：

```javascript
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: path.resolve(__dirname, 'replaceHelloLoader.js'),
            options: {
              replacement: 'hi' // 配置替换的字符串
            }
          }
        ]
      }
    ]
  }
};
```

### 5. 创建测试文件

在项目根目录下创建 `src` 目录，并在其中创建 `index.js` 文件：

```javascript
// src/index.js
console.log('hello world');
```

### 6. 运行 Webpack

```bash
npx webpack
```

执行后，`dist/bundle.js` 中的内容将变为：
```javascript
console.log('hi world');
```

## 四、Loader 的核心实现

### 1. 基本 Loader 结构

```javascript
module.exports = function(source) {
  // 处理 source，返回处理后的结果
  return source.replace(/hello/g, 'hi');
};
```

### 2. 使用 loader-utils 获取配置选项

```javascript
const loaderUtils = require('loader-utils');

module.exports = function(source) {
  // 获取配置的选项
  const options = loaderUtils.getOptions(this);
  
  // 使用 options 进行处理
  const replacement = options.replacement || 'hi';
  return source.replace(/hello/g, replacement);
};
```

### 3. 同步 Loader 与异步 Loader

**同步 Loader**（默认）：
```javascript
module.exports = function(source) {
  return source.replace(/hello/g, 'hi');
};
```

**异步 Loader**：
```javascript
module.exports = function(source) {
  const callback = this.async();
  
  setTimeout(() => {
    callback(null, source.replace(/hello/g, 'hi'));
  }, 1000);
};
```

## 五、完整示例：替换特定文本的 Loader

### 1. 创建 Loader 文件

```javascript
// replaceTextLoader.js
const loaderUtils = require('loader-utils');

module.exports = function(source) {
  const options = loaderUtils.getOptions(this);
  
  if (!options.from || !options.to) {
    throw new Error('Both "from" and "to" options are required');
  }
  
  return source.replace(new RegExp(options.from, 'g'), options.to);
};
```

### 2. 配置 Webpack

```javascript
// webpack.config.js
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: path.resolve(__dirname, 'replaceTextLoader.js'),
            options: {
              from: 'hello',
              to: 'hi'
            }
          }
        ]
      }
    ]
  }
};
```

### 3. 测试文件

```javascript
// src/index.js
const message = 'hello world';
console.log(message);
```

### 4. 执行结果

打包后，`dist/bundle.js` 将变为：
```javascript
const message = 'hi world';
console.log(message);
```

## 六、Loader 的执行上下文

在 Loader 中，`this` 是 Webpack 提供的执行上下文，包含以下关键方法：

| 方法 | 作用 | 说明 |
|------|------|------|
| `this.async()` | 返回异步回调 | 用于异步 Loader |
| `this.callback()` | 用于异步回调 | 与 `this.async()` 类似 |
| `this.query` | 获取配置选项 | 旧版方式，推荐使用 `loaderUtils.getOptions` |
| `this.resourcePath` | 获取当前资源路径 | 用于处理路径相关逻辑 |

## 七、Loader 的最佳实践

### 1. 使用 loader-utils

```javascript
const loaderUtils = require('loader-utils');

// 获取配置选项
const options = loaderUtils.getOptions(this);
```

### 2. 处理错误

```javascript
if (!options.from || !options.to) {
  throw new Error('Both "from" and "to" options are required');
}
```

### 3. 保持 Loader 简洁

- 一个 Loader 只做一件事
- 避免处理不必要的逻辑
- 保持代码清晰可读

### 4. 添加文档说明

在 `package.json` 中添加描述：
```json
{
  "name": "replace-text-loader",
  "description": "A loader to replace text in files",
  "version": "1.0.0",
  "main": "replaceTextLoader.js"
}
```

## 八、常见 Loader 类型

| 类型 | 用途 | 示例 |
|------|------|------|
| **文本替换** | 替换特定字符串 | 将 `hello` 替换为 `hi` |
| **语法转换** | 转换代码语法 | 将 TypeScript 转为 JavaScript |
| **资源处理** | 处理非代码资源 | 将图片转换为 base64 |
| **代码分析** | 分析代码结构 | 检查未使用的变量 |
| **代码注入** | 添加额外代码 | 添加日志、埋点 |

## 九、总结

实现一个 Webpack Loader 的核心步骤：

1. **创建项目**：使用 `npm init` 初始化项目
2. **安装依赖**：`npm install webpack loader-utils --save-dev`
3. **编写 Loader**：导出一个处理 `source` 字符串的函数
4. **配置 Webpack**：在 `webpack.config.js` 中配置 Loader
5. **测试**：运行 Webpack 打包并验证结果
