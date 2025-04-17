以下是对 **Koa 常用 API** 的详细总结，涵盖了 Koa 的核心功能和常用中间件的使用，帮助快速掌握 Koa 的开发技巧。

---

# Koa 常用 API 总结

Koa 是一个基于 Node.js 的轻量级 Web 框架，专注于中间件的组合，提供了更优雅的异步编程体验。

---

## **1. 核心概念**

### **1.1 中间件**
- **定义**: 中间件是 Koa 的核心，所有请求都会依次通过中间件。
- **特点**:
  - 中间件是一个异步函数 `(ctx, next)`。
  - 使用 `await next()` 调用下一个中间件。

#### **示例**
```javascript
const Koa = require('koa');
const app = new Koa();

app.use(async (ctx, next) => {
  console.log('中间件 1: 开始');
  await next();
  console.log('中间件 1: 结束');
});

app.use(async (ctx, next) => {
  console.log('中间件 2: 开始');
  ctx.body = 'Hello, Koa!';
  console.log('中间件 2: 结束');
});

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000/');
});
```

---

## **2. Context (ctx)**

`ctx` 是 Koa 的上下文对象，封装了请求和响应的相关信息。

### **2.1 常用属性**
- **`ctx.request`**: 请求对象。
- **`ctx.response`**: 响应对象。
- **`ctx.method`**: 请求方法。
- **`ctx.url`**: 请求的完整 URL。
- **`ctx.body`**: 响应内容。

#### **示例**
```javascript
app.use(async (ctx) => {
  console.log(`请求方法: ${ctx.method}`);
  console.log(`请求路径: ${ctx.url}`);
  ctx.body = 'Hello, Koa!';
});
```

---

## **3. 路由 (koa-router)**

Koa 本身不包含路由功能，需要使用 `koa-router` 中间件。

### **3.1 安装**
```bash
npm install koa-router
```

### **3.2 使用路由**
#### **示例**
```javascript
const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();
const router = new Router();

router.get('/', (ctx) => {
  ctx.body = '首页';
});

router.get('/about', (ctx) => {
  ctx.body = '关于我们';
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000/');
});
```

---

## **4. 静态文件 (koa-static)**

Koa 提供了 `koa-static` 中间件，用于处理静态文件。

### **4.1 安装**
```bash
npm install koa-static
```

### **4.2 使用静态文件中间件**
#### **示例**
```javascript
const Koa = require('koa');
const serve = require('koa-static');
const path = require('path');

const app = new Koa();

// 提供静态文件服务
app.use(serve(path.join(__dirname, 'public')));

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000/');
});
```

---

## **5. 解析请求体 (koa-bodyparser)**

Koa 提供了 `koa-bodyparser` 中间件，用于解析请求体（如 JSON、表单数据）。

### **5.1 安装**
```bash
npm install koa-bodyparser
```

### **5.2 使用请求体解析中间件**
#### **示例**
```javascript
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');

const app = new Koa();

app.use(bodyParser());

app.use(async (ctx) => {
  if (ctx.method === 'POST') {
    console.log('请求体:', ctx.request.body);
    ctx.body = '数据已接收';
  }
});

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000/');
});
```

---

## **6. 错误处理**

Koa 提供了全局错误处理机制，可以捕获中间件中的异常。

### **6.1 使用 `try...catch` 捕获错误**
#### **示例**
```javascript
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.body = { message: err.message };
    console.error('错误捕获:', err);
  }
});
```

---

## **7. 日志记录 (koa-logger)**

Koa 提供了 `koa-logger` 中间件，用于记录请求日志。

### **7.1 安装**
```bash
npm install koa-logger
```

### **7.2 使用日志中间件**
#### **示例**
```javascript
const logger = require('koa-logger');

app.use(logger());
```

---

## **8. 跨域处理 (koa-cors)**

Koa 提供了 `koa-cors` 中间件，用于处理跨域请求。

### **8.1 安装**
```bash
npm install @koa/cors
```

### **8.2 使用跨域中间件**
#### **示例**
```javascript
const cors = require('@koa/cors');

app.use(cors());
```

---

## **9. 文件上传 (koa-multer)**

Koa 提供了 `koa-multer` 中间件，用于处理文件上传。

### **9.1 安装**
```bash
npm install koa-multer
```

### **9.2 使用文件上传中间件**
#### **示例**
```javascript
const multer = require('@koa/multer');
const upload = multer({ dest: 'uploads/' });

router.post('/upload', upload.single('file'), (ctx) => {
  console.log('文件信息:', ctx.file);
  ctx.body = '文件上传成功';
});
```

---

## **10. 性能监控**

Koa 可以通过中间件记录请求的耗时。

### **10.1 记录请求耗时**
#### **示例**
```javascript
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});
```

---

## **11. 自定义中间件**

Koa 支持自定义中间件，用于实现特定功能。

### **11.1 示例**
```javascript
app.use(async (ctx, next) => {
  console.log('自定义中间件: 请求开始');
  await next();
  console.log('自定义中间件: 请求结束');
});
```

---

## **12. Session 管理 (koa-session)**

Koa 提供了 `koa-session` 中间件，用于管理会话。

### **12.1 安装**
```bash
npm install koa-session
```

### **12.2 使用 Session 中间件**
#### **示例**
```javascript
const session = require('koa-session');

app.keys = ['some secret'];
app.use(session(app));

app.use(async (ctx) => {
  if (ctx.path === '/set') {
    ctx.session.user = 'Koa';
    ctx.body = 'Session 已设置';
  } else if (ctx.path === '/get') {
    ctx.body = `Session 用户: ${ctx.session.user}`;
  }
});
```

---

希望这份 **Koa 常用 API 总结** 能帮助你快速掌握 Koa 的核心功能！如果需要更深入的内容，可以进一步扩展。

找到具有 1 个许可证类型的类似代码