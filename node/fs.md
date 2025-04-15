

### **Node.js 的 `fs` 模块 API 功能总结**

以下是 `fs` 模块中常用 API 的功能介绍，按功能分类整理：

---

## **1. 文件操作**

### **1.1 读取文件**
- **`fs.readFile`**: 异步读取文件内容。
- **`fs.readFileSync`**: 同步读取文件内容。

### **1.2 写入文件**
- **`fs.writeFile`**: 异步写入文件内容，覆盖原内容。
- **`fs.writeFileSync`**: 同步写入文件内容，覆盖原内容。

### **1.3 追加内容**
- **`fs.appendFile`**: 异步追加内容到文件末尾。
- **`fs.appendFileSync`**: 同步追加内容到文件末尾。

### **1.4 删除文件**
- **`fs.unlink`**: 异步删除文件。
- **`fs.unlinkSync`**: 同步删除文件。

### **1.5 重命名文件**
- **`fs.rename`**: 异步重命名文件或移动文件。
- **`fs.renameSync`**: 同步重命名文件或移动文件。

---

## **2. 文件夹操作**

### **2.1 创建文件夹**
- **`fs.mkdir`**: 异步创建文件夹。
- **`fs.mkdirSync`**: 同步创建文件夹。

### **2.2 读取文件夹内容**
- **`fs.readdir`**: 异步读取文件夹内容。
- **`fs.readdirSync`**: 同步读取文件夹内容。

### **2.3 删除文件夹**
- **`fs.rmdir`**: 异步删除空文件夹（已废弃）。
- **`fs.rmdirSync`**: 同步删除空文件夹（已废弃）。
- **`fs.rm`**: 异步删除文件或文件夹，支持递归删除。
- **`fs.rmSync`**: 同步删除文件或文件夹，支持递归删除。

---

## **3. 文件流操作**

### **3.1 读取流**
- **`fs.createReadStream`**: 创建读取流，用于逐块读取大文件。

### **3.2 写入流**
- **`fs.createWriteStream`**: 创建写入流，用于逐块写入大文件。

### **3.3 管道流**
- **`stream.pipe`**: 将读取流的输出直接连接到写入流的输入。

---

## **4. 文件属性操作**

### **4.1 检查文件或目录是否存在**
- **`fs.exists`**: 异步检查文件或目录是否存在（已废弃）。
- **`fs.existsSync`**: 同步检查文件或目录是否存在。

### **4.2 获取文件或目录信息**
- **`fs.stat`**: 异步获取文件或目录的详细信息。
- **`fs.statSync`**: 同步获取文件或目录的详细信息。

### **4.3 检查文件类型**
- **`fs.lstat`**: 异步获取文件或符号链接的详细信息。
- **`fs.lstatSync`**: 同步获取文件或符号链接的详细信息。

---

## **5. 文件权限操作**

### **5.1 修改权限**
- **`fs.chmod`**: 异步修改文件或目录的权限。
- **`fs.chmodSync`**: 同步修改文件或目录的权限。

### **5.2 修改所有者**
- **`fs.chown`**: 异步修改文件或目录的所有者。
- **`fs.chownSync`**: 同步修改文件或目录的所有者。

---

## **6. 文件描述符操作**

### **6.1 打开文件**
- **`fs.open`**: 异步打开文件，返回文件描述符。
- **`fs.openSync`**: 同步打开文件，返回文件描述符。

### **6.2 关闭文件**
- **`fs.close`**: 异步关闭文件描述符。
- **`fs.closeSync`**: 同步关闭文件描述符。

### **6.3 读取文件**
- **`fs.read`**: 异步从文件描述符中读取数据。
- **`fs.readSync`**: 同步从文件描述符中读取数据。

### **6.4 写入文件**
- **`fs.write`**: 异步向文件描述符中写入数据。
- **`fs.writeSync`**: 同步向文件描述符中写入数据。

---

## **7. 符号链接操作**

### **7.1 创建符号链接**
- **`fs.symlink`**: 异步创建符号链接。
- **`fs.symlinkSync`**: 同步创建符号链接。

### **7.2 读取符号链接**
- **`fs.readlink`**: 异步读取符号链接的目标路径。
- **`fs.readlinkSync`**: 同步读取符号链接的目标路径。

---

## **8. 监视文件和目录**

### **8.1 监视文件或目录**
- **`fs.watch`**: 监视文件或目录的变化。
- **`fs.watchFile`**: 监视文件的变化（轮询方式）。

### **8.2 停止监视**
- **`fs.unwatchFile`**: 停止监视文件。

---

## **9. 临时文件操作**

### **9.1 创建临时文件**
- **`fs.mkdtemp`**: 异步创建一个唯一的临时目录。
- **`fs.mkdtempSync`**: 同步创建一个唯一的临时目录。

---

## **10. 拷贝文件**

### **10.1 复制文件**
- **`fs.copyFile`**: 异步复制文件。
- **`fs.copyFileSync`**: 同步复制文件。

---

### **Node.js 的 `fs` 模块详细介绍**


`fs` 模块是 Node.js 提供的核心模块之一，用于操作文件和目录。它支持同步和异步两种方式，适用于文件的读取、写入、删除、重命名等操作。

---

## **1. 引入 `fs` 模块**
在使用 `fs` 模块之前，需要先引入：
```javascript
const fs = require('fs');
```

---

## **2. 文件操作**

### **2.1 读取文件**
- **异步读取**: 使用 `fs.readFile`。
- **同步读取**: 使用 `fs.readFileSync`。

#### **示例**
```javascript
// 异步读取文件
fs.readFile('example.txt', 'utf8', (err, data) => {
  if (err) {
    console.error('读取文件失败:', err);
    return;
  }
  console.log('文件内容:', data);
});

// 同步读取文件
try {
  const data = fs.readFileSync('example.txt', 'utf8');
  console.log('文件内容:', data);
} catch (err) {
  console.error('读取文件失败:', err);
}
```

---

### **2.2 写入文件**
- **异步写入**: 使用 `fs.writeFile`。
- **同步写入**: 使用 `fs.writeFileSync`。

#### **示例**
```javascript
// 异步写入文件
fs.writeFile('example.txt', 'Hello, Node.js!', (err) => {
  if (err) {
    console.error('写入文件失败:', err);
    return;
  }
  console.log('文件写入成功');
});

// 同步写入文件
try {
  fs.writeFileSync('example.txt', 'Hello, Node.js!');
  console.log('文件写入成功');
} catch (err) {
  console.error('写入文件失败:', err);
}
```

---

### **2.3 追加内容**
- **异步追加**: 使用 `fs.appendFile`。
- **同步追加**: 使用 `fs.appendFileSync`。

#### **示例**
```javascript
// 异步追加内容
fs.appendFile('example.txt', '\nAppended content.', (err) => {
  if (err) {
    console.error('追加内容失败:', err);
    return;
  }
  console.log('内容追加成功');
});

// 同步追加内容
try {
  fs.appendFileSync('example.txt', '\nAppended content.');
  console.log('内容追加成功');
} catch (err) {
  console.error('追加内容失败:', err);
}
```

---

### **2.4 删除文件**
- 使用 `fs.unlink`（异步）或 `fs.unlinkSync`（同步）。

#### **示例**
```javascript
// 异步删除文件
fs.unlink('example.txt', (err) => {
  if (err) {
    console.error('删除文件失败:', err);
    return;
  }
  console.log('文件删除成功');
});

// 同步删除文件
try {
  fs.unlinkSync('example.txt');
  console.log('文件删除成功');
} catch (err) {
  console.error('删除文件失败:', err);
}
```

---

### **2.5 重命名文件**
- 使用 `fs.rename`（异步）或 `fs.renameSync`（同步）。

#### **示例**
```javascript
// 异步重命名文件
fs.rename('oldName.txt', 'newName.txt', (err) => {
  if (err) {
    console.error('重命名文件失败:', err);
    return;
  }
  console.log('文件重命名成功');
});

// 同步重命名文件
try {
  fs.renameSync('oldName.txt', 'newName.txt');
  console.log('文件重命名成功');
} catch (err) {
  console.error('重命名文件失败:', err);
}
```

---

## **3. 文件夹操作**

### **3.1 创建文件夹**
- 使用 `fs.mkdir`（异步）或 `fs.mkdirSync`（同步）。

#### **示例**
```javascript
// 异步创建文件夹
fs.mkdir('newDir', { recursive: true }, (err) => {
  if (err) {
    console.error('创建文件夹失败:', err);
    return;
  }
  console.log('文件夹创建成功');
});

// 同步创建文件夹
try {
  fs.mkdirSync('newDir', { recursive: true });
  console.log('文件夹创建成功');
} catch (err) {
  console.error('创建文件夹失败:', err);
}
```

---

### **3.2 读取文件夹内容**
- 使用 `fs.readdir`（异步）或 `fs.readdirSync`（同步）。

#### **示例**
```javascript
// 异步读取文件夹内容
fs.readdir('./', (err, files) => {
  if (err) {
    console.error('读取文件夹内容失败:', err);
    return;
  }
  console.log('文件夹内容:', files);
});

// 同步读取文件夹内容
try {
  const files = fs.readdirSync('./');
  console.log('文件夹内容:', files);
} catch (err) {
  console.error('读取文件夹内容失败:', err);
}
```

---

### **3.3 删除文件夹**
- 使用 `fs.rmdir`（异步）或 `fs.rmdirSync`（同步）。
- 使用 `fs.rm` 支持递归删除。

#### **示例**
```javascript
// 异步删除文件夹
fs.rmdir('newDir', (err) => {
  if (err) {
    console.error('删除文件夹失败:', err);
    return;
  }
  console.log('文件夹删除成功');
});

// 使用递归删除文件夹
fs.rm('newDir', { recursive: true, force: true }, (err) => {
  if (err) {
    console.error('递归删除文件夹失败:', err);
    return;
  }
  console.log('文件夹递归删除成功');
});
```

---

## **4. 文件流操作**

### **4.1 读取流**
- 使用 `fs.createReadStream` 创建读取流。

#### **示例**
```javascript
const readStream = fs.createReadStream('input.txt', 'utf8');
readStream.on('data', (chunk) => {
  console.log('读取到数据:', chunk);
});
readStream.on('end', () => {
  console.log('读取完成');
});
```

---

### **4.2 写入流**
- 使用 `fs.createWriteStream` 创建写入流。

#### **示例**
```javascript
const writeStream = fs.createWriteStream('output.txt');
writeStream.write('Hello, ');
writeStream.write('Node.js!');
writeStream.end();
writeStream.on('finish', () => {
  console.log('写入完成');
});
```

---

### **4.3 管道流**
- 管道流用于将一个流的输出直接连接到另一个流的输入。

#### **示例**
```javascript
const readStream = fs.createReadStream('input.txt');
const writeStream = fs.createWriteStream('output.txt');

readStream.pipe(writeStream);

writeStream.on('finish', () => {
  console.log('文件复制完成');
});
```

---

## **5. 文件属性操作**

### **5.1 检查文件或目录是否存在**
- 使用 `fs.existsSync`。

#### **示例**
```javascript
if (fs.existsSync('example.txt')) {
  console.log('文件存在');
} else {
  console.log('文件不存在');
}
```

---

### **5.2 获取文件信息**
- 使用 `fs.stat`（异步）或 `fs.statSync`（同步）。

#### **示例**
```javascript
fs.stat('example.txt', (err, stats) => {
  if (err) {
    console.error('获取文件信息失败:', err);
    return;
  }
  console.log('文件信息:', stats);
});
```

---

## **总结**

`fs` 模块是 Node.js 中操作文件和目录的核心工具，支持多种操作方式（同步和异步）。在实际开发中，推荐优先使用异步方法以避免阻塞事件循环。通过熟练掌握 `fs` 模块，可以高效地处理文件系统相关的任务。