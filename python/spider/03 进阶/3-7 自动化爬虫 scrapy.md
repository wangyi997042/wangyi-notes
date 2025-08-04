# Scrapy 自动化爬虫框架详解与 API 属性全览

---

## 一、Scrapy 简介

Scrapy 是 Python 最流行的分布式爬虫框架之一，专为高效抓取网页数据和提取结构化内容而设计。它支持异步、分布式、数据管道、自动去重、断点续爬等特性，适合大规模数据采集和工程化开发。

**安装：**
```bash
pip install scrapy
```

**创建项目：**
```bash
scrapy startproject myspider
cd myspider
```
**目录结构：**
```
myspider/
    scrapy.cfg
    myspider/
        __init__.py
        items.py
        middlewares.py
        pipelines.py
        settings.py
        spiders/
            __init__.py
```

---

## 二、Scrapy 核心对象与常用属性/方法

### 1. Spider（爬虫类）

- `name`：爬虫名称（唯一标识）
- `allowed_domains`：允许抓取的域名列表
- `start_urls`：初始请求 URL 列表
- `custom_settings`：爬虫级别的配置覆盖
- `parse(self, response)`：默认回调方法，处理响应
- `start_requests(self)`：自定义初始请求生成逻辑
- `logger`：日志对象
- `closed(self, reason)`：爬虫关闭时回调

### 2. Request/Response

#### Request

- `url`：请求地址
- `method`：请求方法（GET/POST）
- `headers`：请求头
- `cookies`：请求 Cookie
- `meta`：自定义元数据（用于多回调间传递参数）
- `callback`：响应回调函数
- `dont_filter`：是否跳过去重
- `body`：请求体（POST 数据）

#### Response

- `url`：响应地址
- `status`：HTTP 状态码
- `headers`：响应头
- `body`：响应体（二进制）
- `text`：响应体（字符串）
- `meta`：Request 传递的元数据
- `xpath()/css()/re()`：选择器方法
- `follow(url, callback)`：生成新的 Request

### 3. Item（数据结构）

- `Field()`：定义字段
- 支持任意自定义属性

### 4. Item Pipeline（管道）

- `process_item(self, item, spider)`：处理每个 Item
- 可重写 open_spider/close_spider 等生命周期方法

### 5. Selector（选择器）

- `xpath(expr)`：XPath 选择
- `css(expr)`：CSS 选择
- `re(pattern)`：正则提取
- `get()`：取第一个结果
- `getall()`：取所有结果
- `extract()`/`extract_first()`：等价于 getall/get

### 6. Settings（配置）

- `BOT_NAME`、`USER_AGENT`、`DOWNLOAD_DELAY`、`COOKIES_ENABLED`、`RETRY_ENABLED`、`LOG_LEVEL` 等
- 支持 settings.py、custom_settings、命令行参数多级覆盖

### 7. Middleware（中间件）

- `process_request`、`process_response`、`process_exception`：请求/响应/异常处理钩子

---

## 三、Scrapy 项目详细示例

### 1. items.py

```python
import scrapy

class QuoteItem(scrapy.Item):
    text = scrapy.Field()
    author = scrapy.Field()
    tags = scrapy.Field()
```

### 2. spiders/quotes_spider.py

```python
import scrapy
from myspider.items import QuoteItem

class QuotesSpider(scrapy.Spider):
    name = "quotes"
    allowed_domains = ["quotes.toscrape.com"]
    start_urls = ["https://quotes.toscrape.com/"]

    custom_settings = {
        'DOWNLOAD_DELAY': 1,
        'USER_AGENT': 'Mozilla/5.0 (compatible; ScrapyBot/1.0)'
    }

    def parse(self, response):
        # 使用 response.selector
        for quote in response.css("div.quote"):
            item = QuoteItem()
            item['text'] = quote.css("span.text::text").get()
            item['author'] = quote.css("small.author::text").get()
            item['tags'] = quote.css("div.tags a.tag::text").getall()
            yield item

        # 翻页
        next_page = response.css("li.next a::attr(href)").get()
        if next_page:
            yield response.follow(next_page, self.parse)
```

### 3. pipelines.py

```python
class MyspiderPipeline:
    def open_spider(self, spider):
        print("爬虫启动：", spider.name)

    def process_item(self, item, spider):
        print("抓取到：", item)
        return item

    def close_spider(self, spider):
        print("爬虫关闭：", spider.name)
```

### 4. middlewares.py（自定义请求头/代理/异常处理）

```python
class MyDownloaderMiddleware:
    def process_request(self, request, spider):
        request.headers['User-Agent'] = 'MyCustomUA/1.0'
        return None

    def process_response(self, request, response, spider):
        return response

    def process_exception(self, request, exception, spider):
        spider.logger.error(f"请求异常：{exception}")
        return None
```

### 5. settings.py（常用配置）

```python
BOT_NAME = 'myspider'
SPIDER_MODULES = ['myspider.spiders']
NEWSPIDER_MODULE = 'myspider.spiders'
ROBOTSTXT_OBEY = False
USER_AGENT = 'Mozilla/5.0 ...'
DOWNLOAD_DELAY = 1
COOKIES_ENABLED = False
RETRY_ENABLED = True
LOG_LEVEL = 'INFO'
ITEM_PIPELINES = {
    'myspider.pipelines.MyspiderPipeline': 300,
}
DOWNLOADER_MIDDLEWARES = {
    'myspider.middlewares.MyDownloaderMiddleware': 543,
}
```

---

## 四、Selector 选择器详细用法

```python
# XPath
response.xpath('//span[@class="text"]/text()').getall()
# CSS
response.css('small.author::text').getall()
# 正则
response.xpath('//span[@class="text"]/text()').re(r'“(.+)”')
```

---

## 五、Request/Response 常用 API

```python
# Request
scrapy.Request(
    url="https://example.com",
    method="POST",
    headers={"User-Agent": "..."},
    cookies={"sessionid": "..."},
    meta={"proxy": "http://ip:port"},
    callback=self.parse_detail,
    dont_filter=True,
    body="key=value"
)

# Response
response.url
response.status
response.headers
response.body
response.text
response.meta
response.follow(url, callback)
```

---

## 六、Pipeline 常用 API

```python
class MyPipeline:
    def open_spider(self, spider): ...
    def process_item(self, item, spider): ...
    def close_spider(self, spider): ...
```

---

## 七、Spider 常用 API

- `self.crawler`：访问爬虫引擎对象
- `self.settings`：访问全局配置
- `self.logger`：日志输出
- `self.start_requests()`：自定义初始请求
- `self.parse()`：默认回调
- `self.closed(reason)`：爬虫关闭回调

---

## 八、命令行常用操作

```bash
scrapy startproject myspider           # 创建项目
scrapy genspider demo example.com      # 创建爬虫
scrapy crawl quotes                    # 运行爬虫
scrapy shell "https://quotes.toscrape.com/"  # 交互式调试
scrapy list                            # 列出所有爬虫
scrapy view url                        # 用浏览器打开页面
scrapy crawl quotes -o result.json     # 导出数据
```

---

## 九、进阶特性与扩展

- **分布式调度**：scrapy-redis
- **断点续爬**：JOBDIR
- **自动限速/重试**：AUTOTHROTTLE、RETRY_ENABLED
- **自定义信号**：spider_opened、spider_closed 等
- **扩展组件**：如 Splash、selenium、playwright 集成 JS 渲染

---

## 十、参考资料

- [Scrapy 官方文档](https://docs.scrapy.org/zh_CN/latest/)
- [Scrapy Selector 文档](https://docs.scrapy.org/en/latest/topics/selectors.html)
- [Scrapy API 文档](https://docs.scrapy.org/en/latest/topics/api.html)

---

**总结：**
- Scrapy 是功能强大、工程化程度高的 Python 爬虫框架，适合大规模、结构化数据采集。
- 熟悉 Spider、Request/Response、Item、Pipeline、Selector、Middleware 等核心 API，可高效开发和维护爬虫项目。
- 推荐多实践，结合中间件、管道、分布式等特性，提升爬虫开发效率和稳定性。