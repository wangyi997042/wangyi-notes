

# ! 1. 常见异常类型及说明
# * Python 常见异常类型包括语法、名称、类型、值、索引、键、属性、零除、IO、导入、缩进等错误，需熟悉各自含义和触发场景。
# ? 标准语法：见下方各节
# 参数说明：见下方各节
# 示例：见下方各节
# TODO: 熟悉常见异常类型，能快速定位和修复问题。

# ! 1.1 SyntaxError（语法错误）
# * 代码不符合 Python 语法规范时抛出。
# ? 标准语法：无
# 示例：
print("hello"  # 缺少右括号
# TODO: 语法错误通常在代码运行前被发现。

# ! 1.2 NameError（变量名未定义）
# * 使用了未声明的变量名。
# ? 标准语法：无
# 示例：
print(x)  # x 未定义

# ! 1.3 TypeError（类型错误）
# * 操作或函数应用于错误类型的对象。
# ? 标准语法：无
# 示例：
1 + "2"  # int和str不能相加

# ! 1.4 ValueError（值错误）
# * 类型正确但值不合适。
# ? 标准语法：无
# 示例：
int("abc")  # 字符串不能转换为整数

# ! 1.5 IndexError（索引越界）
# * 序列索引超出范围。
# ? 标准语法：无
# 示例：
lst = [1, 2]
print(lst[5])

# ! 1.6 KeyError（字典键不存在）
# * 访问字典中不存在的键。
# ? 标准语法：无
# 示例：
d = {"a": 1}
print(d["b"])

# ! 1.7 AttributeError（属性错误）
# * 对象没有该属性或方法。
# ? 标准语法：无
# 示例：
s = "hello"
s.append("a")

# ! 1.8 ZeroDivisionError（除以零错误）
# * 除数为零时抛出。
# ? 标准语法：无
# 示例：
1 / 0

# ! 1.9 IOError / OSError（输入输出/操作系统错误）
# * 文件、IO、系统相关操作失败。
# ? 标准语法：无
# 示例：
open("not_exist.txt")

# ! 1.10 ImportError / ModuleNotFoundError（导入模块失败）
# * 导入不存在的模块或成员。
# ? 标准语法：无
# 示例：
import not_exist_module

# ! 1.11 IndentationError（缩进错误）
# * 代码缩进不规范。
# ? 标准语法：无
# 示例：
def f():
print(1)  # 没有缩进

# ! 1.12 StopIteration（迭代器结束）
# * 迭代器无更多元素时抛出。
# ? 标准语法：无
# 示例：
it = iter([1])
next(it)
next(it)  # StopIteration

# ! 2. 异常捕获与处理（补充）
# * 用 try-except-finally 结构捕获和处理异常，支持多异常捕获和 else、finally 子句。
# ? 标准语法：
try:
    # 可能出错的代码
    pass
except (TypeError, ValueError) as e:
    print(e)
else:
    print("无异常")
finally:
    print("收尾")
# TODO: 推荐捕获具体异常类型，避免 except: 捕获所有异常。

# ! 3. 异常链与自定义异常（补充）
# * raise ... from ... 可抛出异常链，自定义异常需继承 Exception。
# ? 标准语法：
class MyError(Exception): pass
try:
    raise ValueError("原始错误")
except ValueError as e:
    raise MyError("自定义错误") from e
# TODO: 异常链便于追踪错误来源。

# ! 4. 常见易混点与排查建议（补充）
# * NameError 与 AttributeError 区别、IndexError 与 KeyError 区别、TypeError 与 ValueError 区别等。
# ? 标准语法：见上
# 示例：见上
# TODO: 遇到异常时，优先看异常类型和 traceback 定位问题。

# ! 总结
# * 熟悉常见异常类型和处理方式，能快速定位和修复 Python 报错，提升开发效率和代码健壮性。
# ? 标准语法：无
# 参数说明：无
# 示例：无
# TODO: 推荐多查官方文档和社区资料，积累异常处理经验。