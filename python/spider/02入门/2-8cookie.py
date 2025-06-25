import requests
import random

# 假设有多个可用 Cookie（通常通过抓包或登录获取）
COOKIES_POOL = [
    {"BAIDUID": "AAA111", "BDUSS": "xxx1"},
    {"BAIDUID": "BBB222", "BDUSS": "xxx2"},
    {"BAIDUID": "CCC333", "BDUSS": "xxx3"},
    # ...可继续扩展
]

def get_random_cookies():
    return random.choice(COOKIES_POOL)

url = "https://www.baidu.com/"
headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36"
}

for i in range(3):
    cookies = get_random_cookies()
    response = requests.get(url, headers=headers, cookies=cookies)
    print(f"第{i+1}次请求使用的Cookie:", cookies)
    print("响应状态码:", response.status_code)
    print("部分响应内容:", response.text[:100])