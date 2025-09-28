
# ! 1. Python 简介
# * Python 是一种高级、通用、解释型编程语言，语法简洁，易学易用，适合初学者。
# ? 标准语法：无
# 参数说明：无
# 示例：无
# TODO: 广泛应用于数据分析、人工智能、Web开发、自动化、科学计算等领域。

# ! 2. 基础语法
# * Python 采用缩进表示代码块，变量无需声明类型，支持多种注释和字符串格式化方式。
# ? 标准语法：
#   单行注释：# 注释内容
#   多行注释：''' 注释内容 ''' 或 """ 注释内容 """
#   变量赋值：a = 10
#   字符串格式化：%, str.format(), f-string
# 参数说明：
#   缩进：通常为4个空格
#   变量名区分大小写
# 示例：
a = 10
name = "Tom"
# TODO: 推荐使用 f-string 格式化字符串，语法简洁高效。

# ! 3. 数据类型与常用方法
# * Python 支持多种内置数据类型，包括数字、字符串、列表、元组、字典、集合等。
# ? 标准语法：
#   int, float, complex, str, list, tuple, dict, set
# 参数说明：见下方各节
# 示例：见下方各节
# TODO: 字符串、列表、元组都支持切片操作，字典和集合支持高效查找。

# ! 3.1 数字类型
# * 包括 int（整数）、float（浮点数）、complex（复数），支持常用数学方法。
# ? 标准语法：a = 5; b = 3.14; c = 2 + 3j
# 参数说明：无
# 示例：
a = 5
b = 3.14
c = 2 + 3j
# TODO: int 支持 bit_length，float 支持 is_integer，complex 支持 real/imag/conjugate。

# ! 3.2 字符串（str）
# * 字符串不可变，支持切片、拼接、查找、编码解码等操作。
# ? 标准语法：s = "hello"
# 参数说明：无
# 示例：
s = "hello"
print(s.upper())      # 转大写
print(s.lower())      # 转小写
print(s[:4])          # 切片
print(s.replace("l", "x"))  # 替换
print(s.find("e"))    # 查找
print(s.split('e'))   # 分割
print(s.startswith('he'))   # 前缀判断
print(len(s))         # 长度
# TODO: 字符串支持多种编码与解码方式，推荐使用 utf-8。

# ! 3.2.1 字符串编码与解码
# * 支持多种编码格式，常用 utf-8。
# ? 标准语法：
#   编码：str.encode(encoding)
#   解码：bytes.decode(encoding)
# 参数说明：
#   encoding：编码格式，如 "utf-8"
# 示例：
s = "你好，Python"
b = s.encode("utf-8")
s2 = b.decode("utf-8")
# TODO: 编码/解码时可指定错误处理方式，如 errors="ignore"。

# ! 3.2.2 切片操作
# * 切片用于截取序列的部分元素，支持步长和反向切片。
# ? 标准语法：序列[起始:结束:步长]
# 参数说明：
#   起始：起始下标，默认0
#   结束：结束下标，不包含
#   步长：可为负，实现反向切片
# 示例：
lst = [0, 1, 2, 3, 4, 5]
print(lst[1:4])    # [1, 2, 3]
print(lst[::2])    # [0, 2, 4]
print(lst[::-1])   # [5, 4, 3, 2, 1, 0]
# TODO: 字符串、列表、元组都支持切片。

# ! 3.3 列表（list）
# * 可变序列，支持增删改查和切片赋值。
# ? 标准语法：lst = [1, 2, 3]
# 参数说明：无
# 示例：
lst = [1, 2, 3]
lst.append(4)
lst.insert(1, 9)
lst.remove(2)
lst.pop()
lst[0] = 10
lst.sort()
lst.reverse()
lst.extend([4, 5, 6])
# TODO: 列表支持切片赋值和多种遍历方式。

# ! 3.4 元组（tuple）
# * 不可变序列，常用于不可更改的数据。
# ? 标准语法：t = (1, 2, 3)
# 参数说明：无
# 示例：
t = (1, 2, 3)
print(t.count(2))
print(t.index(3))
# TODO: 只有一个元素的元组需加逗号，如 (1,)

# ! 3.5 字典（dict）
# * 键值对集合，支持高效查找和多种操作。
# ? 标准语法：d = {"name": "Tom", "age": 18}
# 参数说明：无
# 示例：
d = {"name": "Tom", "age": 18}
d["age"] = 20
d["gender"] = "男"
d.pop("name")
d.update({"age": 23})
print("age" in d)
# TODO: 字典 keys/values/items 支持遍历。

# ! 3.6 集合（set）
# * 无序不重复元素集合，常用于去重和集合运算。
# ? 标准语法：s = {1, 2, 3}
# 参数说明：无
# 示例：
s = {1, 2, 3}
s.add(4)
s.remove(2)
print(s.union({3, 4, 5}))
# TODO: 集合支持并集、交集、差集等操作。

# ! 4. 运算符
# * 包括算术、比较、逻辑、成员、赋值等运算符。
# ? 标准语法：+ - * / // % ** == != > < >= <= and or not in not in = += -= *= /=
# 参数说明：无
# 示例：
a = 5
b = 2
print(a + b, a > b, a and b)
print(2 in [1, 2, 3])
# TODO: Python 支持链式比较，如 1 < a < 10。

# ! 5. 条件与循环
# * 支持 if/elif/else 条件语句和 for/while 循环，支持 break/continue/pass 控制。
# ? 标准语法：
#   if 条件: ...
#   for 变量 in 序列: ...
#   while 条件: ...
# 参数说明：无
# 示例：
for i in range(3):
    print(i)
if a > 0:
    print("正数")
# TODO: for 可遍历任意可迭代对象。

# ! 6. 函数
# * 支持默认参数、可变参数、关键字参数、匿名函数和作用域控制。
# ? 标准语法：
#   def 函数名(参数): ...
#   lambda 参数: 表达式
# 参数说明：
#   *args：可变参数
#   **kwargs：关键字参数
# 示例：
def add(a, b=2, *args, **kwargs):
    return a + b
f = lambda x, y: x + y
# TODO: global/nonlocal 控制变量作用域。

# ! 7. 常用内置函数
# * Python 提供丰富的内置函数，无需导入即可使用。
# ? 标准语法：print(), len(), type(), range(), enumerate(), zip(), map(), filter(), sorted(), input(), sum(), max(), min(), abs(), eval(), help(), id(), isinstance(), dir(), open()
# 参数说明：见下方各节
# 示例：
print(len([1, 2, 3]))
print(list(map(str.upper, ['a', 'b'])))
# TODO: 推荐多用 help() 查看函数用法。

# ! 8. 模块与包
# * 支持多种导入方式，便于代码复用和组织。
# ? 标准语法：
#   import 模块
#   from 模块 import 成员
#   import 模块 as 别名
#   from . import sibling_module
# 参数说明：无
# 示例：
import math
from math import sqrt
import mymodule as mm
# TODO: 相对导入仅限包内模块间使用。

# ! 9. 文件操作
# * 支持文本和二进制文件的读写，推荐使用 with 上下文管理器。
# ? 标准语法：
#   with open("文件名", "模式", encoding="utf-8") as f: ...
# 参数说明：
#   模式："r" 读，"w" 写，"a" 追加，"b" 二进制
# 示例：
with open("test.txt", "w") as f:
    f.write("hello")
with open("test.txt", "r") as f:
    content = f.read()
# TODO: with 可自动关闭文件，避免资源泄漏。

# ! 10. 异常处理
# * 支持 try/except/finally 结构，常见异常有 ValueError、TypeError、IOError、KeyError 等。
# ? 标准语法：
#   try: ...
#   except 异常类型: ...
#   finally: ...
# 参数说明：无
# 示例：
try:
    x = 1 / 0
except ZeroDivisionError:
    print("除零错误")
finally:
    print("结束")
# TODO: 可用 raise 抛出自定义异常。

# ! 11. 面向对象编程（OOP）
# * 支持类、对象、继承、多态、封装、属性装饰器、魔术方法、单例模式等。
# ? 标准语法：
#   class 类名: ...
#   def __init__(self, ...): ...
#   @property, @classmethod, @staticmethod
# 参数说明：见下方各节
# 示例：
class Animal:
    def __init__(self, name):
        self.name = name
    def speak(self):
        print(self.name + " 叫了一声")
dog = Animal("小狗")
dog.speak()
# TODO: 推荐用 @property 控制属性访问，合理使用继承和多态。

# ! 12. 常用标准库
# * Python 内置丰富的标准库，涵盖操作系统、数学、时间、正则、JSON、日志、数据结构等。
# ? 标准语法：import os, sys, math, datetime, random, re, json, logging, collections
# 参数说明：见下方各节
# 示例：
import os, sys, math, datetime, random, re, json, logging, collections
# TODO: 推荐优先用标准库，减少第三方依赖。

# ! 13. 第三方库与虚拟环境
# * 推荐用 pip 管理第三方库，用 venv/virtualenv 创建虚拟环境，避免依赖冲突。
# ? 标准语法：
#   pip install 包名
#   python3 -m venv venv
#   source venv/bin/activate
# 参数说明：无
# 示例：
# pip install requests
# TODO: 虚拟环境可隔离项目依赖，便于部署和迁移。

# ! 14. 代码规范
# * 遵循 PEP8 编码规范，变量名小写加下划线，类名首字母大写，缩进4空格。
# ? 标准语法：无
# 参数说明：无
# 示例：无
# TODO: 推荐用 flake8/pylint/black 等工具自动检查和格式化代码。

# ! 15. 补充与易混点
# * 常见易混点：可变/不可变类型、深浅拷贝、is 与 == 区别、全局变量与局部变量、装饰器用法等。
# ? 标准语法：见各相关节
# 参数说明：无
# 示例：无
# TODO: 推荐多查官方文档和社区资料，避免常见坑。

# ! 总结
# * Python 语法简洁、功能强大，适合各类开发场景。建议多实践、多查文档、注重规范，逐步掌握进阶用法。
# ? 标准语法：无
# 参数说明：无
# 示例：无
# TODO: 持续关注 Python 官方文档和社区最佳实践，提升编程能力。