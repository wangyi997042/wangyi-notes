# JSONPath 语法详解与实用方法

JSONPath 是一种用于从 JSON 数据中提取指定内容的查询语言，类似于 XPath 之于 XML。常用于爬虫、接口自动化等场景。

---

## 一、常用符号与语法

| 符号/语法 | 说明 |
| --- | --- |
| `$` | 根对象 |
| `.` | 子节点（如 `.name`）|
| `[]` | 访问数组元素或对象属性（如 `[0]`、`['key']`）|
| `*` | 通配符，匹配所有元素（如 `$.store.book[*].author`）|
| `..` | 递归下降，匹配所有子孙节点（如 `$..author`）|
| `,` | 多字段选择（如 `$['name','age']`）|
| `?()` | 过滤表达式（如 `$..book[?(@.price<10)]`）|
| `()` | 脚本表达式（如 `$..book[(@.length-1)]` 取最后一个）|
| `:` | 数组切片（如 `$..book[0:2]`）|

---

## 二、常见 JSONPath 示例

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

| 目标 | JSONPath 表达式 | 说明 |
| --- | --- | --- |
| 整个 JSON 对象 | `$` | 根节点 |
| book 数组 | `$.store.book` | 选取 book 数组 |
| 第一个 book | `$.store.book[0]` | 下标从 0 开始 |
| 所有 book 的 author | `$.store.book[*].author` | 通配符 |
| 所有 author 字段 | `$..author` | 递归查找 |
| store 下所有子节点 | `$.store.*` | 通配符 |
| store 下所有 price | `$.store..price` | 递归查找 |
| price < 10 的 book | `$..book[?(@.price<10)]` | 过滤 |
| book 数组第 0 和第 1 个元素 | `$..book[0,1]` | 多索引 |
| book 数组最后一个元素 | `$..book[-1:]` | 切片 |

---

## 三、Python 中的 JSONPath 用法

### 1. 推荐库：jsonpath-ng

```python
from jsonpath_ng import parse

data = {
  "store": {
    "book": [
      {"category": "fiction", "author": "A", "price": 8.95},
      {"category": "fiction", "author": "B", "price": 12.99}
    ],
    "bicycle": {"color": "red", "price": 19.95}
  }
}

expr = parse('$.store.book[*].author')
authors = [match.value for match in expr.find(data)]
print(authors)  # ['A', 'B']
```

### 2. 兼容库：jsonpath（jsonpath-rw/jsonpath）

```python
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

# 1. $：整个 JSON 对象
print("1. $：", jsonp.jsonpath(info, "$"))

# 2. $.store.book：book 数组
print("2. $.store.book：", jsonp.jsonpath(info, "$.store.book"))

# 3. $.store.book[0]：第一个 book
print("3. $.store.book[0]：", jsonp.jsonpath(info, "$.store.book[0]"))

# 4. $.store.book[*].author：所有 book 的 author
print("4. $.store.book[*].author：", jsonp.jsonpath(info, "$.store.book[*].author"))

# 5. $..author：所有 author 字段（递归查找）
print("5. $..author：", jsonp.jsonpath(info, "$..author"))

# 6. $.store.*：store 下所有子节点
print("6. $.store.*：", jsonp.jsonpath(info, "$.store.*"))

# 7. $.store..price：store 下所有 price
print("7. $.store..price：", jsonp.jsonpath(info, "$.store..price"))

# 8. $..book[?(@.price<10)]：所有 price 小于 10 的 book
print("8. $..book[?(@.price<10)]：", jsonp.jsonpath(info, "$..book[?(@.price<10)]"))

# 9. $..book[0,1]：book 数组的第 0 和第 1 个元素
print("9. $..book[0,1]：", jsonp.jsonpath(info, "$..book[0,1]"))

# 10. $..book[-1:]：book 数组最后一个元素
print("10. $..book[-1:]：", jsonp.jsonpath(info, "$..book[-1:]"))
```

---

## 四、jsonpath-ng 主要属性和方法

| 属性/方法 | 说明 |
| --- | --- |
| `parse(expr)` | 解析 JSONPath 表达式，返回 JSONPath 对象 |
| `expr.find(data)` | 在数据中查找所有匹配项，返回 Match 对象列表 |
| `match.value` | 匹配到的值 |
| `match.path` | 匹配到的路径 |
| `match.context` | 匹配上下文 |
| `expr.update(data, value)` | 批量更新匹配到的值 |
| `expr.filter(data, filter_func)` | 过滤匹配项 |

---

## 五、常见技巧与注意事项

- JSONPath 支持复杂嵌套、过滤、切片、递归等操作，适合复杂 JSON 数据提取。
- `jsonpath-ng` 支持链式操作和批量更新，功能更强大。
- 返回结果通常为列表，取单个元素可用 `[0]` 或 `.value`。
- JSONPath 匹配区分大小写。
- 复杂过滤表达式建议用 `jsonpath-ng`，兼容性更好。

---

## 六、总结

- JSONPath 语法简洁，适合复杂 JSON 数据的提取。
- 常用符号有 `$`、`.`、`[]`、`*`、`..`、`?()`、`:` 等。
- 推荐用 `jsonpath-ng` 库在 Python 中解析和提取数据。
- 建议查阅 [jsonpath-ng 文档](https://github.com/h2non/jsonpath-ng) 获取更多用法和进阶技巧。

---