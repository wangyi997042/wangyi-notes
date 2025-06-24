# Python 面试常见问题与详细解答

---

## 1. Python 的数据类型有哪些？各自的特点是什么？

**答：**  
常见数据类型有：
- **int**（整数）：如 1, -5, 100
- **float**（浮点数）：如 3.14, -0.001
- **bool**（布尔）：True, False
- **str**（字符串）："hello"
- **list**（列表）：[1, 2, 3]，可变序列，支持增删改查
- **tuple**（元组）：(1, 2, 3)，不可变序列
- **dict**（字典）：{"a": 1, "b": 2}，键值对集合
- **set**（集合）：{1, 2, 3}，无序不重复元素集合

---

## 2. Python 中的深拷贝和浅拷贝区别？

**答：**  
- **浅拷贝**：只复制最外层对象，内部嵌套对象仍然引用原对象。用 `copy.copy()` 或切片等方式实现。
- **深拷贝**：递归复制所有层级的对象，互不影响。用 `copy.deepcopy()` 实现。

**示例：**
```python
import copy
a = [1, [2, 3]]
b = copy.copy(a)
c = copy.deepcopy(a)
a[1][0] = 99
print(b)  # [1, [99, 3]]
print(c)  # [1, [2, 3]]
```

---

## 3. Python 中如何实现单例模式？

**答：**  
常用方法有重写 `__new__` 方法或用装饰器、元类实现。

**示例：**
```python
class Singleton:
    _instance = None
    def __new__(cls, *args, **kwargs):
        if not cls._instance:
            cls._instance = super().__new__(cls)
        return cls._instance
```

---

## 4. 解释 Python 的装饰器及其应用场景。

**答：**  
装饰器本质是一个函数，用于在不修改原函数代码的情况下，扩展函数功能。常用于日志、权限校验、缓存等。

**示例：**
```python
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
```

---

## 5. 什么是生成器？和普通函数有何区别？

**答：**  
生成器是使用 `yield` 的函数，每次调用 `next()` 返回一个值，暂停函数状态，节省内存。普通函数用 `return`，一次性返回所有结果。

**示例：**
```python
def gen():
    for i in range(3):
        yield i
g = gen()
print(next(g))  # 0
```

---

## 6. Python 中的垃圾回收机制？

**答：**  
Python 主要采用引用计数为主，结合标记-清除和分代回收机制。引用计数为 0 时自动释放内存，循环引用由垃圾回收器处理。

---

## 7. 解释 Python 的多线程和多进程区别。

**答：**  
- **多线程**：适合 I/O 密集型任务，线程间共享内存，受 GIL 限制，不能真正并行执行 Python 字节码。
- **多进程**：适合 CPU 密集型任务，每个进程独立内存空间，可实现真正并行，开销较大。

---

## 8. 什么是 GIL？对多线程有何影响？

**答：**  
GIL（全局解释器锁）是 CPython 解释器的机制，同一时刻只允许一个线程执行 Python 字节码，导致多线程不能利用多核 CPU 并行执行，适合 I/O 密集型任务。

---

## 9. Python 中如何实现协程？优缺点是什么？

**答：**  
用 `async def` 定义协程函数，`await` 等待异步操作，常用 `asyncio` 库。优点是高并发、低开销，缺点是代码可读性差、调试难度大。

---

## 10. 解释列表推导式和生成器表达式的区别。

**答：**  
- **列表推导式**：`[x for x in range(5)]`，返回列表，立即计算所有元素。
- **生成器表达式**：`(x for x in range(5))`，返回生成器对象，惰性计算，节省内存。

---

## 11. Python 中的魔术方法有哪些常见的？举例说明。

**答：**  
- `__init__`：对象初始化
- `__str__`：对象转字符串
- `__repr__`：对象官方字符串
- `__len__`：返回长度
- `__getitem__`：索引访问
- `__iter__`、`__next__`：迭代器协议

**示例：**
```python
class Demo:
    def __init__(self, x): self.x = x
    def __str__(self): return f"Demo({self.x})"
    def __len__(self): return 1
```

---

## 12. Python 中如何处理异常？如何自定义异常？

**答：**  
用 `try-except-finally` 结构处理异常。自定义异常需继承 `Exception`。

**示例：**
```python
try:
    1 / 0
except ZeroDivisionError:
    print("除零错误")
finally:
    print("结束")

class MyError(Exception):
    pass
```

---

## 13. 解释 @property 的作用及用法。

**答：**  
@property 可以把方法变成属性调用，常用于对私有属性的封装和控制。

**示例：**
```python
class Person:
    def __init__(self, age):
        self._age = age
    @property
    def age(self):
        return self._age
    @age.setter
    def age(self, value):
        self._age = value
```

---

## 14. Python 中如何导入模块和包？相对导入和绝对导入的区别？

**答：**  
- 绝对导入：`import package.module`
- 相对导入：`from . import module`（仅限包内）

---

## 15. 说说你常用的标准库和第三方库。

**答：**  
- 标准库：os、sys、math、datetime、random、re、json、logging、collections、itertools、functools
- 第三方库：requests（网络）、numpy（科学计算）、pandas（数据分析）、matplotlib（可视化）、flask/django（Web）、pytest（测试）

---

## 16. Python 中如何实现上下文管理器？应用场景有哪些？

**答：**  
实现 `__enter__` 和 `__exit__` 方法，或用 `contextlib` 装饰器。常用于文件、数据库、锁等资源管理。

**示例：**
```python
class MyContext:
    def __enter__(self): print("进入"); return self
    def __exit__(self, exc_type, exc_val, exc_tb): print("退出")
with MyContext():
    print("处理中")
```

---

## 17. 解释反射及其常用方法。

**答：**  
反射是指在运行时动态获取对象信息。常用方法有 `getattr()`、`setattr()`、`hasattr()`、`delattr()`。

---

## 18. Python 中如何实现多态？

**答：**  
通过继承和方法重写实现多态。父类引用指向子类对象，调用方法时执行子类实现。

---

## 19. 解释闭包和装饰器的关系。

**答：**  
闭包是指函数内部定义并返回的函数，能访问外部函数的变量。装饰器本质就是闭包的一种应用。

---

## 20. 你如何优化 Python 代码的性能？

**答：**  
- 使用生成器、推导式减少内存消耗
- 合理选择数据结构
- 用多进程/多线程/协程提升并发
- 用 Cython、Numba 等加速
- 使用内置函数和标准库
- 避免重复计算，使用缓存（如 functools.lru_cache）

---

掌握以上问题和答案，可以帮助你应对大多数 Python 面试场景，展示你的基础与进阶能力。