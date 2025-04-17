以下是对 **Node.js 常用 API 总结** 的进一步扩展，增加了更详细的描述和更丰富的示例代码，涵盖更多的核心模块和高级功能。

---

# Node.js 常用 API 深入总结

---

## **1. 文件系统 (fs)**

Node.js 提供了 `fs` 模块，用于操作文件和目录。

### **1.4 文件流操作**
- **读取流**: 使用 `fs.createReadStream`。
- **写入流**: 使用 `fs.createWriteStream`。

#### **示例**
```javascript
const fs = require('fs');

// 创建读取流
const readStream = fs.createReadStream('input.txt', 'utf8');
readStream.on('data', (chunk) => {
  console.log('读取到数据:', chunk);
});
readStream.on('end', () => {
  console.log('读取完成');
});

// 创建写入流
const writeStream = fs.createWriteStream('output.txt');
writeStream.write('Hello, ');
writeStream.write('Node.js!');
writeStream.end();
writeStream.on('finish', () => {
  console.log('写入完成');
});
```

---

### **1.5 文件夹操作**
- **读取目录**: 使用 `fs.readdir`。
- **删除目录**: 使用 `fs.rmdir` 或 `fs.rm`。

#### **示例**
```javascript
const fs = require('fs');

// 读取目录内容
fs.readdir('./', (err, files) => {
  if (err) throw err;
  console.log('目录内容:', files);
});

// 删除目录
fs.rmdir('testDir', (err) => {
  if (err) throw err;
  console.log('目录已删除');
});
```

---

## **2. HTTP 模块**

### **2.3 创建 HTTPS 服务器**
Node.js 提供了 `https` 模块，用于创建 HTTPS 服务器。

#### **示例**
```javascript
const https = require('https');
const fs = require('fs');

const options = {
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.cert'),
};

https.createServer(options, (req, res) => {
  res.writeHead(200);
  res.end('Hello, HTTPS!');
}).listen(8443, () => {
  console.log('HTTPS Server running at https://localhost:8443/');
});
```

---

## **3. 路径处理 (path)**

### **3.2 路径解析**
- **`path.parse`**: 解析路径为对象。
- **`path.format`**: 将路径对象转换为字符串。

#### **示例**
```javascript
const path = require('path');

const filePath = '/user/local/example.txt';

// 解析路径
const parsedPath = path.parse(filePath);
console.log(parsedPath);
// 输出: { root: '/', dir: '/user/local', base: 'example.txt', ext: '.txt', name: 'example' }

// 格式化路径
const formattedPath = path.format(parsedPath);
console.log(formattedPath); // 输出: /user/local/example.txt
```

---

## **4. 事件 (events)**

### **4.2 自定义事件**
Node.js 的 `events` 模块允许创建自定义事件。

#### **示例**
```javascript
const EventEmitter = require('events');

class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();

// 自定义事件
myEmitter.on('greet', (name) => {
  console.log(`Hello, ${name}!`);
});

// 触发事件
myEmitter.emit('greet', 'Node.js');
```

---

## **5. 流 (stream)**

### **5.3 管道流**
- **定义**: 管道流用于将一个流的输出直接连接到另一个流的输入。
- **应用场景**: 文件复制、数据传输。

#### **示例**
```javascript
const fs = require('fs');

// 使用管道复制文件
const readStream = fs.createReadStream('input.txt');
const writeStream = fs.createWriteStream('output.txt');

readStream.pipe(writeStream);

writeStream.on('finish', () => {
  console.log('文件复制完成');
});
```

---

## **6. 进程管理 (process)**

### **6.4 子进程**
Node.js 提供了 `child_process` 模块，用于创建子进程。

#### **示例**
```javascript
const { exec, spawn } = require('child_process');

// 使用 exec 执行命令
exec('ls', (err, stdout, stderr) => {
  if (err) {
    console.error(`执行错误: ${err}`);
    return;
  }
  console.log(`输出: ${stdout}`);
});

// 使用 spawn 创建子进程
const child = spawn('node', ['-v']);
child.stdout.on('data', (data) => {
  console.log(`子进程输出: ${data}`);
});
```

---

## **7. 定时器**

### **7.3 `setImmediate`**
- **定义**: `setImmediate` 用于在当前事件循环结束后立即执行回调。
- **区别**: 与 `setTimeout(() => {}, 0)` 类似，但优先级更高。

#### **示例**
```javascript
console.log('开始');

setImmediate(() => {
  console.log('立即执行');
});

console.log('结束');
```

---

## **8. 全局对象**

### **8.2 `Buffer`**
- **定义**: `Buffer` 是 Node.js 提供的用于处理二进制数据的类。
- **常用方法**:
  - `Buffer.from`: 创建 Buffer。
  - `Buffer.alloc`: 分配 Buffer。
  - `Buffer.toString`: 转换为字符串。

#### **示例**
```javascript
const buf = Buffer.from('Hello, Node.js!');
console.log(buf.toString()); // 输出: Hello, Node.js!

const allocBuf = Buffer.alloc(10);
console.log(allocBuf); // 输出: <Buffer 00 00 00 00 00 00 00 00 00 00>
```

---

## **9. 文件压缩 (zlib)**

Node.js 提供了 `zlib` 模块，用于文件压缩和解压缩。

### **9.1 压缩文件**
#### **示例**
```javascript
const fs = require('fs');
const zlib = require('zlib');

const readStream = fs.createReadStream('input.txt');
const writeStream = fs.createWriteStream('input.txt.gz');
const gzip = zlib.createGzip();

readStream.pipe(gzip).pipe(writeStream);

writeStream.on('finish', () => {
  console.log('文件压缩完成');
});
```

---

### **9.2 解压文件**
#### **示例**
```javascript
const fs = require('fs');
const zlib = require('zlib');

const readStream = fs.createReadStream('input.txt.gz');
const writeStream = fs.createWriteStream('output.txt');
const gunzip = zlib.createGunzip();

readStream.pipe(gunzip).pipe(writeStream);

writeStream.on('finish', () => {
  console.log('文件解压完成');
});
```

---

## **10. 性能监控 (perf_hooks)**

Node.js 提供了 `perf_hooks` 模块，用于性能监控。

### **10.1 性能测量**
#### **示例**
```javascript
const { performance } = require('perf_hooks');

const start = performance.now();

// 模拟耗时操作
for (let i = 0; i < 1e6; i++) {}

const end = performance.now();
console.log(`耗时: ${end - start} 毫秒`);
```

---

希望这份扩展后的 **Node.js 常用 API 总结** 能帮助你更深入地理解和使用 Node.js 的核心功能！如果需要更高级的内容，可以进一步探讨。