## requests 包的使用详细介绍

`requests` 是 Python 最常用的第三方 HTTP 库，支持发送各种 HTTP 请求，操作简单，功能强大，适合爬虫、接口测试等场景。

---

### 一、基本用法

- 发送 GET 请求
    ```python
    import requests
    response = requests.get('http://www.example.com')
    print(response.text)  # 响应内容（字符串）
    ```

- 发送 POST 请求
    ```python
    data = {'key': 'value'}
    response = requests.post('http://www.example.com', data=data)
    print(response.text)
    ```

---

### 二、常用参数

- `params`：GET 请求参数（自动拼接到 URL）
    ```python
    payload = {'q': 'python'}
    response = requests.get('https://www.baidu.com/s', params=payload)
    ```

- `data`：POST 表单数据（字典或字符串）
- `json`：POST JSON 数据（自动设置 Content-Type）
    ```python
    response = requests.post('http://httpbin.org/post', json={'a': 1})
    ```

- `headers`：自定义请求头（如 User-Agent、Cookie）
    ```python
    headers = {'User-Agent': 'Mozilla/5.0'}
    response = requests.get('http://www.example.com', headers=headers)
    ```

- `cookies`：自定义 Cookie
    ```python
    cookies = {'sessionid': '123456'}
    response = requests.get('http://www.example.com', cookies=cookies)
    ```

- `timeout`：超时时间（秒）
    ```python
    response = requests.get('http://www.example.com', timeout=5)
    ```

- `proxies`：代理设置
    ```python
    proxies = {'http': 'http://127.0.0.1:8080'}
    response = requests.get('http://www.example.com', proxies=proxies)
    ```

- `allow_redirects`：是否允许重定向（默认 True）

---

### 三、响应对象常用属性

- `response.status_code`：HTTP 状态码
- `response.text`：响应内容（字符串，自动解码）
- `response.content`：响应内容（二进制）
- `response.json()`：响应内容转为 JSON（前提是返回 JSON 格式）
- `response.headers`：响应头字典
- `response.cookies`：响应 cookies
- `response.url`：最终请求的 URL
- `response.encoding`：编码方式
- `response.request`：请求对象（可查看请求头、方法、体等）

---

### 四、文件上传和下载

- 文件上传
    ```python
    files = {'file': open('test.txt', 'rb')}
    response = requests.post('http://httpbin.org/post', files=files)
    ```

- 文件下载
    ```python
    response = requests.get('http://www.example.com/image.png')
    with open('image.png', 'wb') as f:
        f.write(response.content)
    ```

---

### 五、会话对象（Session）

- 保持会话（如自动处理 Cookie）
    ```python
    session = requests.Session()
    session.get('http://www.example.com/login')
    response = session.get('http://www.example.com/profile')
    ```

---

### 六、异常处理

- 常见异常：`requests.exceptions.Timeout`、`requests.exceptions.ConnectionError`、`requests.exceptions.HTTPError` 等
    ```python
    try:
        response = requests.get('http://www.example.com', timeout=3)
        response.raise_for_status()  # 状态码异常时抛出异常
    except requests.exceptions.RequestException as e:
        print("请求异常：", e)
    ```

---

### 七、常用技巧

- 禁用 SSL 证书验证（不推荐生产环境）
    ```python
    response = requests.get('https://example.com', verify=False)
    ```

- 流式下载大文件
    ```python
    response = requests.get('http://example.com/bigfile', stream=True)
    for chunk in response.iter_content(chunk_size=1024):
        if chunk:
            # 处理数据块
            pass
    ```

---

**总结：**
- `requests` 用法简单，支持 GET/POST/PUT/DELETE 等多种请求方式。
- 支持参数、头部、Cookie、代理、超时、文件上传下载、会话保持等常用功能。
- 推荐查阅官方文档：https://docs.python-requests.org/zh_CN/latest/