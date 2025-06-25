
'''
代理ip 分类
1.透明代理
2.匿名代理
3.高匿代理（可用性最高）
'''


import requests
import random

# 假设有多个可用代理IP（格式为协议://IP:端口）
PROXIES_POOL = [
    {"http": "http://123.123.123.123:8080", "https": "http://123.123.123.123:8080"},
    {"http": "http://111.111.111.111:3128", "https": "http://111.111.111.111:3128"},
    {"http": "http://222.222.222.222:8000", "https": "http://222.222.222.222:8000"},
    # ...可继续扩展
]

def get_random_proxies():
    return random.choice(PROXIES_POOL)

url = "https://www.baidu.com/"
headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36"
}

for i in range(3):
    proxies = get_random_proxies()
    try:
        response = requests.get(url, headers=headers, proxies=proxies, timeout=5)
        print(f"第{i+1}次请求使用的代理:", proxies)
        print("响应状态码:", response.status_code)
        print("部分响应内容:", response.text[:100])
    except Exception as e:
        print(f"第{i+1}次请求代理失败:", proxies, "错误信息:", e)