
---

# Express 常用 API 深入总结

---

## **1. 常用中间件**

### **1.1 body-parser**
- **功能**: 用于解析请求体，支持 JSON、Raw、Text 和 URL 编码的数据。
- **安装**:
  ```bash
  npm install body-parser
  ```
- **使用**:
  ```javascript
  const bodyParser = require('body-parser');
  app.use(bodyParser.json()); // 解析 JSON 数据
  app.use(bodyParser.urlencoded({ extended: true })); // 解析 URL 编码数据
  ```

#### **高级用法**
- 限制请求体大小：
  ```javascript
  app.use(bodyParser.json({ limit: '10mb' })); // 限制 JSON 请求体大小为 10MB
  ```

---

### **1.2 cookie-parser**
- **功能**: 用于解析请求中的 Cookie，将其转换为对象。
- **安装**:
  ```bash
  npm install cookie-parser
  ```
- **使用**:
  ```javascript
  const cookieParser = require('cookie-parser');
  app.use(cookieParser());

  app.get('/', (req, res) => {
    console.log(req.cookies); // 获取 Cookie
    res.cookie('name', 'Express', { httpOnly: true, maxAge: 3600000 }); // 设置 Cookie
    res.send('Cookie 已设置');
  });
  ```

#### **高级用法**
- 签名 Cookie：
  ```javascript
  app.use(cookieParser('secret-key'));

  app.get('/set-signed-cookie', (req, res) => {
    res.cookie('signedName', 'Express', { signed: true });
    res.send('Signed Cookie 已设置');
  });

  app.get('/get-signed-cookie', (req, res) => {
    console.log(req.signedCookies); // 获取签名的 Cookie
    res.send('Signed Cookie 已获取');
  });
  ```

---

### **1.3 multer**
- **功能**: 用于处理 `multipart/form-data` 类型的表单数据（如文件上传）。
- **安装**:
  ```bash
  npm install multer
  ```
- **使用**:
  ```javascript
  const multer = require('multer');
  const upload = multer({ dest: 'uploads/' });

  app.post('/upload', upload.single('file'), (req, res) => {
    console.log(req.file); // 上传的文件信息
    res.send('文件上传成功');
  });
  ```

#### **高级用法**
- 自定义存储方式：
  ```javascript
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  });

  const upload = multer({ storage });

  app.post('/upload', upload.single('file'), (req, res) => {
    res.send('文件上传成功');
  });
  ```

---

## **2. 静态文件服务**

### **2.1 express.static**
- **功能**: 提供静态文件服务。
- **使用**:
  ```javascript
  const express = require('express');
  const app = express();

  app.use('/public', express.static('public')); // 将 public 目录作为静态资源目录

  app.listen(3000, () => {
    console.log('Server running at http://localhost:3000/');
  });
  ```

#### **高级用法**
- 设置缓存控制：
  ```javascript
  app.use('/public', express.static('public', { maxAge: '1d' })); // 设置缓存时间为 1 天
  ```

---

## **3. Request 对象**

### **3.1 常用属性**
1. **`req.app`**: 访问 Express 实例。
2. **`req.baseUrl`**: 获取当前路由的基础 URL。
3. **`req.body`**: 获取请求体（需使用 `body-parser` 中间件）。
4. **`req.cookies`**: 获取请求中的 Cookie（需使用 `cookie-parser` 中间件）。
5. **`req.hostname`**: 获取主机名。
6. **`req.ip`**: 获取请求的 IP 地址。
7. **`req.originalUrl`**: 获取原始请求 URL。
8. **`req.params`**: 获取路由参数。
9. **`req.path`**: 获取请求路径。
10. **`req.query`**: 获取查询参数。
11. **`req.get(headerName)`**: 获取指定的 HTTP 请求头。

#### **示例**
```javascript
app.get('/user/:id', (req, res) => {
  console.log(req.params.id); // 路由参数
  console.log(req.query.name); // 查询参数
  console.log(req.get('User-Agent')); // 获取请求头
  res.send('Request 示例');
});
```

---

## **4. Response 对象**

### **4.1 常用方法**
1. **`res.status(code)`**: 设置 HTTP 状态码。
2. **`res.send(data)`**: 发送响应数据。
3. **`res.json(data)`**: 发送 JSON 格式的响应。
4. **`res.redirect(url)`**: 重定向到指定 URL。
5. **`res.cookie(name, value, options)`**: 设置 Cookie。
6. **`res.clearCookie(name)`**: 清除指定的 Cookie。
7. **`res.download(path)`**: 传送指定路径的文件。
8. **`res.sendFile(path)`**: 发送文件。
9. **`res.set(headerName, value)`**: 设置 HTTP 响应头。
10. **`res.type(type)`**: 设置 Content-Type。

#### **示例**
```javascript
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello, Express!' }); // 发送 JSON 响应
});

app.get('/download', (req, res) => {
  res.download('./file.txt'); // 下载文件
});

app.get('/redirect', (req, res) => {
  res.redirect('/new-url'); // 重定向
});
```

---

## **5. 路由**

### **5.1 路由分组**
- **示例**:
  ```javascript
  const router = express.Router();

  router.get('/users', (req, res) => {
    res.send('用户列表');
  });

  router.get('/users/:id', (req, res) => {
    res.send(`用户 ID: ${req.params.id}`);
  });

  app.use('/api', router); // 将路由挂载到 /api 路径
  ```

---

## **6. 错误处理**

### **6.1 全局错误处理中间件**
- **定义**:
  ```javascript
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('服务器错误');
  });
  ```

#### **高级用法**
- 自定义错误类：
  ```javascript
  class AppError extends Error {
    constructor(message, status) {
      super(message);
      this.status = status;
    }
  }

  app.use((err, req, res, next) => {
    if (err instanceof AppError) {
      res.status(err.status).send(err.message);
    } else {
      res.status(500).send('服务器错误');
    }
  });
  ```

---

## **7. 常用模块**

### **7.1 express-session**
- **功能**: 用于管理会话。
- **安装**:
  ```bash
  npm install express-session
  ```
- **使用**:
  ```javascript
  const session = require('express-session');
  app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: true,
  }));

  app.get('/', (req, res) => {
    req.session.user = 'Express';
    res.send('Session 已设置');
  });
  ```

---
