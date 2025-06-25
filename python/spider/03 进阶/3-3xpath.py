"""
## XPath 使用总结

XPath（XML Path Language）是一种用于在 XML/HTML 文档中查找信息的语言，常用于网页爬虫的数据提取。Python 常用 lxml、parsel、xpath-selector 等库结合 XPath 语法解析 HTML。

---

### 一、常用 XPath 语法

- `/`：从根节点选取
- `//`：从匹配节点的任意位置选取
- `.`：当前节点
- `..`：父节点
- `@`：属性（如 `@href`）
- `*`：通配符，匹配任意元素
- `[]`：谓语，筛选条件
- `text()`：节点文本
- `contains(a, b)`：包含关系
- `starts-with(a, b)`：以...开头
- `last()`、`position()`：位置函数

---

### 二、常见 XPath 示例

假设 HTML 结构如下：

```html
<ul>
  <li class="item"><a href="a1.html">苹果</a></li>
  <li class="item"><a href="a2.html">香蕉</a></li>
  <li class="item"><a href="a3.html">橘子</a></li>
</ul>
```

- 选取所有 li 节点：`//li`
- 选取所有 class 为 item 的 li：`//li[@class="item"]`
- 选取所有 a 的文本：`//a/text()`
- 选取第一个 li 的 a 的 href：`//li[1]/a/@href`
- 选取最后一个 li 的文本：`//li[last()]/a/text()`
- 选取包含“苹果”的 li：`//li[a[contains(text(),"苹果")]]`
- 选取所有 href 属性以 a 开头的链接：`//a[starts-with(@href, "a")]/@href`

---

### 三、Python 中的 XPath 用法

#### 1. lxml 库

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
```

#### 2. parsel 库（Scrapy 常用）

```python
from parsel import Selector

sel = Selector(text=html)
print(sel.xpath('//li[@class="item"]/a/text()').getall())
```

---

### 四、常见技巧

- 获取属性：`//tag/@attr`
- 获取文本：`//tag/text()` 或 `string(//tag)`
- 结合 contains、starts-with 进行模糊匹配
- 结合 position()、last() 选取特定位置元素
- 支持多层级、复杂嵌套结构解析

---

### 五、注意事项

- XPath 匹配区分大小写
- HTML 需为标准结构，建议用 lxml 的 `etree.HTML()` 自动修正
- 返回结果为列表，取单个元素可用 `[0]` 或 `.get()`（parsel）

---

**总结：**
- XPath 是网页结构化数据提取的利器，语法灵活、功能强大。
- 推荐结合 lxml、parsel 等库高效解析 HTML 页面。
- 熟练掌握 XPath 语法可大幅提升爬虫开发效率。

---
```## XPath 使用总结

XPath（XML Path Language）是一种用于在 XML/HTML 文档中查找信息的语言，常用于网页爬虫的数据提取。Python 常用 lxml、parsel、xpath-selector 等库结合 XPath 语法解析 HTML。

---

### 一、常用 XPath 语法

- `/`：从根节点选取
- `//`：从匹配节点的任意位置选取
- `.`：当前节点
- `..`：父节点
- `@`：属性（如 `@href`）
- `*`：通配符，匹配任意元素
- `[]`：谓语，筛选条件
- `text()`：节点文本
- `contains(a, b)`：包含关系
- `starts-with(a, b)`：以...开头
- `last()`、`position()`：位置函数

---

### 二、常见 XPath 示例

假设 HTML 结构如下：

```html
<ul>
  <li class="item"><a href="a1.html">苹果</a></li>
  <li class="item"><a href="a2.html">香蕉</a></li>
  <li class="item"><a href="a3.html">橘子</a></li>
</ul>
```

- 选取所有 li 节点：`//li`
- 选取所有 class 为 item 的 li：`//li[@class="item"]`
- 选取所有 a 的文本：`//a/text()`
- 选取第一个 li 的 a 的 href：`//li[1]/a/@href`
- 选取最后一个 li 的文本：`//li[last()]/a/text()`
- 选取包含“苹果”的 li：`//li[a[contains(text(),"苹果")]]`
- 选取所有 href 属性以 a 开头的链接：`//a[starts-with(@href, "a")]/@href`

---

### 三、Python 中的 XPath 用法

#### 1. lxml 库

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
```

#### 2. parsel 库（Scrapy 常用）

```python
from parsel import Selector

sel = Selector(text=html)
print(sel.xpath('//li[@class="item"]/a/text()').getall())
```

---

### 四、常见技巧

- 获取属性：`//tag/@attr`
- 获取文本：`//tag/text()` 或 `string(//tag)`
- 结合 contains、starts-with 进行模糊匹配
- 结合 position()、last() 选取特定位置元素
- 支持多层级、复杂嵌套结构解析

---

### 五、注意事项

- XPath 匹配区分大小写
- HTML 需为标准结构，建议用 lxml 的 `etree.HTML()` 自动修正
- 返回结果为列表，取单个元素可用 `[0]` 或 `.get()`（parsel）

---

**总结：**
- XPath 是网页结构化数据提取的利器，语法灵活、功能强大。
- 推荐结合 lxml、parsel 等库高效解析 HTML 页面。
- 熟练掌握 XPath 语法可大幅提升爬虫开发效率。

---
"""

import requests

from lxml import etree

import pandas

if __name__ == '__main__':
  # url = 'https://juejin.cn/following'
  # url = 'https://www.macbl.com/article'
  url = 'https://www.qidian.com/all/'
  headers = {
    'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36',
    # 'cookie': '_tea_utm_cache_2608=undefined; __tea_cookie_tokens_2608=%257B%2522web_id%2522%253A%25227436208812568626723%2522%252C%2522user_unique_id%2522%253A%25227436208812568626723%2522%252C%2522timestamp%2522%253A1731377308373%257D; sid_guard=3de7685822438fc1ef6499537e7f0133%7C1732867559%7C31536000%7CSat%2C+29-Nov-2025+08%3A05%3A59+GMT; uid_tt=b5f48d2b0d19ae7b41d92b3bb122e298; uid_tt_ss=b5f48d2b0d19ae7b41d92b3bb122e298; sid_tt=3de7685822438fc1ef6499537e7f0133; sessionid=3de7685822438fc1ef6499537e7f0133; sessionid_ss=3de7685822438fc1ef6499537e7f0133; is_staff_user=false; sid_ucp_v1=1.0.0-KGFlZTQ4YWI5ODc1NGM3MDY3ZTJkNzlmMjc4N2YzYmU0ODFlZDQxNmUKFwjHy5C-_fWdAxDn66W6BhiwFDgCQO8HGgJscSIgM2RlNzY4NTgyMjQzOGZjMWVmNjQ5OTUzN2U3ZjAxMzM; ssid_ucp_v1=1.0.0-KGFlZTQ4YWI5ODc1NGM3MDY3ZTJkNzlmMjc4N2YzYmU0ODFlZDQxNmUKFwjHy5C-_fWdAxDn66W6BhiwFDgCQO8HGgJscSIgM2RlNzY4NTgyMjQzOGZjMWVmNjQ5OTUzN2U3ZjAxMzM; store-region=cn-hk; store-region-src=uid; passport_csrf_token=c71a450ab0b5fb193ea6f7ab904cfd4b; passport_csrf_token_default=c71a450ab0b5fb193ea6f7ab904cfd4b; s_v_web_id=verify_mba51s6p_PwDkkQLj_EZc5_4K9Q_80HI_7RGYoHBR1wJ8',
    'cookie':'newstatisticUUID=1734654438_972221583; _csrfToken=5JNUjw5KtjRGAdnyl21crmRJSFaxWFW0c9LQhShf; fu=1044365192; supportWebp=true; supportwebp=true; _gid=GA1.2.1423334767.1750757321; seo-jump-referrer=https%3A//www.google.com/; traffic_utm_referer=; Hm_lvt_f00f67093ce2f38f215010b699629083=1750757319,1750839097; Hm_lpvt_f00f67093ce2f38f215010b699629083=1750839097; HMACCOUNT=527C126AFD14FC83; _gat_gtag_UA_199934072_2=1; _ga_FZMMH98S83=GS2.1.s1750839097$o5$g0$t1750839097$j60$l0$h0; _ga=GA1.1.44803613.1734654444; _ga_PFYW0QLV3P=GS2.1.s1750839097$o5$g0$t1750839097$j60$l0$h0; w_tsfp=ltvuV0MF2utBvS0Q7Krhl0KvFzkncj04h0wpEaR0f5thQLErU5mA0Y55t8r2MX3X58xnvd7DsZoyJTLYCJI3dwMdQcyQJopC3QuZw4En3IwdV0ZnFpuPWAIaJ7IhvzYUKXhCNxS00jA8eIUd379yilkMsyN1zap3TO14fstJ019E6KDQmI5uDW3HlFWQRzaLbjcMcuqPr6g18L5a5Wvb5Vn/LA59CrxD10zD3H0YD34ltxi8Jr0JPRqqJpz8SqA=',
  }

  response = requests.get(url, headers=headers)

  res_data = response.content.decode("utf-8")
  # print(res_data)

  html = etree.HTML(res_data)
  #
  # print(type(html), html)
  #
  titles = html.xpath('//div[@class="book-mid-info"]/h2/a/text()')
  images = html.xpath('//div[@class="book-img-box"]/a/img/@src')
  detail_url = html.xpath('//div[@class="book-img-box"]/a/@href')

  # print(type(detail_url), detail_url)
  df = pandas.DataFrame()
  df['标题'] = titles
  df['图片'] = images
  df['详情地址'] = detail_url

  df.to_csv('起点网.csv', index=False, encoding='utf-8')



