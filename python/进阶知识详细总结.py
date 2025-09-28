
# ! 1. 装饰器（Decorator）
# * 本质是一个函数，用于在不修改原函数代码的情况下扩展函数功能，常用于日志、权限校验、缓存等场景，可装饰函数、方法、类。
# ? 标准语法：
#   def decorator(func): ...
#   @decorator
#   def func(...): ...
# 参数说明：
#   func：被装饰的函数
# 示例：
def my_decorator(func):
    def wrapper(*args, **kwargs):
        print("函数开始执行")
        result = func(*args, **kwargs)
        print("函数执行结束")
        return result
    return wrapper

@my_decorator
def say_hello():
    print("Hello!")
say_hello()
# TODO: 带参数装饰器需多一层嵌套，@repeat(n) 形式。

# ! 2. 生成器（Generator）
# * 生成器是惰性生成数据的特殊迭代器，节省内存，适合大数据流或无限序列，支持 send、close、throw 等方法。
# ? 标准语法：
#   def gen(): yield ...
#   (expr for x in iterable)
# 参数说明：
#   yield：暂停并返回值
#   send：向生成器内部传值
# 示例：
def count_up(n):
    i = 0
    while i < n:
        yield i
        i += 1
gen = count_up(3)
print(next(gen))  # 0
print(next(gen))  # 1
print(next(gen))  # 2
# TODO: 生成器只能遍历一次，遍历完需重新创建。

# ! 3. 迭代器（Iterator）
# * 迭代器实现了 __iter__ 和 __next__ 方法，支持惰性遍历，适合处理大数据流。
# ? 标准语法：
#   class MyIter:
#       def __iter__(self): return self
#       def __next__(self): ...
# 参数说明：
#   __iter__：返回自身
#   __next__：返回下一个元素
# 示例：
class MyRange:
    def __init__(self, n):
        self.i = 0
        self.n = n
    def __iter__(self):
        return self
    def __next__(self):
        if self.i < self.n:
            val = self.i
            self.i += 1
            return val
        else:
            raise StopIteration
for x in MyRange(3):
    print(x)
# TODO: 迭代器只能遍历一次，遍历完失效。

# ! 4. 推导式（Comprehension）
# * 用于快速生成列表、字典、集合等，语法简洁高效。
# ? 标准语法：
#   [expr for x in iterable]
#   {k: v for k, v in iterable}
#   {expr for x in iterable}
# 参数说明：无
# 示例：
lst = [x * 2 for x in range(5)]
d = {x: x * x for x in range(3)}
s = {x for x in [1, 2, 2, 3]}
# TODO: 推导式可加 if 条件过滤。

# ! 5. 多线程与多进程
# * 多线程适合 I/O 密集型任务，多进程适合 CPU 密集型任务，线程间共享内存，进程间数据独立。
# ? 标准语法：
#   import threading; t = threading.Thread(target=func)
#   import multiprocessing; p = multiprocessing.Process(target=func)
# 参数说明：
#   target：要执行的函数
#   args：参数元组
# 示例：
import threading
def worker():
    print("线程运行")
t = threading.Thread(target=worker)
t.start()
t.join()
from multiprocessing import Process
def proc():
    print("进程运行")
p = Process(target=proc)
p.start()
p.join()
# TODO: 线程适合高并发 I/O，进程适合多核并行。

# ! 6. 协程（Coroutine）与 asyncio
# * 协程是用户态的轻量级线程，适合高并发 I/O，Python 3.5+ 用 async/await 语法，调度由 asyncio 管理。
# ? 标准语法：
#   async def func(): ...
#   await other_coro()
# 参数说明：
#   async def：定义协程
#   await：等待异步操作
# 示例：
import asyncio
async def hello():
    print("Hello ...")
    await asyncio.sleep(1)
    print("... World!")
asyncio.run(hello())
# TODO: 协程适合高并发网络、爬虫、异步数据库等场景。

# ! 7. greenlet 与 gevent
# * greenlet 是底层协程库，手动切换，gevent 基于 greenlet 实现自动协作式并发，适合高并发网络服务。
# ? 标准语法：
#   from greenlet import greenlet
#   import gevent
# 参数说明：见下方各节
# 示例：
from greenlet import greenlet
def foo():
    print("foo step 1")
    gr2.switch()
    print("foo step 2")
def bar():
    print("bar step 1")
    gr1.switch()
    print("bar step 2")
gr1 = greenlet(foo)
gr2 = greenlet(bar)
gr1.switch()
# TODO: gevent 需 monkey.patch_all()，自动异步化标准库 I/O。

# ! 8. 上下文管理器（with语句）
# * 用于资源管理，如文件、数据库连接等，需实现 __enter__ 和 __exit__ 方法。
# ? 标准语法：
#   with open("file") as f: ...
#   class MyCtx: def __enter__(self): ...; def __exit__(self, ...): ...
# 参数说明：无
# 示例：
class MyContext:
    def __enter__(self):
        print("进入上下文")
        return self
    def __exit__(self, exc_type, exc_val, exc_tb):
        print("退出上下文")
with MyContext():
    print("处理中")
# TODO: 推荐用 with 管理文件、锁、数据库等资源。

# ! 9. 反射与元编程
# * 反射用于运行时动态获取对象信息，元类用于控制类的创建过程。
# ? 标准语法：
#   getattr(obj, name)
#   class MyMeta(type): ...
# 参数说明：无
# 示例：
class Foo:
    def bar(self):
        print("bar")
obj = Foo()
method = getattr(obj, "bar")
method()
class MyMeta(type):
    def __new__(cls, name, bases, attrs):
        attrs['added_attr'] = 123
        return super().__new__(cls, name, bases, attrs)
class MyClass(metaclass=MyMeta):
    pass
print(MyClass.added_attr)
# TODO: 反射常用于插件、ORM、自动注册等场景。

# ! 10. 日志与异常高级用法
# * logging 模块支持多级别日志、格式化、文件/控制台输出，异常可自定义类并继承 Exception。
# ? 标准语法：
#   import logging; logging.info("msg")
#   class MyError(Exception): ...
# 参数说明：无
# 示例：
import logging
logging.basicConfig(level=logging.INFO)
logging.info("这是一条信息")
class MyError(Exception): pass
try:
    raise MyError("自定义异常")
except MyError as e:
    print(e)
# TODO: 日志推荐用 logging，异常建议自定义类型。

# ! 11. 常用标准库进阶
# * functools、itertools、collections、contextlib、concurrent.futures 等提供高阶函数、迭代工具、高级数据结构、上下文管理、并发执行等能力。
# ? 标准语法：见下方各节
# 参数说明：无
# 示例：
from functools import partial
def power(base, exp): return base ** exp
square = partial(power, exp=2)
import itertools
for x in itertools.permutations([1, 2, 3]):
    print(x)
# TODO: 推荐多用标准库提升开发效率。

# ! 12. os 模块常用 API
# * os 模块用于操作系统相关功能，支持文件/目录操作、进程管理、环境变量、路径处理等。
# ? 标准语法：import os
# 参数说明：见下方各节
# 示例：
import os
print(os.getcwd())
os.mkdir('testdir')
os.chdir('testdir')
os.chdir('..')
os.rmdir('testdir')
print(os.path.abspath('.'))
# TODO: 路径操作推荐用 os.path，注意跨平台兼容。

# ! 13. sys 模块常用 API
# * sys 模块用于访问和操作 Python 解释器自身，常用于参数、环境、输入输出流、异常处理等。
# ? 标准语法：import sys
# 参数说明：见下方各节
# 示例：
import sys
print(sys.argv)
print(sys.path)
print(sys.version)
print(sys.platform)
# TODO: sys.exit() 可用于脚本提前终止。

# ! 14. time 模块常用 API
# * time 模块用于时间获取、格式化、延时、时间戳处理等操作。
# ? 标准语法：import time
# 参数说明：见下方各节
# 示例：
import time
print(time.time())
print(time.strftime("%Y-%m-%d %H:%M:%S", time.localtime()))
time.sleep(1)
# TODO: 计时推荐用 perf_counter()，延时用 sleep()。

# ! 15. logging 模块常用 API
# * logging 模块支持多级别、格式化、文件/控制台/轮转等多种日志输出方式。
# ? 标准语法：import logging
# 参数说明：见下方各节
# 示例：
import logging
logging.basicConfig(level=logging.INFO)
logging.info("普通信息")
# TODO: 推荐用 basicConfig 快速配置，复杂场景用 logger/handler/formatter。

# ! 16. random 模块常用 API
# * random 模块用于生成伪随机数、随机选择、打乱序列、采样等操作。
# ? 标准语法：import random
# 参数说明：见下方各节
# 示例：
import random
print(random.random())
print(random.randint(1, 10))
lst = [1, 2, 3]
random.shuffle(lst)
print(lst)
# TODO: 随机种子用 seed()，加密场景用 secrets 模块。

# ! 17. 补充与易混点
# * 常见易混点：生成器只能遍历一次、线程/进程/协程适用场景、os 与 sys 区别、异常处理与日志区别等。
# ? 标准语法：见各相关节
# 参数说明：无
# 示例：无
# TODO: 推荐多查官方文档和社区资料，避免常见坑。

# ! 总结
# * Python 进阶内容涵盖装饰器、生成器、迭代器、并发编程、标准库进阶等，建议多实践、多查文档、注重规范，逐步掌握进阶用法。
# ? 标准语法：无
# 参数说明：无
# 示例：无
# TODO: 持续关注 Python 官方文档和社区最佳实践，提升编程能力。