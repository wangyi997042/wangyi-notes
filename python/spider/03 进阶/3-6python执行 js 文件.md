# Python 执行 JS 文件详解

---

## 一、Python 能否直接执行 JS？

Python 本身不能直接运行 JavaScript 文件，但可以通过调用 JS 运行环境（如 Node.js）、集成 JS 引擎（如 PyMiniRacer、execjs）、或在浏览器环境（如 selenium/playwright）间接执行 JS 代码。

---

## 二、常用方法与详细示例

### 1. 使用 execjs 库（推荐，适合纯 JS 算法）

`execjs` 可以调用本地已安装的 Node.js、JScript、PhantomJS 等 JS 运行环境来执行 JS 代码。

**安装：**
```bash
pip install PyExecJS
# 需本地已安装 Node.js（推荐），可用 node -v 检查
```

**示例：执行 JS 文件中的函数**
```python
import execjs

# 读取 JS 文件内容
with open('test.js', 'r', encoding='utf-8') as f:
    js_code = f.read()

# 编译 JS 代码
ctx = execjs.compile(js_code)

# 假设 test.js 中有 function add(a, b) { return a + b; }
result = ctx.call('add', 3, 5)
print("add(3, 5) =", result)
```

**示例：直接执行 JS 表达式**
```python
import execjs

ctx = execjs.compile("""
function square(x) { return x * x; }
""")
print(ctx.call("square", 6))  # 输出 36
```

---

### 2. 使用 subprocess 调用 Node.js 执行 JS 文件

适合需要完整 Node.js 环境、或 JS 文件有复杂依赖时。

**示例：**
```python
import subprocess

# 直接运行 JS 文件
result = subprocess.check_output(['node', 'test.js'])
print(result.decode())

# 传递参数给 JS 文件（test.js 里用 process.argv 读取参数）
result = subprocess.check_output(['node', 'test.js', 'hello', 'world'])
print(result.decode())
```

---

### 3. 在浏览器环境执行 JS（如 selenium/playwright）

适合需要操作 DOM、window、document 等浏览器对象的 JS 代码。

**selenium 示例：**
```python
from selenium import webdriver

driver = webdriver.Chrome()
driver.get('https://www.example.com')

# 执行 JS 代码
result = driver.execute_script("return document.title;")
print("页面标题：", result)

# 执行本地 JS 文件
with open('test.js', 'r', encoding='utf-8') as f:
    js_code = f.read()
driver.execute_script(js_code)
driver.quit()
```

**playwright 示例：**
```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto("https://www.example.com")
    # 执行 JS 代码
    result = page.evaluate("() => document.title")
    print("页面标题：", result)
    browser.close()
```

---

### 4. 使用 PyMiniRacer（内嵌 V8 引擎，纯 Python 依赖）

适合不想依赖 Node.js 的场景。

**安装：**
```bash
pip install py-mini-racer
```

**示例：**
```python
from py_mini_racer import py_mini_racer

ctx = py_mini_racer.MiniRacer()
ctx.eval("function add(a, b) { return a + b; }")
print(ctx.call("add", 2, 3))  # 输出 5
```

---

## 三、常见问题与注意事项

- **Node.js 环境**：execjs、subprocess 方式都依赖本地 Node.js，需提前安装。
- **浏览器依赖**：涉及 DOM 操作的 JS 只能在 selenium/playwright 这类浏览器环境下执行。
- **JS 依赖**：如果 JS 文件依赖其他模块或全局变量，需保证环境一致。
- **安全性**：不要执行不可信的 JS 代码，防止安全风险。

---

## 四、场景选择建议

- **纯算法/加密解密/签名等 JS**：推荐 execjs、PyMiniRacer。
- **需要完整 JS 运行环境/依赖 npm 包**：推荐 subprocess+node。
- **需要操作网页 DOM/模拟用户操作**：推荐 selenium/playwright。
- **复杂交互/页面渲染**：推荐 playwright。

---

## 五、参考资料

- [PyExecJS 文档](https://pypi.org/project/PyExecJS/)
- [PyMiniRacer 文档](https://github.com/sqreen/PyMiniRacer)
- [Selenium 官方文档](https://selenium-python.readthedocs.io/)
- [Playwright 官方文档](https://playwright.dev/python/)

---

**总结：**
- Python 可通过 execjs、subprocess、selenium、playwright 等多种方式间接执行 JS 文件。
- 选择合适的方式，能高效解决 JS 逆向、加密、网页自动化等问题。
- 推荐优先用 execjs 调用 JS 函数，复杂场景用 Node.js 或浏览器自动化。