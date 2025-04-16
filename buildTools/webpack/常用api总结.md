以下是 **Webpack 常用 API 总结**，涵盖了核心配置、常用插件、常用 Loader 和优化技巧，帮助快速掌握 Webpack 的使用。

---

# Webpack 常用 API 总结

---

## **1. 核心配置**

### **1.1 基本配置**
- **文件**: `webpack.config.js`
- **作用**: 配置 Webpack 的入口、输出、模式等。

#### **示例**
```javascript
const path = require('path');

module.exports = {
  mode: 'development', // 模式：development 或 production
  entry: './src/index.js', // 入口文件
  output: {
    path: path.resolve(__dirname, 'dist'), // 输出目录
    filename: 'bundle.js', // 输出文件名
  },
};
```

---

### **1.2 多入口配置**
- **作用**: 配置多个入口文件，生成多个输出文件。

#### **示例**
```javascript
module.exports = {
  entry: {
    app: './src/app.js',
    admin: './src/admin.js',
  },
  output: {
    filename: '[name].bundle.js', // 根据入口名称生成文件
    path: path.resolve(__dirname, 'dist'),
  },
};
```

---

### **1.3 开发服务器**
- **API**: `devServer`
- **作用**: 配置开发服务器，实现热更新。

#### **示例**
```javascript
module.exports = {
  devServer: {
    contentBase: './dist', // 静态文件目录
    port: 8080, // 端口号
    open: true, // 自动打开浏览器
    hot: true, // 开启热更新
  },
};
```

---

## **2. 常用 Loader**

### **2.1 Babel Loader**
- **作用**: 转换 ES6+ 代码为兼容的 JavaScript。

#### **安装**
```bash
npm install babel-loader @babel/core @babel/preset-env --save-dev
```

#### **配置**
```javascript
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/, // 匹配 .js 文件
        exclude: /node_modules/, // 排除 node_modules
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'], // 使用预设
          },
        },
      },
    ],
  },
};
```

---

### **2.2 CSS Loader**
- **作用**: 加载 CSS 文件。

#### **安装**
```bash
npm install css-loader style-loader --save-dev
```

#### **配置**
```javascript
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/, // 匹配 .css 文件
        use: ['style-loader', 'css-loader'], // 从右到左加载
      },
    ],
  },
};
```

---

### **2.3 File Loader**
- **作用**: 加载文件（如图片、字体）。

#### **安装**
```bash
npm install file-loader --save-dev
```

#### **配置**
```javascript
module.exports = {
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif|svg)$/, // 匹配图片文件
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[hash].[ext]', // 输出文件名
            outputPath: 'images/', // 输出目录
          },
        },
      },
    ],
  },
};
```

---

### **2.4 URL Loader**
- **作用**: 将小文件转换为 Base64，大文件仍然输出为文件。

#### **安装**
```bash
npm install url-loader --save-dev
```

#### **配置**
```javascript
module.exports = {
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 8192, // 小于 8KB 的文件转换为 Base64
            name: '[name].[hash].[ext]',
            outputPath: 'images/',
          },
        },
      },
    ],
  },
};
```

---

## **3. 常用插件**

### **3.1 HtmlWebpackPlugin**
- **作用**: 自动生成 HTML 文件，并引入打包后的资源。

#### **安装**
```bash
npm install html-webpack-plugin --save-dev
```

#### **配置**
```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html', // 模板文件
      filename: 'index.html', // 输出文件名
    }),
  ],
};
```

---

### **3.2 CleanWebpackPlugin**
- **作用**: 每次打包前清理输出目录。

#### **安装**
```bash
npm install clean-webpack-plugin --save-dev
```

#### **配置**
```javascript
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  plugins: [
    new CleanWebpackPlugin(), // 清理 dist 目录
  ],
};
```

---

### **3.3 MiniCssExtractPlugin**
- **作用**: 将 CSS 提取为单独文件。

#### **安装**
```bash
npm install mini-css-extract-plugin --save-dev
```

#### **配置**
```javascript
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'], // 提取 CSS
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css', // 输出文件名
    }),
  ],
};
```

---

## **4. 优化配置**

### **4.1 代码分割**
- **API**: `optimization.splitChunks`
- **作用**: 将公共代码提取为单独的文件。

#### **示例**
```javascript
module.exports = {
  optimization: {
    splitChunks: {
      chunks: 'all', // 分割所有模块
    },
  },
};
```

---

### **4.2 Tree Shaking**
- **作用**: 移除未使用的代码（仅支持 ES6 模块）。

#### **示例**
```javascript
module.exports = {
  mode: 'production', // Tree Shaking 仅在生产模式下生效
};
```

---

### **4.3 压缩代码**
- **API**: `TerserPlugin`
- **作用**: 压缩 JavaScript 文件。

#### **安装**
```bash
npm install terser-webpack-plugin --save-dev
```

#### **配置**
```javascript
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  optimization: {
    minimize: true, // 开启压缩
    minimizer: [new TerserPlugin()],
  },
};
```

---
