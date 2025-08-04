# Playwright 全面总结与常用方法

本质上就是模拟浏览器

---

## 一、Playwright 简介

Playwright 是微软开源的现代浏览器自动化库，支持 Python、Node.js、Java、C# 等多语言。它可驱动 Chromium、Firefox、WebKit 三大主流浏览器，支持无头（Headless）和有头模式，适合动态网页爬取、自动化测试、反爬破解等场景。

---

## 二、核心特性

- 支持多浏览器（Chromium、Firefox、WebKit）
- 支持多标签、多页面并发
- 支持无头/有头模式切换
- 强大的页面元素选择与操作能力（支持 CSS/XPath/文本等多种选择器）
- 支持页面截图、PDF 导出、视频录制
- 支持拦截请求、修改请求头、注入 Cookie、模拟地理位置等
- 支持等待元素、自动处理异步加载
- 支持自动化表单、文件上传、拖拽等复杂交互
- 支持网络代理、移动端仿真、地理位置模拟等
- 支持同步与异步两种 API

---

## 三、安装与环境准备

```bash
pip install playwright
playwright install
```
- `playwright install` 会自动下载 Chromium、Firefox、WebKit 三大浏览器内核。

---

## 四、Page/Context/Browser 重要属性和方法

### 1. Page 对象常用属性和方法

| 方法/属性 | 说明 |
| --- | --- |
| `page.url` | 当前页面的 URL |
| `page.title()` | 获取页面标题 |
| `page.content()` | 获取页面 HTML 源码 |
| `page.screenshot()` | 截图 |
| `page.pdf()` | 导出 PDF（Chromium 支持）|
| `page.cookies()` | 获取当前页面的 Cookie |
| `page.set_viewport_size()` | 设置窗口大小 |
| `page.evaluate(js)` | 执行 JS 脚本，获取返回值 |
| `page.query_selector()/query_selector_all()` | 单个/多个元素选择 |
| `page.locator()` | 元素定位器，支持链式操作 |
| `page.wait_for_selector()` | 等待元素出现 |
| `page.wait_for_load_state()` | 等待页面加载状态（如 "load"、"networkidle"）|
| `page.keyboard` | 键盘操作对象（如输入、按键）|
| `page.mouse` | 鼠标操作对象（如点击、移动、拖拽）|
| `page.frames` | 获取所有 iframe 对象 |
| `page.frame(name/url)` | 获取指定 iframe |
| `page.on("event", callback)` | 监听事件（如 "request", "response", "dialog", "popup"）|
| `page.expect_event("event")` | 等待某事件发生（如新页面弹窗）|
| `page.route()` | 拦截和处理网络请求 |
| `page.set_extra_http_headers()` | 设置额外请求头 |
| `page.set_default_timeout()` | 设置默认超时时间 |
| `page.close()` | 关闭当前标签页 |
| `page.viewport_size` | 当前页面视口大小 |
| `page.video` | 视频录制对象 |
| `page.context` | 当前页面所属 context |
| `page.browser` | 当前页面所属 browser |
| `page.is_closed()` | 判断页面是否已关闭 |

---

### 2. Context 对象常用属性和方法

| 方法/属性 | 说明 |
| --- | --- |
| `context.pages` | 当前 context 下所有标签页（Page 对象）列表 |
| `context.cookies()` | 获取所有 Cookie |
| `context.add_cookies()` | 添加 Cookie |
| `context.clear_cookies()` | 清除所有 Cookie |
| `context.set_geolocation()` | 设置地理位置 |
| `context.set_offline()` | 设置离线模式 |
| `context.set_extra_http_headers()` | 设置全局请求头 |
| `context.new_page()` | 新建标签页 |
| `context.close()` | 关闭 context（窗口）|
| `context.on("event", callback)` | 监听 context 级别事件 |

---

### 3. Browser 对象常用属性和方法

| 方法/属性 | 说明 |
| --- | --- |
| `browser.contexts` | 当前浏览器下所有 context（窗口）对象列表 |
| `browser.new_context()` | 新建 context（窗口）|
| `browser.new_page()` | 新建标签页（默认在新 context 下）|
| `browser.version()` | 获取浏览器版本 |
| `browser.is_connected()` | 检查浏览器是否连接 |
| `browser.close()` | 关闭浏览器 |

---

### 4. 事件监听相关

| 方法/属性 | 说明 |
| --- | --- |
| `page.on("request", callback)` | 监听所有请求 |
| `page.on("response", callback)` | 监听所有响应 |
| `page.on("dialog", callback)` | 监听弹窗（alert、confirm、prompt）|
| `page.on("popup", callback)` | 监听新标签页/窗口弹出 |

---

## 五、基本用法

### 1. 启动浏览器

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)  # headless=False 可见浏览器
    page = browser.new_page()
    page.goto("https://www.example.com")
    print(page.title())
    browser.close()
```

### 2. 元素操作

```python
page.fill('input[name="q"]', 'Playwright')
page.click('input[type="submit"]')
page.wait_for_selector('div.result')
texts = page.locator('div.result').all_text_contents()
```

### 3. 获取内容

```python
html = page.content()
text = page.inner_text('h1')
attr = page.get_attribute('img', 'src')
```

### 4. 截图与 PDF

```python
page.screenshot(path="screenshot.png")
page.pdf(path="page.pdf")
```

### 5. Cookie 操作

```python
context = browser.new_context()
context.add_cookies([{"name": "key", "value": "val", "domain": ".example.com"}])
cookies = context.cookies()
```

### 6. 请求头与代理

```python
page.set_extra_http_headers({"User-Agent": "MySpider"})
browser = p.chromium.launch(proxy={"server": "http://127.0.0.1:8080"})
```

### 7. 请求拦截与过滤

```python
def block_images(route, request):
    if request.resource_type == "image":
        route.abort()
    else:
        route.continue_()
page.route("**/*", block_images)
```

### 8. 多页面/多标签

```python
page1 = browser.new_page()
page2 = browser.new_page()
page1.goto("https://www.baidu.com")
page2.goto("https://www.python.org")
```

---

## 六、异步用法

```python
import asyncio
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page()
        await page.goto("https://www.example.com")
        print(await page.title())
        await browser.close()

asyncio.run(main())
```

---

## 七、进阶功能

### 1. 文件上传与下载

```python
# 文件上传
page.set_input_files('input[type="file"]', 'test.png')

# 文件下载
with page.expect_download() as download_info:
    page.click('a#download')
download = download_info.value
download.save_as('downloaded_file.zip')
```

### 2. 表单自动化

```python
page.fill('input[name="username"]', 'myuser')
page.fill('input[name="password"]', 'mypassword')
page.click('button[type="submit"]')
```

### 3. 模拟移动端

```python
iphone = p.devices['iPhone 12']
context = browser.new_context(**iphone)
page = context.new_page()
page.goto("https://www.example.com")
```

### 4. 地理位置模拟

```python
context = browser.new_context(
    geolocation={"longitude": 116.397, "latitude": 39.907},
    permissions=["geolocation"]
)
page = context.new_page()
page.goto("https://maps.google.com")
```

### 5. 视频录制

```python
context = browser.new_context(record_video_dir="videos/")
page = context.new_page()
page.goto("https://www.example.com")
page.close()
```

### 6. 等待与超时

```python
page.wait_for_selector('div.result', timeout=5000)  # 最多等待5秒
```

### 7. 获取所有标签页

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    context = browser.new_context()
    # 打开多个标签页
    page1 = context.new_page()
    page2 = context.new_page()
    page1.goto("https://www.baidu.com")
    page2.goto("https://www.python.org")

    # 获取所有标签页对象
    all_pages = context.pages
    print("当前 context 下标签页数量：", len(all_pages))
    for idx, page in enumerate(all_pages):
        print(f"第{idx+1}个标签页标题：", page.title())

    browser.close()
```

---

## 八、多窗口/多标签页操作

### 1. 多标签页（Tab）

```python
with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page1 = browser.new_page()
    page2 = browser.new_page()
    page1.goto("https://www.baidu.com")
    page2.goto("https://www.python.org")
    # 独立操作、关闭
    page1.close()
    page2.close()
    browser.close()
```

### 2. 多窗口（Window）

```python
with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    context1 = browser.new_context()
    page1 = context1.new_page()
    context2 = browser.new_context()
    page2 = context2.new_page()
    page1.goto("https://www.baidu.com")
    page2.goto("https://www.python.org")
    context1.close()
    context2.close()
    browser.close()
```

### 3. 监听新窗口/新标签页

```python
with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page()
    page.goto("https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_win_open")
    page.frame_locator('iframe#iframeResult').locator('button').click()
    def on_new_page(new_page):
        print("新窗口地址：", new_page.url)
        print("新窗口标题：", new_page.title())
    browser.on("page", on_new_page)
    import time
    time.sleep(3)
    browser.close()
```

---

## 九、常见问题与技巧

- **反爬破解**：可随机 User-Agent、代理、延时、模拟真实操作。
- **动态内容**：利用 wait_for_selector 等等待元素加载，避免数据丢失。
- **性能优化**：合理关闭无用页面、释放资源，避免内存泄漏。
- **调试**：headless=False 可视化调试，配合 page.screenshot 截图排查问题。
- **异常处理**：捕获 TimeoutError、Error 等异常，保证脚本健壮性。

---

## 十、参考资料

- 官方文档：https://playwright.dev/python/
- 中文文档：https://playwright.bootcss.com/
- API 速查：https://playwright.dev/python/docs/api/class-page

---

**建议：**
- Playwright API 非常丰富，建议查阅[官方 API 文档](https://playwright.dev/python/docs/api/class-page)获取全部属性和方法。
- 多用 `dir(page)`、`dir(context)`、`dir(browser)` 查看对象支持的所有属性和方法。