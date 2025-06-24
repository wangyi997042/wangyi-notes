# Python 文件操作详细总结（含注意事项与常见问题，丰富场景示例）

Python 文件操作在实际开发中应用广泛，以下总结涵盖了常见用法、注意事项、常见问题，并补充了更多实际场景的操作示例。

---

## 1. 打开文件

**基本语法：**
```python
# 推荐加 encoding，避免中文乱码
f = open("test.txt", mode='r', encoding='utf-8')
```
- 常见问题：忘记加 encoding 导致乱码，路径写错找不到文件，权限不足无法打开。

---

## 2. 读取文件

### 2.1 读取全部内容
```python
with open("test.txt", "r", encoding="utf-8") as f:
    content = f.read()
    print(content)
```
> 注意：大文件不建议一次性读取，容易内存溢出。

### 2.2 逐行读取（推荐大文件）
```python
with open("test.txt", "r", encoding="utf-8") as f:
    for line in f:
        print(line.strip())
```

### 2.3 读取指定字节/字符数
```python
with open("test.txt", "r", encoding="utf-8") as f:
    print(f.read(10))  # 读取前10个字符
```

### 2.4 读取多行到列表
```python
with open("test.txt", "r", encoding="utf-8") as f:
    lines = f.readlines()
    print(lines)
```

### 2.5 读取配置文件（如ini、txt）
```python
config = {}
with open("config.txt", "r", encoding="utf-8") as f:
    for line in f:
        if '=' in line:
            k, v = line.strip().split('=', 1)
            config[k] = v
print(config)
```

**常见问题：**
- 文件内容太大，`read()` 导致内存溢出。
- 文件未关闭，导致文件被锁定或内容未及时写入。

---

## 3. 写入文件

### 3.1 覆盖写入
```python
with open("test.txt", "w", encoding="utf-8") as f:
    f.write("Hello, world!\n")
    f.write("第二行内容\n")
```
> 注意：`w` 模式会清空原内容，重要文件建议先备份。

### 3.2 追加写入
```python
with open("test.txt", "a", encoding="utf-8") as f:
    f.write("追加内容\n")
```

### 3.3 写入多行
```python
lines = ["第一行\n", "第二行\n", "第三行\n"]
with open("test.txt", "w", encoding="utf-8") as f:
    f.writelines(lines)
```
> 注意：`writelines` 不会自动加换行符，需手动添加。

### 3.4 日志写入（带时间戳）
```python
from datetime import datetime
with open("log.txt", "a", encoding="utf-8") as f:
    f.write(f"{datetime.now()} - 程序启动\n")
```

### 3.5 写入用户输入
```python
with open("user_input.txt", "a", encoding="utf-8") as f:
    while True:
        data = input("请输入内容（输入exit退出）：")
        if data == "exit":
            break
        f.write(data + "\n")
```

**常见问题：**
- 忘记加换行符，导致多行内容连在一起。
- 文件未关闭，数据未写入磁盘。

---

## 4. 文件指针与操作

### 4.1 文件指针移动与读取
```python
with open("test.txt", "r", encoding="utf-8") as f:
    print(f.tell())      # 0，文件开头
    f.read(5)
    print(f.tell())      # 5
    f.seek(0)            # 回到文件开头
    print(f.read())
```
> 注意：二进制模式下 seek 和 tell 单位是字节，文本模式下是字符。

### 4.2 读写混合操作
```python
with open("test.txt", "r+", encoding="utf-8") as f:
    content = f.read()
    f.seek(0)
    f.write("新内容覆盖原内容\n")
```
> 注意：读写混用时要注意指针位置，避免数据错乱。

---

## 5. 关闭文件

- 推荐使用 `with open(...) as f:` 自动关闭文件，防止资源泄漏。
- 手动关闭：`f.close()`

**常见问题：**
- 文件未关闭，导致文件被占用或数据未写入磁盘。

---

## 6. 处理二进制文件

### 6.1 读取和写入图片
```python
with open("img.png", "rb") as f:
    data = f.read()
with open("copy.png", "wb") as f:
    f.write(data)
```
> 注意：二进制文件不能加 encoding 参数，读写的都是 bytes 类型。

### 6.2 读取音频/视频文件
```python
with open("audio.mp3", "rb") as f:
    chunk = f.read(1024)  # 分块读取
    while chunk:
        # 处理chunk
        chunk = f.read(1024)
```

**常见问题：**
- 忘记加 `'b'`，导致文件损坏。
- 用文本模式打开二进制文件，内容会乱码。

---

## 7. 文件异常处理

### 7.1 基本异常处理
```python
try:
    with open("nofile.txt", "r") as f:
        data = f.read()
except FileNotFoundError:
    print("文件不存在")
except PermissionError:
    print("没有权限访问该文件")
```
> 注意：文件路径、权限、磁盘空间等问题都可能导致异常。

### 7.2 批量读取多个文件，部分文件可能不存在
```python
files = ["a.txt", "b.txt", "c.txt"]
for fname in files:
    try:
        with open(fname, "r", encoding="utf-8") as f:
            print(f"{fname}内容：", f.read())
    except FileNotFoundError:
        print(f"{fname} 不存在，跳过")
```

**常见问题：**
- 文件路径写错，导致找不到文件。
- 没有权限写入系统目录。

---

## 8. 其它常用操作

### 8.1 判断文件或目录是否存在
```python
import os
print(os.path.exists("test.txt"))      # 判断文件或目录是否存在
print(os.path.isfile("test.txt"))      # 判断是否为文件
print(os.path.isdir("myfolder"))       # 判断是否为目录
```

### 8.2 获取文件大小、绝对路径、修改时间等
```python
import os
print(os.path.getsize("test.txt"))         # 获取文件大小（字节）
print(os.path.abspath("test.txt"))         # 获取文件绝对路径
print(os.path.getmtime("test.txt"))        # 获取文件最后修改时间（时间戳）
print(os.path.getatime("test.txt"))        # 获取文件最后访问时间（时间戳）
print(os.path.getctime("test.txt"))        # 获取文件创建时间（时间戳，部分系统为最后修改时间）
```

### 8.3 删除、重命名、复制、移动文件/目录
```python
import os, shutil
os.remove("test.txt")                      # 删除文件
os.rename("old.txt", "new.txt")            # 重命名文件或目录
shutil.copy("a.txt", "b.txt")              # 复制文件
shutil.copytree("dir1", "dir2")            # 复制整个目录
shutil.move("a.txt", "folder/a.txt")       # 移动文件或目录
shutil.rmtree("dir2")                      # 递归删除目录
```

### 8.4 创建目录
```python
import os
os.mkdir("myfolder")                       # 创建单层目录
os.makedirs("a/b/c", exist_ok=True)        # 递归创建多层目录，已存在不会报错
```

### 8.5 遍历目录下所有文件和子目录
```python
import os
for root, dirs, files in os.walk("."):
    print("当前目录：", root)
    print("子目录：", dirs)
    print("文件：", files)
```

### 8.6 读取目录下所有文件名
```python
import os
print(os.listdir("."))                     # 列出当前目录下所有文件和文件夹
```

### 8.7 路径拼接与分割（跨平台）
```python
import os
path = os.path.join("folder", "file.txt")  # 拼接路径
dirname = os.path.dirname(path)            # 获取目录名
basename = os.path.basename(path)          # 获取文件名
name, ext = os.path.splitext(path)         # 分离文件名和扩展名
print(path, dirname, basename, name, ext)
```

### 8.8 复制/移动/删除文件时的异常处理
```python
import os, shutil
try:
    shutil.copy("a.txt", "b.txt")
    os.remove("a.txt")
except FileNotFoundError:
    print("文件不存在")
except PermissionError:
    print("没有权限操作文件")
```

---

**常见问题：**
- 路径拼接用字符串，跨平台出错，建议用 `os.path.join()`。
- 删除/重命名/移动文件时，目标文件正在被占用会报错。
- 递归删除目录需谨慎，`shutil.rmtree()` 会删除整个目录及其内容，无法恢复。

---
```## 8. 其它常用操作

### 8.1 判断文件或目录是否存在
```python
import os
print(os.path.exists("test.txt"))      # 判断文件或目录是否存在
print(os.path.isfile("test.txt"))      # 判断是否为文件
print(os.path.isdir("myfolder"))       # 判断是否为目录
```

### 8.2 获取文件大小、绝对路径、修改时间等
```python
import os
print(os.path.getsize("test.txt"))         # 获取文件大小（字节）
print(os.path.abspath("test.txt"))         # 获取文件绝对路径
print(os.path.getmtime("test.txt"))        # 获取文件最后修改时间（时间戳）
print(os.path.getatime("test.txt"))        # 获取文件最后访问时间（时间戳）
print(os.path.getctime("test.txt"))        # 获取文件创建时间（时间戳，部分系统为最后修改时间）
```

### 8.3 删除、重命名、复制、移动文件/目录
```python
import os, shutil
os.remove("test.txt")                      # 删除文件
os.rename("old.txt", "new.txt")            # 重命名文件或目录
shutil.copy("a.txt", "b.txt")              # 复制文件
shutil.copytree("dir1", "dir2")            # 复制整个目录
shutil.move("a.txt", "folder/a.txt")       # 移动文件或目录
shutil.rmtree("dir2")                      # 递归删除目录
```

### 8.4 创建目录
```python
import os
os.mkdir("myfolder")                       # 创建单层目录
os.makedirs("a/b/c", exist_ok=True)        # 递归创建多层目录，已存在不会报错
```

### 8.5 遍历目录下所有文件和子目录
```python
import os
for root, dirs, files in os.walk("."):
    print("当前目录：", root)
    print("子目录：", dirs)
    print("文件：", files)
```

### 8.6 读取目录下所有文件名
```python
import os
print(os.listdir("."))                     # 列出当前目录下所有文件和文件夹
```

### 8.7 路径拼接与分割（跨平台）
```python
import os
path = os.path.join("folder", "file.txt")  # 拼接路径
dirname = os.path.dirname(path)            # 获取目录名
basename = os.path.basename(path)          # 获取文件名
name, ext = os.path.splitext(path)         # 分离文件名和扩展名
print(path, dirname, basename, name, ext)
```

### 8.8 复制/移动/删除文件时的异常处理
```python
import os, shutil
try:
    shutil.copy("a.txt", "b.txt")
    os.remove("a.txt")
except FileNotFoundError:
    print("文件不存在")
except PermissionError:
    print("没有权限操作文件")
```

---

**常见问题：**
- 路径拼接用字符串，跨平台出错，建议用 `os.path.join()`。
- 删除/重命名/移动文件时，目标文件正在被占用会报错。
- 递归删除目录需谨慎，`shutil.rmtree()` 会删除整个目录及其内容，无法恢复。

---

## 9. 小结与开发常见问题汇总

- 推荐用 `with open()` 自动管理文件资源。
- 读写大文件时建议逐行处理，节省内存。
- 注意编码问题，文本文件建议统一用 `utf-8`。
- 文件操作涉及路径时，建议用 `os.path` 相关方法处理跨平台兼容性。
- 写入文件时注意加换行符，避免内容连在一起。
- 文件未关闭时数据可能未写入磁盘，`with` 语句可避免此问题。
- 中文乱码：未指定 `encoding` 或编码不一致。
- 文件找不到：路径错误或文件未创建。
- 权限报错：没有读写权限，尤其是在系统目录或只读介质。
- 文件内容丢失：用 `'w'` 模式覆盖了原文件。
- 读写二进制文件忘记加 `'b'`，导致文件损坏。
- 路径拼接用字符串，跨平台出错，建议用 `os.path.join()`。
- 大文件一次性读入内存，导致内存溢出。

---
