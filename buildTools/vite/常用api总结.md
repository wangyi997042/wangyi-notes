以下是 **Vite 常用 API 总结**，涵盖了核心配置、插件机制、环境变量、构建优化等内容，帮助快速掌握 Vite 的使用方法。

---

# Vite 常用 API 总结

---

## **1. 核心配置**

### **1.1 基本配置**
- **文件**: `vite.config.js`
- **作用**: 配置 Vite 的入口、输出、插件等。

#### **示例**
```javascript
import { defineConfig } from 'vite';

export default defineConfig({
  root: '.', // 项目根目录
  base: '/', // 公共基础路径
  server: {
    port: 3000, // 开发服务器端口
    open: true, // 自动打开浏览器
  },
  build: {
    outDir: 'dist', // 输出目录
    sourcemap: true, // 生成 source map
  },
});
```

---

### **1.2 配置别名**
- **作用**: 配置路径别名，简化模块导入。

#### **示例**
```javascript
import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // 将 @ 指向 src 目录
    },
  },
});
```

在代码中使用：
```javascript
import MyComponent from '@/components/MyComponent.vue';
```

---

## **2. 插件机制**

### **2.1 使用插件**
- **作用**: 扩展 Vite 的功能。

#### **示例**
```javascript
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()], // 使用 Vue 插件
});
```

---

### **2.2 自定义插件**
- **作用**: 创建自定义插件，扩展功能。

#### **示例**
```javascript
export default {
  name: 'my-plugin',
  transform(code, id) {
    if (id.endsWith('.js')) {
      return code.replace('__REPLACE_ME__', 'Hello Vite');
    }
  },
};
```

在 `vite.config.js` 中使用：
```javascript
import { defineConfig } from 'vite';
import myPlugin from './my-plugin';

export default defineConfig({
  plugins: [myPlugin],
});
```

---

## **3. 环境变量**

### **3.1 定义环境变量**
- **文件**: `.env`、`.env.development`、`.env.production`
- **作用**: 定义不同环境的变量。

#### **示例**
`.env` 文件：
```env
VITE_API_URL=https://api.example.com
```

在代码中使用：
```javascript
console.log(import.meta.env.VITE_API_URL);
```

---

### **3.2 环境变量前缀**
- **作用**: 只有以 `VITE_` 开头的变量会暴露给客户端。

#### **示例**
```env
VITE_APP_TITLE=My Vite App
```

在代码中使用：
```javascript
console.log(import.meta.env.VITE_APP_TITLE);
```

---

## **4. 开发服务器**

### **4.1 配置代理**
- **作用**: 配置开发服务器的代理，解决跨域问题。

#### **示例**
```javascript
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'https://api.example.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});
```

---

### **4.2 热模块替换 (HMR)**
- **作用**: 开启模块热替换，提升开发效率。

#### **示例**
```javascript
export default defineConfig({
  server: {
    hmr: true, // 开启 HMR
  },
});
```

---

## **5. 构建优化**

### **5.1 代码分割**
- **作用**: 将代码分割为多个模块，提升加载性能。

#### **示例**
```javascript
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['vue', 'axios'], // 将 vue 和 axios 分割到 vendor.js
        },
      },
    },
  },
});
```

---

### **5.2 压缩代码**
- **作用**: 压缩打包后的代码。

#### **示例**
```javascript
export default defineConfig({
  build: {
    minify: 'terser', // 使用 terser 压缩
    terserOptions: {
      compress: {
        drop_console: true, // 移除 console.log
      },
    },
  },
});
```

---

## **6. 静态资源处理**

### **6.1 静态资源路径**
- **作用**: 配置静态资源的基础路径。

#### **示例**
```javascript
export default defineConfig({
  base: '/static/', // 静态资源路径
});
```

---

### **6.2 引入静态资源**
- **作用**: 在代码中引入静态资源。

#### **示例**
```javascript
import logo from './assets/logo.png';

const img = document.createElement('img');
img.src = logo;
document.body.appendChild(img);
```

---

## **7. 常用插件**

### **7.1 @vitejs/plugin-vue**
- **作用**: 支持 Vue 3 的开发。
- **安装**:
  ```bash
  npm install @vitejs/plugin-vue --save-dev
  ```
- **配置**:
  ```javascript
  import vue from '@vitejs/plugin-vue';

  export default defineConfig({
    plugins: [vue()],
  });
  ```

---

### **7.2 @vitejs/plugin-react**
- **作用**: 支持 React 的开发。
- **安装**:
  ```bash
  npm install @vitejs/plugin-react --save-dev
  ```
- **配置**:
  ```javascript
  import react from '@vitejs/plugin-react';

  export default defineConfig({
    plugins: [react()],
  });
  ```

---

### **7.3 vite-plugin-compression**
- **作用**: 开启 gzip 压缩。
- **安装**:
  ```bash
  npm install vite-plugin-compression --save-dev
  ```
- **配置**:
  ```javascript
  import compression from 'vite-plugin-compression';

  export default defineConfig({
    plugins: [compression()],
  });
  ```

---
