### 常见异常报错种类及说明

Python 中常见的异常类型有：

- **SyntaxError**：语法错误
  ```python
  print("hello"  # 缺少右括号
  ```

- **NameError**：变量名未定义
  ```python
  print(x)  # x 未定义
  ```

- **TypeError**：类型错误
  ```python
  1 + "2"  # int和str不能相加
  ```

- **ValueError**：值错误，类型正确但值不合适
  ```python
  int("abc")  # 字符串不能转换为整数
  ```

- **IndexError**：索引越界
  ```python
  lst = [1, 2]
  print(lst[5])
  ```

- **KeyError**：字典中不存在的键
  ```python
  d = {"a": 1}
  print(d["b"])
  ```

- **AttributeError**：对象没有该属性或方法
  ```python
  s = "hello"
  s.append("a")
  ```

- **ZeroDivisionError**：除以零错误
  ```python
  1 / 0
  ```

- **IOError / OSError**：输入输出或操作系统相关错误
  ```python
  open("not_exist.txt")
  ```

- **ImportError / ModuleNotFoundError**：导入模块失败
  ```python
  import not_exist_module
  ```

- **IndentationError**：缩进错误
  ```python
  def f():
  print(1)  # 没有缩进
  ```

- **StopIteration**：迭代器无更多元素时抛出

---

**总结：**  
常见异常类型要熟悉，遇到报错时根据异常类型和提示快速定位和修复问题。