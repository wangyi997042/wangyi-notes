# Node.js 设置 Cookie 的完整指南

## 一、基础设置方式

### 1. 在 Express 中设置 Cookie

Express 提供了 `res.cookie()` 方法，这是最常用的设置 Cookie 的方式。

```javascript
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  // 设置一个简单的 Cookie
  res.cookie('username', 'john_doe', {
    httpOnly: true,     // 防止通过 JavaScript 访问
    secure: true,      // 仅在 HTTPS 下传输
    maxAge: 24 * 60 * 60 * 1000, // 24小时
    path: '/',         // Cookie 的路径
    domain: 'example.com', // Cookie 的域名
    sameSite: 'strict' // 防止 CSRF 攻击
  });
  
  res.send('Cookie set!');
});

app.listen(3000, () => console.log('Server running on port 3000'));
```

### 2. 在 Koa 中设置 Cookie

Koa 使用 `ctx.cookies` 对象来设置 Cookie。

```javascript
const Koa = require('koa');
const app = new Koa();

app.use(async (ctx) => {
  // 设置 Cookie
  ctx.cookies.set('username', 'john_doe', {
    httpOnly: true,
    secure: true,
    maxAge: 24 * 60 * 60 * 1000, // 24小时
    path: '/',
    domain: 'example.com',
    sameSite: 'strict'
  });
  
  ctx.body = 'Cookie set!';
});

app.listen(3000, () => console.log('Server running on port 3000'));
```

## 二、Cookie 选项详解

### 1. 关键选项

| 选项 | 说明 | 示例 | 安全建议 |
|------|------|------|----------|
| `httpOnly` | 禁止 JavaScript 通过 `document.cookie` 访问 | `httpOnly: true` | **必须启用**，防止 XSS 攻击 |
| `secure` | 仅在 HTTPS 下传输 | `secure: true` | **必须启用**，防止 Cookie 被窃取 |
| `sameSite` | 控制跨站请求时是否发送 Cookie | `sameSite: 'strict'` | **必须设置**，防止 CSRF 攻击 |
| `maxAge` | Cookie 的最大存活时间（毫秒） | `maxAge: 24 * 60 * 60 * 1000` | 保持合理时间，避免长期存储 |
| `expires` | Cookie 的过期时间（Date 对象） | `expires: new Date(Date.now() + 24 * 60 * 60 * 1000)` | 与 maxAge 二选一 |
| `path` | Cookie 有效的路径 | `path: '/admin'` | 限制在特定路径，减少风险 |
| `domain` | Cookie 有效的域名 | `domain: 'example.com'` | 限制在特定域名，避免跨域问题 |
| `secure` | 仅在 HTTPS 传输 | `secure: true` | **必须启用**，防止中间人攻击 |

### 2. `sameSite` 选项详解

`sameSite` 是防止 CSRF 攻击的关键设置，有三个可选值：

- `'strict'`：只在同站请求时发送 Cookie
- `'lax'`：在导航请求（如点击链接）时发送，但不包括 POST 请求
- `'none'`：无论跨站与否都发送 Cookie（需要同时设置 `secure: true`）

**安全建议**：
- 一般设置为 `'strict'` 或 `'lax'`
- 仅在必要时使用 `'none'`，且必须配合 `secure: true`

## 三、安全设置最佳实践

### 1. 基本安全设置（必须）

```javascript
// Express 示例
res.cookie('session', 'session_id', {
  httpOnly: true,     // 防止 XSS
  secure: true,      // 仅 HTTPS
  sameSite: 'strict', // 防止 CSRF
  maxAge: 1000 * 60 * 60 * 24 // 24小时
});

// Koa 示例
ctx.cookies.set('session', 'session_id', {
  httpOnly: true,
  secure: true,
  sameSite: 'strict',
  maxAge: 1000 * 60 * 60 * 24
});
```

### 2. 为不同场景设置不同 Cookie

```javascript
// 为 API 请求设置专用 Cookie
res.cookie('api_token', 'token', {
  httpOnly: true,
  secure: true,
  sameSite: 'strict',
  maxAge: 1000 * 60 * 15 // 15分钟
});

// 为前端页面设置前端 Cookie
res.cookie('frontend', 'frontend_value', {
  httpOnly: false,   // 允许前端 JavaScript 访问
  secure: true,
  sameSite: 'lax',
  maxAge: 1000 * 60 * 60 * 24 * 30 // 30天
});
```

### 3. 使用 Helmet 中间件增强安全

Helmet 是一个 Express 中间件，可以自动设置多种安全响应头。

```javascript
const helmet = require('helmet');
const app = express();

// 使用 Helmet
app.use(helmet({
  contentSecurityPolicy: false, // 保持自定义 CSP
  hsts: {
    maxAge: 31536000, // 1年
    includeSubDomains: true,
    preload: true
  }
}));

// 设置 Cookie
app.use((req, res, next) => {
  res.cookie('session', 'session_id', {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    maxAge: 1000 * 60 * 60 * 24
  });
  next();
});
```

## 四、Cookie 的读取与删除

### 1. 读取 Cookie

```javascript
// Express
app.get('/', (req, res) => {
  const username = req.cookies.username;
  res.send(`Hello, ${username}`);
});

// Koa
app.use(async (ctx) => {
  const username = ctx.cookies.get('username');
  ctx.body = `Hello, ${username}`;
});
```

### 2. 删除 Cookie

```javascript
// Express
res.clearCookie('username', {
  path: '/',
  domain: 'example.com'
});

// Koa
ctx.cookies.set('username', null, {
  httpOnly: true,
  secure: true,
  path: '/',
  domain: 'example.com'
});
```

## 五、常见错误与解决方案

### 1. Cookie 无法在浏览器中显示

**原因**：
- 没有设置 `path` 或 `domain`
- 未正确设置 `secure`（在 HTTP 而非 HTTPS 环境下）

**解决方案**：
```javascript
// 确保设置正确的 path 和 domain
res.cookie('username', 'john_doe', {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict',
  path: '/',
  domain: 'example.com'
});
```

### 2. 本地开发时 Cookie 无法设置

**原因**：
- 本地开发使用 HTTP，但设置了 `secure: true`

**解决方案**：
```javascript
// 本地开发时，不设置 secure
res.cookie('username', 'john_doe', {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict',
  maxAge: 1000 * 60 * 60 * 24
});
```

### 3. 跨域问题

**原因**：
- 未正确设置 `domain` 和 `path`

**解决方案**：
```javascript
// 设置正确的 domain 和 path
res.cookie('session', 'session_id', {
  httpOnly: true,
  secure: true,
  sameSite: 'none',
  domain: '.example.com', // 注意前面的点
  path: '/',
  maxAge: 1000 * 60 * 60 * 24
});
```

## 六、安全建议总结

1. **必须启用** `httpOnly` 和 `secure` 选项
2. **必须设置** `sameSite` 为 `strict` 或 `lax`
3. **避免**在 Cookie 中存储敏感信息
4. **限制** `maxAge` 和 `expires`，避免长期存储
5. **限制** `path` 和 `domain`，减少 Cookie 的作用范围
6. **使用** Helmet 中间件，增强整体安全性
7. **测试** Cookie 设置是否生效，特别是在不同环境下

> "Cookie 安全是 Web 应用安全的第一道防线，正确设置 Cookie 可以防止 80% 的常见安全问题。" —— 安全开发最佳实践

## 七、完整代码示例

```javascript
const express = require('express');
const helmet = require('helmet');
const app = express();

// 使用 Helmet 增强安全
app.use(helmet({
  contentSecurityPolicy: false,
  hsts: {
    maxAge: 31536000, // 1年
    includeSubDomains: true,
    preload: true
  }
}));

// 设置 Cookie
app.get('/set-cookie', (req, res) => {
  // 设置核心会话 Cookie
  res.cookie('session', 'session_id', {
    httpOnly: true,     // 防止 XSS
    secure: true,      // 仅 HTTPS
    sameSite: 'strict', // 防止 CSRF
    maxAge: 1000 * 60 * 60 * 24, // 24小时
    path: '/',
    domain: 'example.com'
  });
  
  // 设置前端可访问的 Cookie
  res.cookie('frontend', 'frontend_value', {
    httpOnly: false,   // 允许前端访问
    secure: true,
    sameSite: 'lax',
    maxAge: 1000 * 60 * 60 * 24 * 30, // 30天
    path: '/',
    domain: 'example.com'
  });
  
  res.send('Cookies set!');
});

// 读取 Cookie
app.get('/get-cookie', (req, res) => {
  const session = req.cookies.session;
  const frontend = req.cookies.frontend;
  
  res.send(`Session: ${session}, Frontend: ${frontend}`);
});

// 删除 Cookie
app.get('/delete-cookie', (req, res) => {
  res.clearCookie('session', {
    path: '/',
    domain: 'example.com'
  });
  
  res.clearCookie('frontend', {
    path: '/',
    domain: 'example.com'
  });
  
  res.send('Cookies deleted!');
});

app.listen(3000, () => console.log('Server running on port 3000'));
```
