# XPath 使用总结

XPath（XML Path Language）是一种用于在 XML/HTML 文档中查找信息的语言，常用于网页爬虫的数据提取。Python 常用 lxml、parsel、xpath-selector 等库结合 XPath 语法解析 HTML。

---

## 一、常用 XPath 语法

| 语法 | 说明 |
| --- | --- |
| `/` | 从根节点选取 |
| `//` | 从匹配节点的任意位置选取 |
| `.` | 当前节点 |
| `..` | 父节点 |
| `@` | 属性（如 `@href`）|
| `*` | 通配符，匹配任意元素 |
| `[]` | 谓语，筛选条件 |
| `text()` | 节点文本 |
| `contains(a, b)` | 包含关系 |
| `starts-with(a, b)` | 以...开头 |
| `last()`、`position()` | 位置函数 |
| `|` | 或，多个路径 |
| `not()` | 取反 |
| `number()`、`string()` | 类型转换 |
| `normalize-space()` | 去除空白字符 |

---

## 二、常见 XPath 示例

假设 HTML 结构如下：

```html
<ul>
  <li class="item"><a href="a1.html">苹果</a></li>
  <li class="item"><a href="a2.html">香蕉</a></li>
  <li class="item"><a href="a3.html">橘子</a></li>
</ul>
```

| 目标 | XPath 表达式 | 说明 |
| --- | --- | --- |
| 所有 li 节点 | `//li` | 选取所有 li |
| class 为 item 的 li | `//li[@class="item"]` | 属性筛选 |
| 所有 a 的文本 | `//a/text()` | 获取文本内容 |
| 第一个 li 的 a 的 href | `//li[1]/a/@href` | 下标从 1 开始 |
| 最后一个 li 的文本 | `//li[last()]/a/text()` | last() 函数 |
| 包含“苹果”的 li | `//li[a[contains(text(),"苹果")]]` | contains 用法 |
| href 以 a 开头的链接 | `//a[starts-with(@href, "a")]/@href` | starts-with 用法 |
| 多路径选择 | `//li | //a` | 选取所有 li 和 a |
| 非 class="item" 的 li | `//li[not(@class="item")]` | not 用法 |

---

## 三、Python 中的 XPath 用法

### 1. lxml 库

```python
from lxml import etree

html = '''
<ul>
  <li class="item"><a href="a1.html">苹果</a></li>
  <li class="item"><a href="a2.html">香蕉</a></li>
  <li class="item"><a href="a3.html">橘子</a></li>
</ul>
'''

tree = etree.HTML(html)
# 选取所有 a 的文本
texts = tree.xpath('//a/text()')
print(texts)  # ['苹果', '香蕉', '橘子']

# 选取所有 a 的 href
hrefs = tree.xpath('//a/@href')
print(hrefs)  # ['a1.html', 'a2.html', 'a3.html']

# 选取第一个 li 的文本
first_li_text = tree.xpath('//li[1]/a/text()')[0]
print(first_li_text)  # '苹果'

# 选取最后一个 li 的 href
last_li_href = tree.xpath('//li[last()]/a/@href')[0]
print(last_li_href)  # 'a3.html'

# 选取所有 li 节点对象
li_nodes = tree.xpath('//li')
print([etree.tostring(li, encoding='unicode') for li in li_nodes])
```

### 2. parsel 库（Scrapy 常用）

```python
from parsel import Selector

sel = Selector(text=html)
print(sel.xpath('//li[@class="item"]/a/text()').getall())
print(sel.xpath('//a/@href').getall())
print(sel.xpath('//li[1]/a/text()').get())
```

---

## 四、常见技巧

- 获取属性：`//tag/@attr`
- 获取文本：`//tag/text()` 或 `string(//tag)`
- 获取节点对象：`//tag`（返回 Element 对象，可进一步操作）
- 结合 contains、starts-with 进行模糊匹配
- 结合 position()、last() 选取特定位置元素
- 多路径选择：`//a | //li`
- 取反筛选：`//li[not(@class="item")]`
- 支持多层级、复杂嵌套结构解析

---

## 五、XPath 相关对象属性和方法（以 lxml 为例）

| 属性/方法 | 说明 |
| --- | --- |
| `element.tag` | 标签名 |
| `element.text` | 节点文本内容 |
| `element.attrib` | 属性字典 |
| `element.get('attr')` | 获取指定属性 |
| `element.xpath(expr)` | 在当前节点下继续 XPath 查询 |
| `etree.tostring(element)` | 节点转字符串 |
| `element.getparent()` | 获取父节点 |
| `element.getchildren()` | 获取所有子节点 |
| `element.iter(tag)` | 递归遍历所有指定标签的子节点 |
| `element.find()`/`findall()` | 查找子节点（ElementTree 风格）|

---

## 六、注意事项

- XPath 匹配区分大小写
- HTML 需为标准结构，建议用 lxml 的 `etree.HTML()` 自动修正
- 返回结果为列表，取单个元素可用 `[0]` 或 `.get()`（parsel）
- lxml 返回的是 Element 对象，parsel 返回字符串或列表

---

## 七、总结

- XPath 是网页结构化数据提取的利器，语法灵活、功能强大。
- 推荐结合 lxml、parsel 等库高效解析 HTML 页面。
- 熟练掌握 XPath 语法和节点对象属性/方法，可大幅提升爬虫开发效率。

---

