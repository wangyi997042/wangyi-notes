'''
## JSONPath 语法详解

JSONPath 是一种用于从 JSON 数据中提取指定内容的查询语言，类似于 XPath 之于 XML。常用于爬虫、接口自动化等场景。

---

### 一、常用符号与语法

- `$`：根对象
- `.`：子节点（如 `.name`）
- `[]`：访问数组元素或对象属性（如 `[0]`、`['key']`）
- `*`：通配符，匹配所有元素（如 `$.store.book[*].author`）
- `..`：递归下降，匹配所有子孙节点（如 `$..author`）
- `,`：支持多个字段（如 `$['name','age']`）
- `?()`：过滤表达式（如 `$..book[?(@.price<10)]`）
- `()`：脚本表达式（如 `$..book[(@.length-1)]` 取最后一个）
- `:`：数组切片（如 `$..book[0:2]`）

---

### 二、常见 JSONPath 示例

假设有如下 JSON 数据：

```json
{
  "store": {
    "book": [
      {"category": "fiction", "author": "A", "price": 8.95},
      {"category": "fiction", "author": "B", "price": 12.99}
    ],
    "bicycle": {"color": "red", "price": 19.95}
  }
}
```
- `$`：整个 JSON 对象
- `$.store.book`：book 数组
- `$.store.book[0]`：第一个 book
- `$.store.book[*].author`：所有 book 的 author
- `$..author`：所有 author 字段（递归查找）
- `$.store.*`：store 下所有子节点
- `$.store..price`：store 下所有 price
- `$..book[?(@.price<10)]`：所有 price 小于 10 的 book
- `$..book[0,1]`：book 数组的第 0 和第 1 个元素
- `$..book[-1:]`：book 数组最后一个元素

---

### 三、常用 Python JSONPath 库

- `jsonpath-ng`（推荐，支持 Python 3）
    ```python
    from jsonpath_ng import jsonpath, parse

    data = {...}  # 你的 JSON 数据
    expr = parse('$.store.book[*].author')
    authors = [match.value for match in expr.find(data)]
    print(authors)
    ```

- `jsonpath`（老库，Python 2/3 均可用）

---

**总结：**
- JSONPath 语法简洁，适合复杂 JSON 数据的提取。
- 常用符号有 `$`、`.`、`[]`、`*`、`..`、`?()`、`:` 等。
- 推荐用 `jsonpath-ng` 库在 Python 中解析和提取数据。

'''

import json

import jsonpath as jsonp

info = {
  "store": {
    "book": [
      {"category": "fiction", "author": "A", "price": 8.95},
      {"category": "fiction", "author": "B", "price": 12.99}
    ],
    "bicycle": {"color": "red", "price": 19.95}
  }
}

# print(info['store']['book'][0]['author'])  # 输出第一个书籍的作者
#
# json_data = json.dumps(info, indent=2, ensure_ascii=False)
# print(type(json_data), json_data)
#
# python_data = json.loads(json_data)
# print(type(python_data), python_data)

# 1. $：整个 JSON 对象
# print("1. $：", jsonp.jsonpath(info, "$"))

# 2. $.store.book：book 数组
# print("2. $.store.book：", jsonp.jsonpath(info, "$.store.book"))

# 3. $.store.book[0]：第一个 book
# print("3. $.store.book[0]：", jsonp.jsonpath(info, "$.store.book[0]"))

# 4. $.store.book[*].author：所有 book 的 author
# print("4. $.store.book[*].author：", jsonp.jsonpath(info, "$.store.book[*].author"))

# 5. $..author：所有 author 字段（递归查找）
# print("5. $..author：", jsonp.jsonpath(info, "$..author"))

# 6. $.store.*：store 下所有子节点
# print("6. $.store.*：", jsonp.jsonpath(info, "$.store.*"))

# 7. $.store..price：store 下所有 price
# print("7. $.store..price：", jsonp.jsonpath(info, "$.store..price"))

# 8. $..book[?(@.price<10)]：所有 price 小于 10 的 book
# print("8. $..book[?(@.price<10)]：", jsonp.jsonpath(info, "$..book[?(@.price<10)]"))

# 9. $..book[0,1]：book 数组的第 0 和第 1 个元素
# print("9. $..book[0,1]：", jsonp.jsonpath(info, "$..book[0,1]"))

# 10. $..book[-1:]：book 数组最后一个元素
# print("10. $..book[-1:]：", jsonp.jsonpath(info, "$..book[-1:]"))

import requests
import pandas
if __name__ == '__main__':
  url = 'https://api.juejin.cn/recommend_api/v1/article/recommend_all_feed?aid=2608&uuid=7436208812568626723&spider=0'

  headers = {
    'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36',
    "cookie": "_tea_utm_cache_2608=undefined; __tea_cookie_tokens_2608=%257B%2522web_id%2522%253A%25227436208812568626723%2522%252C%2522user_unique_id%2522%253A%25227436208812568626723%2522%252C%2522timestamp%2522%253A1731377308373%257D; sid_guard=3de7685822438fc1ef6499537e7f0133%7C1732867559%7C31536000%7CSat%2C+29-Nov-2025+08%3A05%3A59+GMT; uid_tt=b5f48d2b0d19ae7b41d92b3bb122e298; uid_tt_ss=b5f48d2b0d19ae7b41d92b3bb122e298; sid_tt=3de7685822438fc1ef6499537e7f0133; sessionid=3de7685822438fc1ef6499537e7f0133; sessionid_ss=3de7685822438fc1ef6499537e7f0133; is_staff_user=false; sid_ucp_v1=1.0.0-KGFlZTQ4YWI5ODc1NGM3MDY3ZTJkNzlmMjc4N2YzYmU0ODFlZDQxNmUKFwjHy5C-_fWdAxDn66W6BhiwFDgCQO8HGgJscSIgM2RlNzY4NTgyMjQzOGZjMWVmNjQ5OTUzN2U3ZjAxMzM; ssid_ucp_v1=1.0.0-KGFlZTQ4YWI5ODc1NGM3MDY3ZTJkNzlmMjc4N2YzYmU0ODFlZDQxNmUKFwjHy5C-_fWdAxDn66W6BhiwFDgCQO8HGgJscSIgM2RlNzY4NTgyMjQzOGZjMWVmNjQ5OTUzN2U3ZjAxMzM; store-region=cn-hk; store-region-src=uid; csrf_session_id=38418265aa52d9839ceda21eed9abb23; passport_csrf_token=c71a450ab0b5fb193ea6f7ab904cfd4b; passport_csrf_token_default=c71a450ab0b5fb193ea6f7ab904cfd4b"
  }
  data = {
    "id_type":2,
    "client_type":2608,
    "sort_type":300,
    "cursor":"eyJ2IjoiNzUxOTQ1NDM2MzgyNTIwOTM4MyIsImkiOjIwfQ==",
    "limit":20
  }

  response = requests.post(url, headers=headers, data=data)

  # json_data = response.text
  #
  # py_data = json.loads(json_data)
  py_data = response.json()

  res = jsonp.jsonpath(py_data, '$.data[*].item_info.article_info')
  # print(res)

  title_list = jsonp.jsonpath(py_data, '$.data[1,2,3,4,5].item_info.article_info.title')
  content_list = jsonp.jsonpath(py_data, '$.data[1,2,3,4,5].item_info.article_info.brief_content')
  img_list = jsonp.jsonpath(py_data, '$.data[1,2,3,4,5].item_info.author_user_info.avatar_large')

  df = pandas.DataFrame()
  df['标题'] = title_list
  df['内容'] = content_list
  df['图片'] = img_list

  df.to_csv('掘金最新.csv',index=False, encoding='utf-8')