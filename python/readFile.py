
# ! 1. 打开文件
# * 用 open() 打开文件，推荐加 encoding，避免中文乱码。
# ? 标准语法：open("文件名", mode="r", encoding="utf-8")
#   mode：r（读）、w（写）、a（追加）、b（二进制）、+（读写）
#   encoding：文本文件建议统一用 utf-8
# 示例：
f = open("test.txt", mode='r', encoding='utf-8')
# TODO: 路径写错、权限不足、未加 encoding 都可能导致异常。

# ! 2. 读取文件
# * 支持一次性读取、逐行读取、读取指定字节、读取多行到列表等多种方式。
# ? 标准语法：
with open("test.txt", "r", encoding="utf-8") as f:
    content = f.read()           # 读取全部
    for line in f:               # 逐行读取
        print(line.strip())
    f.seek(0)
    print(f.read(10))            # 读取前10个字符
    f.seek(0)
    lines = f.readlines()        # 读取多行到列表
# 示例：见上
# TODO: 大文件不建议一次性 read()，容易内存溢出。

# ! 3. 写入文件
# * 支持覆盖写入、追加写入、写入多行、日志写入、写入用户输入等。
# ? 标准语法：
with open("test.txt", "w", encoding="utf-8") as f:
    f.write("Hello, world!\n")
with open("test.txt", "a", encoding="utf-8") as f:
    f.write("追加内容\n")
lines = ["第一行\n", "第二行\n"]
with open("test.txt", "w", encoding="utf-8") as f:
    f.writelines(lines)
# 示例：见上
# TODO: w 模式会清空原内容，writelines 不自动加换行符。

# ! 4. 文件指针与混合操作
# * 文件对象支持 tell() 获取指针位置，seek() 移动指针，r+ 支持读写混合。
# ? 标准语法：
with open("test.txt", "r+", encoding="utf-8") as f:
    print(f.tell())
    f.read(5)
    f.seek(0)
    f.write("新内容\n")
# 示例：见上
# TODO: 读写混用时注意指针位置，避免数据错乱。

# ! 5. 关闭文件
# * 推荐用 with 自动关闭文件，防止资源泄漏。手动关闭用 f.close()。
# ? 标准语法：
with open("test.txt", "r") as f:
    data = f.read()
# 示例：见上
# TODO: 文件未关闭可能导致数据未写入磁盘或文件被占用。

# ! 6. 二进制文件操作
# * 用 rb/wb/ab 模式读写图片、音频、视频等二进制文件，操作 bytes 类型。
# ? 标准语法：
with open("img.png", "rb") as f:
    data = f.read()
with open("copy.png", "wb") as f:
    f.write(data)
# 示例：见上
# TODO: 二进制文件不能加 encoding，文本模式打开二进制文件会乱码。

# ! 7. 文件异常处理
# * 用 try-except 捕获文件不存在、权限不足等异常，批量操作时可跳过不存在文件。
# ? 标准语法：
try:
    with open("nofile.txt", "r") as f:
        data = f.read()
except FileNotFoundError:
    print("文件不存在")
except PermissionError:
    print("没有权限访问该文件")
# 示例：见上
# TODO: 推荐捕获具体异常类型，避免 except: 捕获所有异常。

# ! 8. 文件与目录操作（os/shutil）
# * 用 os 和 shutil 进行文件/目录的判断、创建、删除、重命名、复制、移动、遍历等操作，支持跨平台路径拼接。
# ? 标准语法：
import os, shutil
os.path.exists("test.txt")
os.path.isfile("test.txt")
os.path.isdir("myfolder")
os.mkdir("myfolder")
os.makedirs("a/b/c", exist_ok=True)
os.remove("test.txt")
os.rename("old.txt", "new.txt")
shutil.copy("a.txt", "b.txt")
shutil.copytree("dir1", "dir2")
shutil.move("a.txt", "folder/a.txt")
shutil.rmtree("dir2")
os.listdir(".")
for root, dirs, files in os.walk("."):
    print(root, dirs, files)
os.path.join("folder", "file.txt")
os.path.dirname("folder/file.txt")
os.path.basename("folder/file.txt")
os.path.splitext("folder/file.txt")
# 示例：见上
# TODO: 路径拼接建议用 os.path.join()，递归删除目录需谨慎。

# ! 9. 文件属性与时间
# * 获取文件大小、绝对路径、修改/访问/创建时间等属性。
# ? 标准语法：
os.path.getsize("test.txt")
os.path.abspath("test.txt")
os.path.getmtime("test.txt")
os.path.getatime("test.txt")
os.path.getctime("test.txt")
# 示例：见上
# TODO: 时间戳可用 time.localtime/strftime 格式化。

# ! 10. 临时文件与文件锁（补充）
# * tempfile 可创建临时文件，避免命名冲突。filelock 等库可实现文件锁，防止并发写冲突。
# ? 标准语法：
import tempfile
with tempfile.NamedTemporaryFile(delete=False) as tf:
    tf.write(b"临时内容")
from filelock import FileLock
with FileLock("test.txt.lock"):
    with open("test.txt", "a") as f:
        f.write("安全写入")
# 示例：见上
# TODO: 临时文件适合中间结果存储，文件锁适合多进程/多线程场景。

# ! 11. 文件权限与跨平台兼容（补充）
# * os.chmod 可修改文件权限，os.path 支持跨平台路径处理。
# ? 标准语法：
os.chmod("test.txt", 0o644)
os.path.join("a", "b.txt")
# 示例：见上
# TODO: 权限不足时无法写入/删除文件，建议用 try-except 捕获。

# ! 12. 小结与常见问题汇总
# * 推荐用 with open() 自动管理文件资源，读写大文件建议逐行处理，注意编码、路径、权限、异常、跨平台兼容等问题。
# ? 标准语法：见上
# 示例：见上
# TODO: 常见问题包括中文乱码、文件找不到、权限报错、内容丢失、二进制文件损坏、路径拼接出错、内存溢出等，建议多用 os.path、异常处理和官方文档。