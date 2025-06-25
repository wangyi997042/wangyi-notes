

import requests
"""
- `response_.status_code`：HTTP 状态码（如 200、404）
- `response_.text`：响应内容的字符串（自动解码）
- `response_.content`：响应内容的字节数据
- `response_.encoding`：响应内容的编码（可手动设置）
- `response_.url`：最终请求的 URL（可能有重定向）
- `response_.headers`：响应头字典
- `response_.cookies`：响应的 cookies
- `response_.json()`：将响应内容解析为 JSON（如果内容是 JSON 格式）
- `response_.ok`：请求是否成功（状态码 200-400 返回 True）
- `response_.reason`：状态码对应的原因短语
- `response_.elapsed`：请求响应时间（timedelta 对象）
- `response_.history`：重定向历史（Response 对象列表）
- `response_.raise_for_status()`：请求失败时抛出异常

"""

'''
- `response_.request.method`：请求方法（如 'GET'、'POST'）
- `response_.request.url`：请求的 URL
- `response_.request.headers`：请求头字典
- `response_.request.body`：请求体内容（如 POST 数据）
- `response_.request.cookies`：请求时携带的 cookies（通常为空，推荐用 headers 传递）
'''

if __name__ == '__main__':
    url = 'http://www.baidu.com'

    response_ = requests.get(url)
    # print(response_.text)
    # print(type(response_.text))

    # print(response_.encoding)
    # print(response_.content)

    # with open('baidu.html', 'w', encoding='utf-8') as f:
    #     f.write(response_.text)

    # with open('baidu_01.html', 'wb') as f:
    #     f.write(response_.content)

    # bytes_data = response_.content
    # str_data = bytes_data.decode('utf-8')
    # with open('baidu_02.html', 'w', encoding='utf-8') as f:
    #     f.write(str_data)


    # print(response_.status_code)
    # print(response_.text)
    # print(response_.content)
    # print(response_.encoding)
    # print(response_.url)
    print(response_.request.headers)
    # print(response_.cookies)
    # print(response_.json())  # 如果返回的是 JSON
    # print(response_.ok)
    # print(response_.reason)
    # print(response_.elapsed)
    # print(response_.history)


    print(response_.request.method)   # 请求方法
    print(response_.request.url)      # 请求 URL
    print(response_.request.headers)  # 请求头
    print(response_.request.body)     # 请求体