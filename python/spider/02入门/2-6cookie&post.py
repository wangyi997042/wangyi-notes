

'''

Cookie 字符串
'''


# import requests

# # 假设通过浏览器抓包获得如下 Cookie 字符串
# cookie_str = "BAIDUID=XXXXXXXXXX:FG=1; BIDUPSID=XXXXXXXXXX; PSTM=XXXXXXXXXX; BDUSS=XXXXXXXXXX;"

# # 将 Cookie 字符串转为字典
# def cookie_str_to_dict(cookie_str):
#     cookies = {}
#     for item in cookie_str.split(';'):
#         if '=' in item:
#             key, value = item.strip().split('=', 1)
#             cookies[key] = value
#     return cookies

# cookies = cookie_str_to_dict(cookie_str)

# url = "https://www.baidu.com/"
# headers = {
#     "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36",
#     # "cookies": cookies # 携带 cookie 的方式一
# }

# response = requests.get(url, headers=headers, cookies=cookies)
# print("响应状态码:", response.status_code)
# print("部分响应内容:", response.text[:200])




'''
# 使用 Cookie 和 POST 请求示例
# '''

import requests

# 假设通过浏览器抓包获得如下 Cookie 字符串
cookie_str = "BAIDUID=XXXXXXXXXX:FG=1; BIDUPSID=XXXXXXXXXX; PSTM=XXXXXXXXXX; BDUSS=XXXXXXXXXX;"

# 将 Cookie 字符串转为字典
def cookie_str_to_dict(cookie_str):
    cookies = {}
    for item in cookie_str.split(';'):
        if '=' in item:
            key, value = item.strip().split('=', 1)
            cookies[key] = value
    return cookies

cookies = cookie_str_to_dict(cookie_str)

url = "https://www.baidu.com/"
headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36"
}

data = {
    "key": "value"  # 示例数据，根据实际接口填写
}

response = requests.post(url, headers=headers, cookies=cookies, data=data)
print("响应状态码:", response.status_code)
print("部分响应内容:", response.text[:200])