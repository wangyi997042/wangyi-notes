
# ! 1. Python 的数据类型
# * Python 支持多种内置数据类型，常见有 int、float、bool、str、list、tuple、dict、set 等。
# ? 标准语法：a = 1; b = 3.14; c = True; s = "hi"; lst = [1,2]; t = (1,2); d = {"a":1}; st = {1,2}
#   int：整数
#   float：浮点数
#   bool：布尔值
#   str：字符串
#   list：可变序列
#   tuple：不可变序列
#   dict：键值对集合
#   set：无序不重复集合
# 示例：
a = 1
b = 3.14
c = True
s = "hello"
lst = [1, 2, 3]
t = (1, 2, 3)
d = {"a": 1, "b": 2}
st = {1, 2, 3}
# TODO: 推荐熟悉各类型常用方法和转换。

# ! 2. 深拷贝与浅拷贝
# * 浅拷贝只复制最外层对象，深拷贝递归复制所有层级，互不影响。
# ? 标准语法：
#   import copy
#   b = copy.copy(a)      # 浅拷贝
#   c = copy.deepcopy(a)  # 深拷贝
# 参数说明：
#   copy.copy：浅拷贝
#   copy.deepcopy：深拷贝
# 示例：
import copy
a = [1, [2, 3]]
b = copy.copy(a)
c = copy.deepcopy(a)
a[1][0] = 99
print(b)  # [1, [99, 3]]
print(c)  # [1, [2, 3]]
# TODO: 字典、列表等嵌套结构建议用深拷贝。

# ! 3. 单例模式
# * 单例模式保证类只实例化一个对象，常用 __new__、装饰器或元类实现。
# ? 标准语法：
class Singleton:
    _instance = None
    def __new__(cls, *args, **kwargs):
        if not cls._instance:
            cls._instance = super().__new__(cls)
        return cls._instance
# 参数说明：
#   __new__：控制对象创建
# 示例：见上
# TODO: 线程安全单例需加锁。

# ! 4. 装饰器
# * 装饰器本质是闭包函数，用于扩展函数/方法/类功能，常用于日志、权限、缓存等。
# ? 标准语法：
def log(func):
    def wrapper(*args, **kwargs):
        print("调用前")
        result = func(*args, **kwargs)
        print("调用后")
        return result
    return wrapper

@log
def hello():
    print("hello")
# 参数说明：
#   func：被装饰函数
# 示例：见上
# TODO: 带参数装饰器需多一层嵌套。

# ! 5. 生成器
# * 生成器用 yield 生成数据，惰性计算，节省内存。普通函数用 return 一次性返回。
# ? 标准语法：
def gen():
    for i in range(3):
        yield i
g = gen()
print(next(g))  # 0
# 参数说明：
#   yield：生成器暂停点
# 示例：见上
# TODO: 生成器只能遍历一次。

# ! 6. 垃圾回收机制
# * Python 采用引用计数为主，结合标记-清除和分代回收，自动管理内存。
# ? 标准语法：无
# 参数说明：无
# 示例：无
# TODO: 循环引用由垃圾回收器处理，del 可手动释放引用。

# ! 7. 多线程与多进程
# * 多线程适合 I/O 密集型，线程间共享内存，受 GIL 限制。多进程适合 CPU 密集型，进程独立，可并行。
# ? 标准语法：
import threading
import multiprocessing
def worker(): pass
t = threading.Thread(target=worker)
p = multiprocessing.Process(target=worker)
# 参数说明：
#   target：目标函数
# 示例：见上
# TODO: 多进程开销大，适合重计算任务。

# ! 8. GIL（全局解释器锁）
# * GIL 限制同一时刻只有一个线程执行 Python 字节码，影响多线程并行，适合 I/O 密集型任务。
# ? 标准语法：无
# 参数说明：无
# 示例：无
# TODO: 多核并行用多进程或 C 扩展。

# ! 9. 协程与 asyncio
# * 协程用 async/await 语法，适合高并发 I/O，常用 asyncio 库。
# ? 标准语法：
import asyncio
async def hello():
    print("Hello ...")
    await asyncio.sleep(1)
    print("... World!")
asyncio.run(hello())
# 参数说明：
#   async def：定义协程
#   await：等待异步操作
# 示例：见上
# TODO: 协程适合网络、爬虫、异步数据库等。

# ! 10. 列表推导式与生成器表达式
# * 列表推导式返回列表，立即计算。生成器表达式返回生成器，惰性计算，节省内存。
# ? 标准语法：
lst = [x for x in range(5)]
gen = (x for x in range(5))
# 参数说明：无
# 示例：见上
# TODO: 大数据量推荐用生成器表达式。

# ! 11. 常见魔术方法
# * 魔术方法以 __ 开头结尾，支持对象初始化、字符串化、运算符重载等。
# ? 标准语法：
class Demo:
    def __init__(self, x): self.x = x
    def __str__(self): return f"Demo({self.x})"
    def __len__(self): return 1
# 参数说明：
#   __init__：初始化
#   __str__：字符串
#   __len__：长度
# 示例：见上
# TODO: 魔术方法可自定义对象行为。

# ! 12. 异常处理与自定义异常
# * 用 try-except-finally 结构处理异常，自定义异常需继承 Exception。
# ? 标准语法：
try:
    1 / 0
except ZeroDivisionError:
    print("除零错误")
finally:
    print("结束")

class MyError(Exception):
    pass
# 参数说明：无
# 示例：见上
# TODO: 推荐自定义异常类用于业务错误。

# ! 13. @property 属性
# * @property 把方法变为属性调用，常用于私有属性封装和只读属性。
# ? 标准语法：
class Person:
    def __init__(self, age):
        self._age = age
    @property
    def age(self):
        return self._age
    @age.setter
    def age(self, value):
        self._age = value
# 参数说明：
#   @property：只读属性
#   @xxx.setter：可写属性
# 示例：见上
# TODO: 推荐用 @property 控制属性访问。

# ! 14. 模块与包导入
# * 绝对导入用 import package.module，相对导入用 from . import module（仅限包内）。
# ? 标准语法：
import os
from . import sibling_module
# 参数说明：无
# 示例：见上
# TODO: 推荐优先用绝对导入，避免歧义。

# ! 15. 常用标准库与第三方库
# * 标准库如 os、sys、math、datetime、random、re、json、logging、collections、itertools、functools。第三方库如 requests、numpy、pandas、matplotlib、flask、pytest。
# ? 标准语法：import 库名
# 参数说明：无
# 示例：
import os, sys, math, datetime, random, re, json, logging, collections, itertools, functools
# TODO: 推荐优先用标准库，减少依赖。

# ! 16. 上下文管理器
# * 实现 __enter__ 和 __exit__ 方法，或用 contextlib 装饰器，常用于文件、数据库、锁等资源管理。
# ? 标准语法：
class MyContext:
    def __enter__(self): print("进入"); return self
    def __exit__(self, exc_type, exc_val, exc_tb): print("退出")
with MyContext():
    print("处理中")
# 参数说明：无
# 示例：见上
# TODO: 推荐用 with 管理资源，避免泄漏。

# ! 17. 反射
# * 反射用于运行时动态获取和操作对象信息，常用 getattr、setattr、hasattr、delattr。
# ? 标准语法：
class Foo:
    def bar(self): print("bar")
obj = Foo()
method = getattr(obj, "bar")
method()
# 参数说明：无
# 示例：见上
# TODO: 反射常用于插件、自动注册等场景。

# ! 18. 多态
# * 通过继承和方法重写实现多态，父类引用指向子类对象，调用方法时执行子类实现。
# ? 标准语法：
class Animal:
    def speak(self): pass
class Dog(Animal):
    def speak(self): print("汪")
a = Dog()
a.speak()
# 参数说明：无
# 示例：见上
# TODO: 多态提升代码扩展性和灵活性。

# ! 19. 闭包与装饰器关系
# * 闭包是函数内部定义并返回的函数，能访问外部变量。装饰器本质是闭包的应用。
# ? 标准语法：
def outer(x):
    def inner():
        print(x)
    return inner
f = outer(10)
f()
# 参数说明：无
# 示例：见上
# TODO: 装饰器常用闭包实现。

# ! 20. 性能优化
# * 用生成器、推导式减少内存，合理选数据结构，多进程/线程/协程提升并发，Cython/Numba 加速，内置函数和缓存提升效率。
# ? 标准语法：见各相关节
# 参数说明：无
# 示例：无
# TODO: 推荐用 functools.lru_cache 做缓存。

# ! 21. 类型注解与数据类（补充）
# * 类型注解提升代码可读性，数据类简化数据结构定义。
# ? 标准语法：
from typing import List, Dict
def add(a: int, b: int) -> int: return a + b
from dataclasses import dataclass
@dataclass
class Point:
    x: int
    y: int
# 参数说明：见上
# 示例：见上
# TODO: 推荐新项目用类型注解和数据类。

# ! 22. 单元测试与正则表达式（补充）
# * 单元测试用 unittest/pytest，正则用 re 模块。
# ? 标准语法：
import unittest, re
class TestAdd(unittest.TestCase):
    def test_add(self): self.assertEqual(add(1,2), 3)
pattern = re.compile(r"\d+")
pattern.match("123")
# 参数说明：无
# 示例：见上
# TODO: 推荐用 pytest 简化测试，正则常用于文本处理。

# ! 23. 网络编程与数据库（补充）
# * 网络编程用 socket/http，数据库用 sqlite3/pymysql。
# ? 标准语法：
import socket, sqlite3
# socket 示例
s = socket.socket()
# sqlite3 示例
conn = sqlite3.connect('test.db')
# 参数说明：见官方文档
# 示例：见上
# TODO: 推荐用 requests 处理 HTTP，用 ORM 简化数据库操作。

# ! 总结
# * 掌握常见面试题及补充知识点，能应对大多数 Python 面试场景，建议多实践、多查文档、注重规范。
# ? 标准语法：无
# 参数说明：无
# 示例：无
# TODO: 持续关注 Python 官方文档和社区最佳实践，提升编程能力。